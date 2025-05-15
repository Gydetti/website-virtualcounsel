# Lighthouse Performance Improvement Plan

> A step-by-step blueprint for any coding assistant to restore and exceed Lighthouse scores on modern JS delivery, DOM size, and execution metrics.

---

## 0. Completed Refactors & Implementation

Below is a summary of the work already done in the codebase:

- CSS-only stagger containers applied to all simple sections (ValueProp, Clients, ProblemPain, SolutionVision, Features, Pricing, Blog, ServicesOverview, ServicesSection, ProcessHome, HomepageFaq, Contact).
- Global CSS utilities (`@keyframes fade-up` and `.stagger-container`) added to `app/globals.css`.
- Removed all per-item `<LazySection>` wrappers, using a single `LazySection animation="none"` per CSS-only section.
- Code-split heavy sections (HeroSection, TestimonialsSection, ResourceListSection, ResourceDetailSection) via `next/dynamic`.
- Refactored `DynamicPageRenderer` to dynamically import heavy sections, statically import CSS-only ones, and wrap CSS-only sections in `.stagger-container` with stagger delays.
- Extended `LazySection` to accept inline `style` props for `--stagger-delay` and automatically toggle a `visible` class for CSS-only animations.
- Updated section components (`ContactSection`, `ServicesSection`, `ServicesOverviewSection`, `ResourceListSection`) with proper CSS-only wrappers and image error fallbacks.
- Installed and configured Lighthouse CI (`@lhci/cli`) with `lighthouserc.json` and CI integration.

### Next Steps

- Configure modern build targets in `next.config.mjs` (enabling ESM externals and modern JS output).
- Preload the hero LCP image in `<Head>` and optimize blur placeholders.
- Run dependency audit (`npx depcheck`), remove unused packages, and update `.browserslist`.
- Final DOM size reduction: collapse extra wrappers and use semantic lists where appropriate.
- Defer analytics and heavy scripts using Next's `<Script strategy="lazyOnload">`.
- Run Lighthouse CI locally, document results in `docs/lighthouse-gains.md`.

## 1. Hybrid Scroll-Triggered Animation Strategy

> Maintain both the "snappy, staggered" entrance effects and genuine lazy-loading performance via a hybrid approach.

### a) CSS-Only Stagger + Scroll-Trigger
1. Wrap simple sections (Features, Pricing, About, etc.) in a single `LazySection` with `animation="none"` so it adds a `visible` class on intersection:
   ```tsx
   import LazySection from '@/components/ui/lazy-section';

   <LazySection
     animation="none"
     className="stagger-container"
     style={{ '--stagger-delay': '0.1s' }}
   >
     <h2 style={{ '--index': 0 } as React.CSSProperties}>Section Title</h2>
     <p  style={{ '--index': 1 } as React.CSSProperties}>Subtitle</p>
     <div style={{ '--index': 2 } as React.CSSProperties}>…</div>
   </LazySection>
   ```
2. In `app/globals.css`, ensure CSS utilities:
   ```css
   @keyframes fade-up {
     from { opacity: 0; transform: translateY(20px); }
     to   { opacity: 1; transform: translateY(0); }
   }
   .stagger-container > * {
     opacity: 0;
     transform: translateY(20px);
   }
   .stagger-container.visible > * {
     animation: fade-up 0.4s ease both;
     animation-delay: calc(var(--stagger-delay, 0.1s) * var(--index, 0));
   }
   ```

### b) JS-Driven LazySection + Code-Splitting
1. For heavy/below-the-fold sections (Hero, carousels, complex UIs), dynamic-import both `LazySection` and the section:
   ```tsx
   import dynamic from 'next/dynamic';
   const LazySection = dynamic(() => import('@/components/ui/lazy-section'), { ssr: false });

   export default function TestimonialsSection(props) {
     return (
       <LazySection animation="slide-up" delay={0.2}>
         <TestimonialsContent {...props} />
       </LazySection>
     );
   }
   ```

### c) Guided Removal of Extra Wrappers
- Drop all per-item `<LazySection>` wrappers in CSS-only sections—to just one container.  
- Prefer semantic lists (`<ul>/<li>`) over grid `<div>` clusters to cut DOM nodes.  

### d) Feature-Flag Control
Everything obeys `siteConfig.features.enableStaggeredAnimations`. Flip off for static fallback.  

### e) Validation
- Verify scroll-triggered entrance in dev.  
- Confirm E2E smoke tests.  
- (Optional) run Lighthouse to confirm JS & DOM savings.  

This hybrid pattern preserves our signature flow on scroll while delivering true lazy-loading gains.

## 2. Modern JavaScript Delivery

1. In `next.config.mjs`, ensure client bundles target only modern browsers:
   ```js
   webpack(config, { isServer }) {
     if (!isServer) {
       config.output.environment = {
         arrowFunction: true,
         const: true,
         forOf: true,
         dynamicImport: true,
         // ... other ES features
       };
     }
     return config;
   }
   ```
2. Enable ESM externals to avoid CJS shims:
   ```js
   experimental: { esmExternals: true }
   ```
3. Audit dependencies:
   - Replace CJS packages with ESM-only imports
   - Lazy-load large libraries via `dynamic()` if not critical

## 3. DOM Size Reduction

1. Search for deeply nested `<div>` wrappers in `components/sections/` and `components/layout/`.
2. Collapse two-tier wrappers by merging Tailwind utility classes onto one element.
3. Replace generic `<div>` lists with semantic lists where possible:
   ```tsx
   <ul className="grid grid-cols-3 gap-4">
     {items.map(item => (
       <li key={item.id}>{item.label}</li>
     ))}
   </ul>
   ```
4. Remove obsolete container components if they only wrap a single child.

## 4. Code Splitting & Lazy Loading

1. Convert non-critical sections to dynamic imports:
   ```tsx
   import dynamic from 'next/dynamic';
   const Testimonials = dynamic(() => import('@/components/sections/testimonials-section'), { ssr: false });
   ```
2. Defer analytics and heavy scripts:
   ```tsx
   import Script from 'next/script';
   <Script src="https://analytics.js" strategy="lazyOnload" />
   ```
3. Group animation logic behind `dynamic()` to avoid pulling Framer Motion into base bundle.

## 5. CSS-Driven Animations

1. Replace multiple `IntersectionObserver` wrappers with CSS keyframe/stagger:
   ```css
   .stagger-container { --stagger-delay: 0.1s; }
   .stagger-container > * {
     opacity: 0;
     animation: fade-up 0.4s ease both;
     animation-delay: calc(var(--stagger-delay) * var(--index));
   }
   ```
2. For JavaScript-based animations (e.g., your HeroSection):
   - Dynamically import `LazySection` and `framer-motion` only within that component:
     ```tsx
     import dynamic from 'next/dynamic';
     const LazySection = dynamic(() => import('@/components/ui/lazy-section'), { ssr: false });
     ```
   - Wrap **only** essential containers (text, image, stats) with `LazySection` to preserve lively, staggered entrance while minimizing extra DOM nodes.
3. Remove `LazySection` and IntersectionObservers from simpler sections—leverage the CSS-only approach above for subtle fade/slide sequences.

## 6. Image & Asset Strategy

1. Preload hero LCP image in `<Head>`:
   ```tsx
   <link rel="preload" as="image" href="/images/hero/hero-main.webp" />
   ```
2. Continue using `OptimizedImage` with `priority` on LCP assets, `lazy` on others.
3. Audit blur placeholders and raw image sizes.

## 7. Dependency Audit & Polyfill Removal

1. Run:
   ```bash
   npx depcheck
   ```
2. Remove unused packages.
3. Configure `.browserslist` to target modern:  
   ```json
   ["defaults and supports es6-module", "not IE 11", "not dead"]
   ```

## 8. Integrate Lighthouse CI

1. Install `@lhci/cli`:
   ```bash
   npm install -D @lhci/cli
   ```
2. Create `lighthouserc.json` in repo root:
   ```json
   {
     "ci": { "collect": { "url": ["http://localhost:3000"], "kpi": true }, "assert": { "preset": "lighthouse:recommended" } }
   }
   ```
3. Add to CI workflow (`.github/workflows/ci.yml`):
   ```yaml
   - name: Run Lighthouse CI
     run: npx lhci autorun
   ```

## 9. Validation & Reporting

1. After each major change, rebuild & test:
   ```bash
   rm -rf .next && npm run build && npm run lint --fix && npm test && npx playwright test
   ```
2. Run Lighthouse and compare to baseline:
   ```bash
   npx lighthouse https://staging.example.com --output html --output-path=./reports/lh.html
   ```
3. Document gains in `docs/lighthouse-gains.md`.

## 10. Iteration & Maintenance

- Revisit third-party bundles every quarter.
- Update `browserslist` as market share evolves.
- Refactor new sections against this blueprint.

---

**End of Lighthouse 2.0 Improvement Plan**

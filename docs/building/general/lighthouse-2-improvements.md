# Lighthouse Performance Improvement Plan

> A step-by-step blueprint for any coding assistant to restore and exceed Lighthouse scores on modern JS delivery, DOM size, and execution metrics.

---

## 1. Remember your rules

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

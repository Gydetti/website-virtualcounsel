# Master Client Onboarding & Codebase Guide

---

## 🚀 Quickstart & AI Recipes

**For AI Assistants and Human Developers:**
- **Zero-context onboarding:**
  1. Read this doc, `lib/site.config.local.ts`, `lib/theme.variants.ts`, and `lib/data/staticContent.ts`.
  2. To scaffold a new client: update config, inject copy, run `npm run verify:local`.
  3. Use codemods/scripts for placeholder extraction, color migration, and fallback image replacement.
  4. Always validate changes by running the full verification workflow and manual visual QA on key pages.
- **AI Automation Recipes:**
  - To add a new section: update `siteConfig.pageStructures`, extend the section schema in `lib/schemas/sections.schema.ts`, and add/override data in `lib/data/`.
  - To add a new theme variant: extend `lib/theme.variants.ts`, update `app/layout.tsx` logic, and document in this doc and config.
  - To migrate hardcoded colors: use codemods and lint rules, then update tokens in `theme/colors.ts` and config.
  - To update placeholder copy: extract from `lib/data/staticContent.ts`, replace, and verify with tests and visual QA.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Codebase Structure](#codebase-structure)
3. [Onboarding & Setup Workflow](#onboarding--setup-workflow)
4. [Configuration: site.config.local.ts](#configuration-siteconfiglocalts)
5. [Theming & Branding](#theming--branding)
6. [Pages, Routing & Feature Flags](#pages-routing--feature-flags)
7. [Section Components & Data-Driven Content](#section-components--data-driven-content)
8. [Images & Asset Pipeline](#images--asset-pipeline)
9. [SEO, Metadata & Performance](#seo-metadata--performance)
10. [Cookie Consent & Tracking](#cookie-consent--tracking)
11. [Testing, Linting & Quality Gates](#testing-linting--quality-gates)
12. [Build, Deployment & CI](#build-deployment--ci)
13. [Newsletter & Contact Form Providers](#newsletter--contact-form-providers)
14. [Dynamic Theming & Advanced Configuration](#dynamic-theming--advanced-configuration)
15. [Troubleshooting, Gotchas & Post-Mortems](#troubleshooting-gotchas--post-mortems)
16. [AI/Automation Best Practices](#aiautomation-best-practices)
17. [Appendix: Feature Flags, Patterns, and Utilities](#appendix-feature-flags-patterns-and-utilities)
18. [Advanced Patterns & Utilities](#advanced-patterns--utilities)
19. [Design System & Visual Patterns](#design-system--visual-patterns)
20. [How to Update This Doc](#how-to-update-this-doc)
21. [Lessons from Past Phases & Common Pitfalls (Appendix)](#lessons-from-past-phases--common-pitfalls-appendix)

---

## 1. Project Overview

The GMG Template Website 2025 is a highly configurable, modern, and robust Next.js template designed for service professionals. It features a single source of truth for all theming, content, and configuration, and is built for rapid onboarding, customization, and future-proof handover to both AI and human developers.

---

## 2. Codebase Structure

- **app/**: All Next.js app routes, including homepage, about, services, blog, resources, landing pages, etc.
- **components/**: UI, layout, content blocks, sections, analytics, SEO, tracking, etc.
- **lib/**: Data sources, schemas, config, and utility functions.
- **public/**: Static assets (images, textures, etc.).
- **tests/**: Unit, integration, and E2E tests (Vitest, Playwright).
- **theme/**: Tailwind and global style configuration.
- **docs/**: All documentation, onboarding, and design blueprints.

---

## 3. Onboarding & Setup Workflow

- Clone the repo and install dependencies (`npm install`).
- All configuration is centralized in `lib/site.config.local.ts` (theme, features, content structure).
- Run the all-in-one verification script before pushing changes:
  ```bash
  npm run verify:local
  ```
- All theming, content, and feature flags are validated by Zod schemas in `lib/site.config.ts`.
- Never assume onboarding docs are up-to-date—always validate against the codebase.

---

## 4. Configuration: site.config.local.ts

- The homepage and all major sections use meta-instructional placeholder copy, guiding content creators to use best practices for headlines, CTAs, social proof, value props, features, pain/solution, testimonials, services, about, blog, pricing, FAQ, and CTA.
- Each section's content is structured for clarity, SEO, and conversion, with explicit instructions for alt text, accessibility, and dynamic content placeholders.
- The homepage serves as the design and content benchmark for all other pages.
- See `docs/building/designing/phase2-homepage-copy.md` for detailed meta-instructional copy patterns.

---

## 5. Theming & Branding

- **Single source of truth**: All colors, typography, spacing, borders, and shadows are defined in `lib/site.config.local.ts` under `theme`.
- **Variants**: Multiple theme variants are defined in `lib/theme.variants.ts`. The active variant is set in `app/layout.tsx` via a `themeKey` or ENV variable (`THEME_VARIANT`).
- **SSR CSS variable injection**: All theme tokens are injected at SSR in `<head>`, with no runtime JS. This prevents FOUC and ensures instant theme application.
- **Tailwind mapping**: All theme tokens are mapped to Tailwind utilities using slash-syntax (e.g., `bg-primary/20`). No hardcoded colors or dash-syntax.
- **No hardcoded colors**: All color usage is via tokens; codemods and ESLint enforce this.
- **Testing**: Unit and E2E tests verify CSS variable and utility resolution.
- **Documentation**: All new config options and tokens are documented in `site.config.local.ts` and onboarding docs.
- **Accessibility**: All color combos must meet WCAG AA contrast, and all animations must respect `prefers-reduced-motion`.

---

## 6. Pages, Routing & Feature Flags

- **Test structure:** All tests live under `tests/` with subfolders for `unit/` (Vitest), `integration/` (Vitest + MSW), and `e2e/` (Playwright).
- **E2E:** Playwright config and scripts for all major flows (homepage, about, contact, dynamic routes).
- **Unit:** Vitest for UI components, feature flags, utility functions, and API schema validation.
- **Integration:** Vitest + MSW for API endpoints and middleware.
- **Accessibility:** Use `jest-axe` for a11y checks in Vitest.
- **Lighthouse:** Optional CI integration for performance and a11y regression.
- **CI:** `npm test` runs all suites; scripts are in `package.json`.
- **Naming and placement conventions** are strictly followed for easy discoverability.

---

## 7. Section Components & Data-Driven Content

- **Section architecture**: All pages are composed of reusable, configurable section components (e.g., HeroSection, AboutSection, ServicesSection, etc.) found in `components/sections/`.
- **Section data**: Content for each section/page is driven by data modules in `lib/data/` and validated by Zod schemas.
- **Dynamic page structures**: Page layouts and section order are defined in `siteConfig.pageStructures` (see `lib/site.config.local.ts`).
- **Section wrappers**: All hero/top sections use the `Section` component with `bgClass` from config (e.g., `siteConfig.sectionStyles.heroGradient`).
- **No local overrides**: Typography, spacing, and backgrounds are controlled by global config and utility classes.
- **Animations**: Scroll-triggered and staggered animations are handled by `<LazySection>` and controlled by feature flags in `siteConfig.features`.
- **Testing**: All section components are covered by unit and E2E tests.

## 7. Section Architecture & Dynamic Page Composition

- **Section-driven pages:** All pages are composed of reusable, configurable section components (e.g., HeroSection, AboutSection, ServicesSection, etc.), with layouts and order defined in `siteConfig.pageStructures`.
- **DynamicPageRenderer:** Central to rendering pages from config, enabling no-code reordering and extension of sections. See `components/layout/DynamicPageRenderer.tsx`.
- **Per-section visual overrides:** Each section can have its own background pattern, opacity, and color, set via config and validated by Zod schemas. Extend each section's data schema and pass overrides as props (see `lib/schemas/sections.schema.ts`).
- **No manual padding/containers:** Section spacing and container classes are config-driven for consistency and simplicity.
- **Pattern system:** Patterns (dots, grid, waves, etc.) are defined in config and can be overridden per section. See `theme-templating-variants.md` and `lib/site.config.local.ts`.
- **Testing:** All section components are covered by unit and E2E tests. Always run `npm run verify:local` after changes.

---

## 8. Images & Asset Pipeline

- **Raw images**: Source images are stored in `assets/images/raw/`.
- **Optimized images**: Use `npm run image-optimize` to generate optimized images in `public/images/` and `blurDataURL.json`.
- **Image components**: Use `next/image` or `<OptimizedImage />` for all images; no `<img>` tags.
- **Fallbacks**: All fallback images use `DEFAULT_PLACEHOLDER_IMAGE` from `lib/constants.ts`.
- **Testing**: E2E and unit tests verify image loading and fallbacks.

---

## 9. SEO, Metadata & Performance

- **SEO**: All metadata is driven by config and per-page overrides using Next.js App Router's `generateMetadata`.
- **JSON-LD**: Organization, WebSite, BreadcrumbList, Article, and FAQ schemas are emitted dynamically based on content.
- **Sitemap & robots.txt**: Generated via `next-sitemap`, filtering routes based on feature flags and `enabledPages` in config.
- **Lighthouse**: Automated Lighthouse CI is integrated; results are documented in `docs/lighthouse-gains.md`.
- **Performance**: Hero images use `next/image` with `priority`, explicit width/height, and are preloaded. Unused JS/CSS is purged, and heavy scripts are dynamically imported. DOM size is minimized by removing excessive wrappers and using semantic lists.
- **Validation**: After each change, run build, lint, test, E2E, and Lighthouse. All enhancements must maintain or improve Core Web Vitals.

---

## 10. Cookie Consent & Tracking

- **Consent gating**: Tracking scripts (GTM, GA4, Facebook Pixel, LinkedIn, HubSpot, Google Ads) are only injected if the user has given the appropriate consent **and** the corresponding tracking ID is set in `siteConfig.tracking`.
- **No empty scripts**: Prevents broken or unnecessary script loads; improves performance and onboarding safety.
- **Dev warnings**: Optionally log a warning in development if consent is given but an ID is missing.
- **Pattern**: See `components/tracking/tracking-scripts.tsx` for the implementation.
- **Documentation**: This pattern is documented in onboarding docs for future maintainers.

---

## 11. Testing, Linting & Quality Gates

- **Strict import sorting**: Enforced via `simple-import-sort/imports` and `simple-import-sort/exports` in `.eslintrc.json`.
- **No hardcoded colors**: Custom ESLint/regexp rules ban hex literals and raw Tailwind color classes. All color usage must be via semantic tokens defined in the theme config.
- **No `<img>` tags**: Use `next/image` or `<OptimizedImage />` for all images.
- **Accessibility**: Enforced via `jsx-a11y` rules for alt text, focus, and anchor validity.
- **No console/debugger**: Only `console.error` via a shared logger is allowed.
- **Layer boundaries**: `boundaries/no-cross-imports` prevents cross-layer imports (e.g., `components/` cannot import from `app/`).
- **CI enforcement**: Lint, Biome, and all tests must pass before merge. Run `npm run lint -- --fix`, `npx biome lint app components lib hooks`, and `npm test`.
- **Automated dependency management**: Dependabot or similar tools are used for regular updates, with CI checks on every PR.

## 12. Build, Deployment & CI

- **Next.js 15+ SWC JSX runtime**: No default `React` import; all direct API calls (`forwardRef`, hooks, context) must use named imports.
- **Biome's `useImportType`**: Strips type-only React imports; always use `import type` for types.
- **"use client"**: Must be the first line in any client component.
- **Automated codemod**: Used to migrate all components to named imports and correct `"use client"` placement.
- **Build & CI**: Always run `npm run build`, `npm run lint -- --fix`, and `npm test` before deployment.
- **Staging validation**: Deploy to staging and smoke-test before merging to `main`.
- **Full verification**: Use `npm run verify:local` to clear production cache, build, lint, type-check, run all tests, and E2E in one command.
- **Production builds**: Output to `.next-prod` to avoid interfering with dev builds.
- **Push to `main` only after all checks pass**: This triggers Vercel auto-deployment.

---

## 13. Newsletter & Contact Form Providers

- **Config-driven**: Newsletter and contact form providers are configured in `siteConfig.newsletter` and `siteConfig.contactForm`.
- **Supported providers**: Mailchimp, HubSpot, ActiveCampaign, SMTP, SendGrid, Postmark (see config for details).
- **Dynamic fields**: Contact form fields are generated from config and validated by Zod schemas.
- **Spam protection**: Honeypot and reCAPTCHA are supported and configurable.
- **Testing**: All provider modes and validation logic are covered by unit and integration tests.

---

## 14. Dynamic Theming & Advanced Configuration

- **Theme variants**: All theme variants are defined in `lib/theme.variants.ts`. The active variant is set in `app/layout.tsx` via a `themeKey` or ENV variable (`THEME_VARIANT`).
- **SSR CSS variable injection**: At build/SSR, only the active variant's tokens are injected into `<head>`, ensuring no FOUC and minimal CSS.
- **Section-level overrides**: `siteConfig.sectionOverrides` can be used to preview different variants per section (see `theme-templating-variants.md`).
- **Opacity syntax**: All color utilities use Tailwind's slash-syntax (e.g., `bg-primary/10`). Dash-syntax is deprecated and enforced via codemod and lint rules.
- **Testing**: Visual QA, unit, and E2E tests verify correct theme application and color contrast.
- **Performance**: Only the active variant's CSS variables are shipped; unused classes are purged by Tailwind.
- **Previewing**: Use `?theme=v2` in the URL or set `THEME_VARIANT` in `.env.local` to preview different variants.

## 15. Troubleshooting, Gotchas & Post-Mortems

- **React API imports**: All direct React API calls (e.g., `forwardRef`, hooks, context) must use named imports; no default or namespace imports.
- **"use client"**: Must be the first line in any client component.
- **Biome/ESLint**: Strictly enforce import types, color usage, and import sorting.
- **Tailwind JIT**: Any class name computed at runtime must appear as a literal string in the source or be safelisted in `tailwind.config.ts`.
- **Pattern defaults**: Section backgrounds/patterns are off by default; must be explicitly enabled in config.
- **No hardcoded brand colors**: Always use theme tokens or CSS variables; codemods and lint rules enforce this.
- **Framer Motion**: Always use numeric cubic-bezier arrays for easing, not CSS variable strings.
- **Dynamic section spacing**: Section vertical padding is config-driven via `siteConfig.theme.visualStyle.contentDensity` and mapped to literal classes for Tailwind JIT compatibility.
- **Lighthouse/Performance**: Always run Lighthouse and a11y checks before merging; document results in `docs/lighthouse-gains.md`.
- **CI/Build**: All enhancements are verified with ESLint, production build, unit/integration/E2E tests, and manual staging review before merging.
- **Color audit**: See `misconfigs-final.txt` for any remaining hardcoded color usages to be migrated.

## 16. AI/Automation Best Practices

- **Zero-context onboarding**: All placeholder content and fallback images are centralized for easy AI-driven customization.
- **Codemods/scripts**: Use codemods and regex scripts to extract/replace placeholders, color literals, and fallback images.
- **CI enforcement**: Lint rules and tests block regressions; run `npm run ci:verify` after any automated change.
- **Automated dependency management**: Dependabot or similar tools keep dependencies up to date, with CI checks on every PR.
- **Documentation**: All onboarding, customization, and build steps are documented for AI and human maintainers.
- **Visual QA**: Automated and manual visual checks are required after any major change or codemod.
- **Zero-context chat prompt**: For new client builds, load `staticContent.ts`, `constants.ts`, `theme/colors.ts`, `site.config.local.ts`, and the unified build blueprint; inject client copy, update branding, and run `npm run ci:verify`.

## 17. Appendix: Feature Flags, Patterns, and Utilities

- **Feature flags**: All major features and sections are toggled via `siteConfig.features` (see `lib/site.config.local.ts`).
- **Pattern system**: Section backgrounds can opt into patterns/textures via config; patterns are off by default and must be explicitly enabled.
- **Section styles**: Centralized in `siteConfig.sectionStyles` for gradients, banners, and other shared styles.
- **Semantic tokens**: All color, spacing, and typography tokens are semantic and reflect UI role, not color value.
- **Testing utilities**: Unit, integration, and E2E tests cover all major flows, including theming, section rendering, and tracking.
- **Color audit**: `misconfigs-final.txt` lists all hardcoded color usages to be migrated to tokens.
- **References**: See `docs/building/general/`, `lib/site.config.local.ts`, `lib/theme.variants.ts`, `theme/colors.ts`, and onboarding docs for further details.

## 18. Advanced Patterns & Utilities

### Web Vitals API & Analytics Utilities
- **Custom endpoint:** `app/api/web-vitals/route.ts` collects web vitals metrics for analytics/performance monitoring. Metrics can be forwarded to any analytics service. See also `components/analytics/WebVitalsReporter.tsx` for client-side reporting.
- **Pattern:** Use this endpoint to collect and analyze real user performance data. Extend as needed for custom analytics.

### Dynamic Page Composition: DynamicPageRenderer
- **Component:** `components/layout/DynamicPageRenderer.tsx` enables config-driven, highly dynamic page layouts. Page structures are defined in `siteConfig.pageStructures` and mapped to section components at runtime.
- **Pattern:** To add or reorder sections, update the config—no code changes needed. Extend this renderer for new section types or custom logic.

### Content Block System
- **Directory:** `components/content-blocks/` contains modular blocks (FormBlock, CtaBlock, HeadingBlock, HeadingBlock, QuoteBlock, TextBlock, VideoBlock, ImageBlock, ListBlock, ContentBlockRenderer, etc.).
- **Pattern:** Use for rich, flexible, CMS-like content editing. Compose complex content from reusable blocks. Extend with new block types as needed.

### Custom UI Primitives
- **Directory:** `components/ui/` contains a large set of custom UI primitives (button, card, input, carousel, background-pattern, spark-button, lazy-section, optimized-image, etc.).
- **Pattern:** Use these for consistent UI/UX. Many are not just wrappers for shadcn/ui, but have custom logic (e.g., BackgroundCanvas for animated backgrounds, lazy-section for scroll-triggered animations, optimized-image for image optimization).
- **Equal height cards:** All card components (TestimonialCard, ServiceCard, etc.) support equal height layouts using CSS Grid and flexbox. Use `items-stretch` on the grid container and `card-equal-height h-full` classes on cards. The global CSS includes `.card-equal-height` utilities for consistent card behavior.
- **Button hover effects:** Service cards and other card-based buttons can disable hover scaling and shadow effects using `hover:scale-100 hover:shadow-none` classes to prevent interference with card layouts.
- **Best practice:** Prefer these primitives over raw HTML or third-party components for consistency and maintainability.

### Utility Modules
- **Files:** `lib/data-utils.ts`, `lib/tracking-utils.ts`, `lib/icon-utils.tsx`, `lib/animation.ts`, `lib/utils.ts`.
- **Pattern:** Centralize data transformation, tracking, icon, and animation logic. Review and extend these utilities as needed for new features.

### Layout & Navigation Patterns
- **Directory:** `components/layout/` contains AppShell, Section, PageTransitionWrapper, header, footer, navigation, etc.
- **Pattern:** Use AppShell for global layout, Section for section wrappers, PageTransitionWrapper for animated transitions, and navigation/header/footer for site-wide navigation. Sticky headers, dynamic navigation, and page transitions are all handled here.
- **Navigation hover functionality:** The header navigation automatically opens dropdown menus on hover for `/services` and `/resources` navigation items. This provides a smooth, modern UX without requiring clicks. The dropdowns auto-close when the mouse leaves both the trigger and the dropdown content.
- **Mobile navigation:** Uses portal-based overlay to escape stacking context issues. Includes expandable submenus for services and resources with smooth animations.
- **Best practice:** Extend these primitives for new layout or navigation needs, and keep navigation config-driven via `siteConfig`.

### SEO & Structured Data Utilities
- **Directory:** `components/seo/` contains structured-data.tsx and blog-schema.tsx for rich JSON-LD schema generation.
- **Pattern:** Use and extend these utilities for advanced SEO needs, including custom schema types for new content.

### Analytics & Tracking
- **Directory:** `components/tracking/` contains DataLayerProvider, tracking-scripts.tsx, and PageViewTracker for analytics and consent gating.
- **Pattern:** All tracking scripts are consent-gated and config-driven. Extend these for new analytics providers or custom tracking needs.

### Content & Placeholder Extraction
- **Pattern:** All placeholder copy is centralized in `lib/data/staticContent.ts`. Use codemods/scripts to extract or replace placeholders and fallback images. CI and lint rules enforce no new inline placeholders.

### Section Dividers & WordPress-Style Wave Styling
- **Component:** `components/ui/section-divider.tsx` provides rich, WordPress-style section dividers with advanced wave and border styling options.
- **Available variants:** 
  - `wave` - Classic smooth wave pattern
  - `curve` - Simple curved divider
  - `triangle` - Geometric triangle points
  - `zigzag` - Sharp zigzag pattern
  - `clouds` - Organic cloud-like shapes
  - `mountains` - Mountain peak silhouettes
  - `flowing-wave` - More organic flowing wave
  - `double-wave` - Two-layer wave effect
- **Configuration options:**
  - `position`: 'top' | 'bottom' - Where to place the divider
  - `size`: 'sm' | 'md' | 'lg' | 'xl' - Height of the divider
  - `fill`: CSS class for fill color (e.g., 'fill-white', 'fill-primary')
  - `flip`: boolean - Flips the pattern vertically
- **Usage pattern:** Place between sections to create visual separation and add professional polish. Perfect for breaking up content sections, especially when sections have different background colors.
- **Example:**
  ```tsx
  <SectionDivider 
    variant="flowing-wave" 
    position="bottom" 
    size="lg" 
    fill="fill-white" 
  />
  ```
- **Best practice:** Use dividers sparingly for maximum impact. Match the `fill` color to the section above (for bottom dividers) or below (for top dividers) to create seamless transitions.

## 19. Design System & Visual Patterns

- **Configurable everything:** All visual options (patterns, gradients, spacing, typography, animations) are centrally configurable in `siteConfig` and theme variants.
- **Typography & spacing:** Global, responsive typography scale and spacing system, with "balanced", "tight", and "airy" options. See `theme/` and `app/globals.css`.
- **Pattern library:** Configurable background patterns (dots, grid, waves, etc.) and gradients, with per-section overrides.
- **Component variants:** Buttons, cards, and other primitives have variant-specific personalities (Professional, Warm, Bold). See `components/ui/`.
- **CSS modules:** Used only for complex, scoped animations (e.g., infinite logo carousels).
- **Performance & accessibility:** All enhancements must maintain or improve Core Web Vitals and meet WCAG AA contrast. Animations must respect `prefers-reduced-motion`.
- **Consistent variant ecosystem:** All design decisions must work across all theme variants (v1, v2, v3).
- **Micro-interactions:** Subtle, purposeful, and always optional/configurable. See `components/ui/lazy-section.tsx` and `components/layout/PageTransitionWrapper.tsx`.

## 19.1 Centralized Border Radius Theme System

**⚠️ CRITICAL:** This system centralizes all border radius styling through theme configuration. Always use the theme system instead of hardcoded Tailwind classes like `rounded-lg`.

### System Overview
The border radius system provides consistent, theme-driven styling across all components through:
- **Global adjustment**: Choose 'sharp', 'medium', or 'soft' visual style
- **Element-specific mappings**: Different component types get appropriate border radius scales  
- **Centralized configuration**: All values defined in `lib/site.config.local.ts`
- **CSS variable injection**: Border radius scales become CSS variables in `app/layout.tsx`

### Configuration Structure

**1. Border Radius Scales** (`siteConfig.theme.borders.radiusScales`):
```typescript
radiusScales: {
  xs: '0.125rem',   // 2px - Very small elements
  sm: '0.25rem',    // 4px - Small elements  
  md: '0.375rem',   // 6px - Default elements
  lg: '0.5rem',     // 8px - Cards, inputs
  xl: '0.75rem',    // 12px - Large sections
  '2xl': '1rem',    // 16px - Very large elements
  '3xl': '1.5rem',  // 24px - Hero sections  
  full: '9999px',   // Fully rounded (pills, avatars)
  none: '0px'       // No rounding
}
```

**2. Element Mappings** (`siteConfig.theme.visualStyle.borderRadiusMappings`):
```typescript
borderRadiusMappings: {
  // Small UI elements
  badge: 'full',     // Pills/badges are fully rounded
  pill: 'full',      // Always fully rounded
  indicator: 'full', // Status indicators
  
  // Form elements  
  button: 'md',      // Standard button rounding
  input: 'md',       // Form inputs
  
  // Content containers
  card: 'lg',        // Cards and containers
  modal: 'xl',       // Modals and dialogs
  section: 'xl',     // Page sections
  
  // Media elements
  image: 'lg',       // Images and media
  avatar: 'full',    // Profile pictures
  
  // Navigation elements
  nav: 'md',         // Navigation items
  dropdown: 'md'     // Dropdown menus
}
```

**3. Global Visual Style** (`siteConfig.theme.visualStyle.borderRadius`):
- `'sharp'`: Reduces border radius by one scale step
- `'medium'`: Uses base scale as-is  
- `'soft'`: Increases border radius by one scale step

### Component Implementation

**Client Components** use the `useThemeBorderRadius` hook:
```typescript
import { useThemeBorderRadius } from '@/hooks/use-theme-border-radius';

function MyComponent() {
  const { getBorderRadiusClass } = useThemeBorderRadius();
  
  return (
    <div className={`${getBorderRadiusClass('card')} border p-4`}>
      Content
    </div>
  );
}
```

**Server Components** use CSS variables directly:
```typescript
// In server components, use CSS variables
<div className="rounded-[var(--radius-lg)] border p-4">
  Content  
</div>
```

### CSS Variables Generated
The system automatically injects these CSS variables:
- `--radius-xs` through `--radius-3xl`
- `--radius-full` and `--radius-none`

### Migration Guidelines

**❌ NEVER use hardcoded classes:**
```typescript
// BAD - hardcoded border radius
<div className="rounded-lg border">

// BAD - inconsistent across theme variants  
<Badge className="rounded-full">
```

**✅ ALWAYS use theme system:**
```typescript
// GOOD - uses theme system (client component)
const { getBorderRadiusClass } = useThemeBorderRadius();
<div className={`${getBorderRadiusClass('card')} border`}>

// GOOD - uses CSS variable (server component)  
<div className="rounded-[var(--radius-lg)] border">

// GOOD - Badge component uses theme automatically
<Badge variant="accent">
```

### Component Coverage
The following components are already migrated to use the theme system:
- ✅ `Badge`, `Button`, `Card`, `Input`, `Textarea`, `Skeleton`
- ✅ `ServiceCard`, `TestimonialCard`, `ThemedImage`, `ThemedSection`
- ✅ Process sections, hero stats, FAQ accordion
- ✅ Cookie consent banner and various page sections

### Customization Examples

**For pill-shaped badges:**
```typescript
// In site.config.local.ts
borderRadiusMappings: {
  badge: 'full'  // Makes all badges fully rounded
}
```

**For sharp, minimal design:**
```typescript
// In site.config.local.ts  
visualStyle: {
  borderRadius: 'sharp'  // Reduces all border radius by one step
}
```

**For soft, friendly design:**
```typescript
// In site.config.local.ts
visualStyle: {
  borderRadius: 'soft'   // Increases all border radius by one step
}
```

### Debugging & Common Issues

1. **"getElementBorderRadius is not a function"**
   - You're using the hook in a server component
   - Use CSS variables instead: `rounded-[var(--radius-lg)]`

2. **Border radius not updating**
   - Check the element mapping exists in `borderRadiusMappings`
   - Verify the component is using the theme system

3. **Inconsistent styling across pages**
   - Some components still use hardcoded classes
   - Run: `grep -r "rounded-[^[]" components/` to find hardcoded usage

### Testing & Verification
After making changes to the border radius system:
1. Run `npm run build` to ensure no build errors
2. Test all theme variants (v1, v2, v3) for consistency
3. Verify visual consistency across different component types
4. Check that global adjustments (sharp/medium/soft) work properly

## 20. How to Update This Doc

- **Validation:** All changes must be validated against the current codebase and config.
- **Checklist:**
  - Update for every new feature, pattern, or config option
  - Cross-link to new/updated blueprints or deep-dives
  - Mark any deprecated or superseded instructions
  - Review for clarity, discoverability, and accuracy
- **Process:**
  1. Review new/changed code, config, or patterns
  2. Update this doc with clear, actionable instructions
  3. Add cross-links to relevant files, blueprints, or onboarding docs
  4. Validate by running `npm run verify:local` and manual visual QA
  5. Commit and push only after all checks pass

---

This document is continuously updated as the codebase evolves. Always validate any onboarding or instructional doc against the current codebase and config files before acting.

## 21. Lessons from Past Phases & Common Pitfalls (Appendix)

### Key Lessons & Prevention Strategies

- **Always Validate Before Changing:**
  - Never assume a feature or pattern needs improvement—examine the current codebase and implementation first.
  - Use existing systems and extend them; do not create new systems unless absolutely necessary.

- **Config-Driven Everything:**
  - All visual and functional options (patterns, spacing, colors, animations) must be centrally configurable in `siteConfig` and theme variants.
  - Never hardcode brand colors or add new CSS variables/classes that aren't actually used by components.

- **Tailwind JIT & Dynamic Classes:**
  - Any class name computed at runtime must appear as a literal string in the source or be safelisted in `tailwind.config.ts`.
  - After changing config-driven classes, always rebuild and verify in the browser.

- **Section & Container Patterns:**
  - Never add container classes inside Section components—Section already provides the container.
  - For per-section pattern overrides, always extend the section's data schema and pass overrides via config, not hardcoded props.

- **Testing & Verification Discipline:**
  - Always run `npm run verify:local` after any significant change (build, lint, test, E2E, visual QA).
  - Never skip the verification workflow—each tool catches different issues.

- **Animation & Micro-Interaction:**
  - Use only compositor-friendly CSS properties (`transform`, `opacity`) for animations.
  - Always respect `prefers-reduced-motion` and test on low-end devices.
  - Use existing animation/interaction systems (e.g., `LazySection`, `PageTransitionWrapper`) and extend via config.

- **Accessibility & Performance:**
  - All color combos must meet WCAG AA contrast (4.5:1).
  - Test for keyboard navigation, screen reader support, and responsive behavior.
  - Never add features that degrade Core Web Vitals or accessibility.

- **Cultural & Client Context:**
  - Maintain Dutch/European professional tone—avoid aggressive marketing patterns.
  - Use meta-descriptive placeholders, not real copy, for all template content.

- **Bug-Fixing & Debugging Patterns:**
  - Always check parent component prop types before extending.
  - Use Tailwind v3+ shorthand classes (e.g., `size-full`, `shrink-0`).
  - For icon usage, always verify the icon exists in the library.
  - For backup/archive files, use `// @ts-nocheck` at the top to avoid TypeScript errors.

- **Critical Red Flags:**
  - "Module has no exported member" → Verify all imports exist.
  - "Type X is not assignable to type Y" → Check parent component prop types.
  - "structuredClone is not a function" → Missing testing dependencies.
  - ESLint import/named errors in tests → Add eslint-disable comment.
  - Tailwind deprecation warnings → Use new shorthand classes.
  - Build failing after icon changes → Verify lucide-react exports.

### What NOT to Do

- Don't add new CSS variables or utility classes that aren't used by components.
- Don't create new systems when existing ones can be extended.
- Don't focus on "trust" or "liveliness" keywords without understanding actual implementation needs.
- Don't skip the full verification workflow before merging or deploying.
- Don't hardcode content or structure in components—always use config/data files.

### How to Avoid Past Mistakes

- Read this doc, the latest design blueprints, and config files before starting any enhancement.
- Validate every change against the current codebase and config.
- Document every new pattern, config, or lesson in this doc for future maintainers.
- When in doubt, ask: "Does this already exist? Can I extend it instead of creating something new?"
- Always prioritize clarity, maintainability, and performance over novelty.

---

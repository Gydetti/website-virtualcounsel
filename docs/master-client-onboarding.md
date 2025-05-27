# Master Client Onboarding & Codebase Guide

Welcome to the **GMG Template Website 2025** master onboarding and handover document. This is the single source of truth for understanding, customizing, and maintaining the codebase. All information here is validated against the current codebase and onboarding docs—outdated or superseded instructions are clearly marked or omitted.

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
- **Best practice:** Prefer these primitives over raw HTML or third-party components for consistency and maintainability.

### Utility Modules
- **Files:** `lib/data-utils.ts`, `lib/tracking-utils.ts`, `lib/icon-utils.tsx`, `lib/animation.ts`, `lib/utils.ts`.
- **Pattern:** Centralize data transformation, tracking, icon, and animation logic. Review and extend these utilities as needed for new features.

### Layout & Navigation Patterns
- **Directory:** `components/layout/` contains AppShell, Section, PageTransitionWrapper, header, footer, navigation, etc.
- **Pattern:** Use AppShell for global layout, Section for section wrappers, PageTransitionWrapper for animated transitions, and navigation/header/footer for site-wide navigation. Sticky headers, dynamic navigation, and page transitions are all handled here.
- **Best practice:** Extend these primitives for new layout or navigation needs, and keep navigation config-driven via `siteConfig`.

### SEO & Structured Data Utilities
- **Directory:** `components/seo/` contains structured-data.tsx and blog-schema.tsx for rich JSON-LD schema generation.
- **Pattern:** Use and extend these utilities for advanced SEO needs, including custom schema types for new content.

### Analytics & Tracking
- **Directory:** `components/tracking/` contains DataLayerProvider, tracking-scripts.tsx, and PageViewTracker for analytics and consent gating.
- **Pattern:** All tracking scripts are consent-gated and config-driven. Extend these for new analytics providers or custom tracking needs.

### Content & Placeholder Extraction
- **Pattern:** All placeholder copy is centralized in `lib/data/staticContent.ts`. Use codemods/scripts to extract or replace placeholders and fallback images. CI and lint rules enforce no new inline placeholders.

---

This document is continuously updated as the codebase evolves. Always validate any onboarding or instructional doc against the current codebase and config files before acting.

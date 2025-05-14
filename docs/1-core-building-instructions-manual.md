# GMG Template Website 2025: Core AI Developer Manual

> **Purpose:** This manual is the single source of truth for any AI agent or developer customizing, extending, or onboarding new clients to the Entrepreneur Website Template. It covers every architectural, workflow, and customization detail validated by the codebase and documentation. **No assumptions—only facts and actionable guidance.**

---

## 1. Project Structure & File Mapping

- **Monorepo Root:** All code and docs live under a single repo. Key folders:
  - `app/` — Next.js App Router pages (home, about, blog, services, contact, landing, resources, legal, etc.)
  - `components/` — Reusable UI, layout, section, SEO, tracking, and cookie components
  - `lib/` — Data files, config, schemas, and utility functions
  - `public/` — Static assets (images, icons, favicon, etc.)
  - `assets/images/raw/` — Source images for optimization pipeline
  - `types/` — TypeScript type definitions
  - `tests/` — All tests (unit, integration, E2E)
  - `docs/` — All documentation, onboarding, and deep-dive blueprints

- **Key Config Files:**
  - `lib/site.config.local.ts` — **Single source of truth** for all client-specific settings (branding, theme, nav, features, tracking, etc.)
  - `lib/site.config.ts` — Zod schema for validating `site.config.local.ts`
  - `tailwind.config.ts` — Tailwind theme, tokens, and plugin setup
  - `app/globals.css` — Global CSS, typography, and utility classes
  - `.env.example` — Template for all required environment variables

---

## 2. Data-Driven Architecture & Zod Schema Enforcement

- **All content and config is data-driven.**
  - Section/component props are strictly typed and validated via Zod schemas in `lib/schemas/`.
  - Data for each section/page lives in `lib/data/<section>.ts` and is imported into pages/components.
  - `site.config.local.ts` is validated at build time by the Zod schema in `site.config.ts`.

- **Pattern:**
  1. Define schema in `lib/schemas/sections.schema.ts` (or similar)
  2. Export data in `lib/data/<section>.ts` with type `z.infer<typeof schema>`
  3. Parse data with schema for runtime safety
  4. Pass data as props to section components

- **Dynamic Page Composition:**
  - Page structures can be defined in `siteConfig.pageStructures` (array of section configs per route)
  - Use a `DynamicPageRenderer` to map section configs to components and data

---

## 3. Theming, Color, and Typography Systems

- **All theme values (colors, fonts, spacing, etc.) are set in `site.config.local.ts`**
- **Dual CSS Variable Pattern for Colors:**
  - For each color (primary, secondary, accent, etc.), both a hex and an RGB variable are set at build/SSR time in `app/layout.tsx`:
    - `--primary: #2563EB;`
    - `--primary-rgb: 37,99,235;`
  - Use `bg-[var(--primary)]` for solid fills, `bg-[rgba(var(--primary-rgb),0.1)]` for opacity/alpha backgrounds
- **Typography:**
  - Global font tokens set in `app/globals.css` and injected via `app/layout.tsx`
  - Heading/body font, base size, and spacing are all theme-configurable
- **No client-side theme provider:** All CSS variables are injected server-side for performance and SSR safety

---

## 4. Section/Component/Data Conventions & Dynamic Pages

- **Section components** live in `components/sections/` and are always data-driven
- **Data for each section** lives in `lib/data/<section>.ts` and is validated by Zod
- **Never hardcode content in components**—always update the data file
- **Dynamic routes** (e.g., `/services/[slug]`, `/blog/[slug]`, `/resources/[slug]`) fetch their data from `lib/data/` or a CMS
- **Section component variants**: Many section components accept a `variant` prop (`imageLeft`, `imageRight`, `centered`, and now `classic`). For `AboutSection`, the default variant renders a two-column layout without an image (text left, content right). Use `variant="classic"` to enable the original image-left layout with statistics.
- **Landing/Resource Pages:**
  - Shared data layer in `lib/data/resources.ts`
  - Shared content component in `components/resources/ResourceContent.tsx`
  - Dual-route system: `/landing/[slug]` (minimal layout, paid ads) and `/resources/[slug]` (full layout, organic)

---

## 5. Feature Flags, Route Gating, and Middleware

- **Feature flags** in `siteConfig.features` (e.g., `enableBlog`, `enableServices`, `enableLandingPages`, etc.)
- **Route gating** via `middleware.ts` — disables routes/pages if their feature flag is off
- **Navigation and sitemap** are driven by `siteConfig.enabledPages` and feature flags
- **To add a new gated section:**
  1. Add flag to `siteConfig.features` and Zod schema
  2. Add check in `middleware.ts`
  3. Update nav/sitemap logic

---

## 6. Asset/Image Pipeline & Optimization

- **Raw images** go in `assets/images/raw/<category>/`
- **Run `npm run image-optimize`** to generate optimized images in `public/images/` and `blurDataURL.json`
- **Use `OptimizedImage` component** for all images, with blur placeholder from `blurDataURL.json`
- **Commit both raw and optimized images** for CI consistency

---

## 7. SEO, Metadata, and Structured Data

- **Metadata** is built from `siteConfig` via `lib/metadata.ts` and can be overridden per page
- **Structured data** (JSON-LD) is injected via `components/seo/structured-data.tsx` (Organization, Website, BlogPost, FAQ, etc.)
- **Sitemap and robots.txt** are generated from enabled pages and dynamic routes
- **All SEO-critical files:** `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, `next-sitemap.config.js`

---

## 8. Testing & Quality Assurance

- **All tests live in `tests/`**
  - `tests/unit/` — Vitest + React Testing Library for components
  - `tests/integration/` — Vitest + MSW for API/middleware
  - `tests/e2e/` — Playwright for end-to-end browser tests
- **Run all tests:**
  - `npm test` (runs unit, integration, and E2E)
  - `npx vitest run --coverage` for coverage
  - `npx playwright test` for E2E
- **Accessibility:** Use `jest-axe` in Vitest for a11y checks
- **Add at least one smoke test for every critical page/flow**

---

## 9. Build, Lint, and Deployment Workflow

**Never skip any step.**

1. `rm -rf .next` (clear cache)
2. `npm run build` (must compile with zero errors)
3. `npm run lint` and `npm run lint -- --fix` (zero warnings/errors, import sort)
4. `npx biome check app components lib hooks` (optional, for style)
5. `npm test` (all tests green)
6. `npx playwright test` (E2E/smoke)
7. `npm run deploy` (deploy to staging, manually verify key pages)
8. Commit and push to `main` (triggers Vercel auto-deploy)

---

## 10. Tracking, Consent, and Analytics

- **Tracking scripts** (GTM, GA4, FB Pixel, LinkedIn, HubSpot, Google Ads) are only injected if:
  1. User has given consent (statistics/marketing)
  2. The tracking ID is set in `siteConfig.tracking`
- **Cookie consent** is managed via Cookiebot or a custom banner (feature flag)
- **Tracking scripts** live in `components/tracking/tracking-scripts.tsx` and are consent/ID gated
- **DataLayerProvider** and **PageViewTracker** are used for analytics

---

## 11. Extensibility, Future-Proofing, and AI Customization

- **All customization happens via `site.config.local.ts` and `lib/data/` files**
- **Add new theme tokens** by updating config, `app/layout.tsx`, and `globals.css`
- **Add new sections/pages** by creating data files, components, and updating config/schemas
- **All schemas are Zod-validated for type safety**
- **No hardcoded values in components**—everything is data/config driven
- **Content blocks/slices** can be added for richer content pages (see `lib/schemas/contentBlocks.schema.ts`)
- **All onboarding, improvement, and deep-dive docs are in `docs/`**

---

## 12. Known Caveats, Gotchas, and Troubleshooting

- **Never hardcode colors, fonts, or content in components**—always use theme variables and data files
- **All theme logic is server-side; no runtime theme switching**
- **Always run the full build/lint/test/deploy workflow before merging to `main`**
- **If you see a build or lint error about imports, run `npm run lint -- --fix`**
- **If tracking scripts load without consent or with empty IDs, check `siteConfig.tracking` and consent logic**
- **For new providers or features, always update Zod schemas and onboarding docs**
- **If in doubt, consult the onboarding docs in `docs/building/onboarding/` and the deep-dive blueprints in `docs/building/general/`**

---

**This manual is always evolving. If you add new features, update this doc and the onboarding/deep-dive docs accordingly.**

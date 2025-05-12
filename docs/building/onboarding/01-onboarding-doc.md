# Client Onboarding Guide

Welcome to the **Entrepreneur Website Template** onboarding guide. This document walks you through every step—from initial setup to deployment—so you can confidently customize the codebase for any new client. It covers file paths, configuration files, feature flags, asset pipelines, and quality gates.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Clone & Initial Setup](#clone--initial-setup)
3. [Environment Variables](#environment-variables)
4. [site.config.local.ts (Client Settings)](#siteconfiglocalts-client-settings)
5. [Theme & Branding Customization](#theme--branding-customization)
6. [Navigation & Footer Links](#navigation--footer-links)
7. [Pages & Feature Flags](#pages--feature-flags)
8. [Section Components & Data](#section-components--data)
9. [Images & Asset Pipeline](#images--asset-pipeline)
10. [SEO & Metadata](#seo--metadata)
11. [Cookie Consent & Tracking](#cookie-consent--tracking)
12. [Linting, Formatting & Imports](#linting-formatting--imports)
13. [Testing & Quality Assurance](#testing--quality-assurance)
14. [Build, Deployment & CI](#build-deployment--ci)
15. [Rollback & Emergency Recovery](#rollback--emergency-recovery)
16. [Additional Resources](#additional-resources)
17. [Contact Form & Email Provider Setup](#contact-form--email-provider-setup)
18. [Sitemap, Robots & PWA Manifest](#sitemap-robots--pwa-manifest)
19. [Project Utility Scripts](#project-utility-scripts)
20. [Middleware & Feature Flags Deep-Dive](#middleware--feature-flags-deep-dive)
21. [Updating Dynamic Content Data](#updating-dynamic-content-data)
22. [next.config & Image Strategy](#nextconfig--image-strategy)
23. [Additional Tailwind Tokens](#additional-tailwind-tokens)
24. [Test Utilities & Coverage](#test-utilities--coverage)
25. [Localised Strings & i18n (Optional)](#localised-strings--i18n-optional)

---

## Prerequisites

- Node.js 18+ & npm (or Yarn)
- Git command-line tools
- VS Code or your preferred editor
- A working terminal (bash, zsh)

---

## Clone & Initial Setup

1. Clone the repository and enter the folder: --> THIS IS USUALLY ALREADY DONE BY ME (GYDO, YOUR HUMAN USER ASSISTANT)
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Git hooks (Husky):
   ```bash
   npm run prepare
   ```
   - `pre-commit` runs `npm run image-optimize` and stages `/public/images`
   - `pre-push` runs `npm run build`
4. Generate optimized assets (images & blur placeholders):
   ```bash
   npm run image-optimize
   ```
5. Create a local environment file from the example:
   ```bash
   cp .env.example .env.local
   ```
   Fill in all values under [Environment Variables](#environment-variables).
6. Start the development server:
   ```bash
   npm run dev
   ```

---

## Environment Variables

Copy `.env.example` to `.env.local` and set these at minimum:

```ini
# Cookie Consent
NEXT_PUBLIC_COOKIEBOT_ID=

# reCAPTCHA (Contact Form)
RECAPTCHA_SECRET_KEY=

# SMTP (Contact Form)
SMTP_HOST=
SMTP_PORT=
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=

# SendGrid (optional)
SENDGRID_API_KEY=
SENDGRID_FROM_EMAIL=

# Postmark (optional)
POSTMARK_API_TOKEN=
POSTMARK_FROM_EMAIL=

# Newsletter Provider
NEXT_PUBLIC_NEWSLETTER_PROVIDER= # mailchimp | hubspot | activecampaign
HUBSPOT_PORTAL_ID=
HUBSPOT_FORM_ID=
MAILCHIMP_API_KEY=
MAILCHIMP_LIST_ID=
ACTIVECAMPAIGN_API_URL=
ACTIVECAMPAIGN_API_TOKEN=
```

Ensure each non-empty variable matches your client's account or service.

---

## site.config.local.ts (Client Settings)

**File:** `lib/site.config.local.ts`

This is your single source of truth for all client-specific data:

- **site** – title, description, URL, openGraph image, Twitter card
- **theme** – brand colors, logo (src/alt), favicon path
- **navLinks**, **footerLinks** – arrays defining navigation structure
- **social** – Facebook, Twitter, Instagram, LinkedIn URLs
- **cookieConsent** – `cookiebotId` (if using Cookiebot)
- **tracking** – GTM, GA4, FB Pixel, LinkedIn, HubSpot, Google Ads IDs
- **newsletter** – provider and API/form keys
- **features** – feature flags to enable/disable sections
- **enabledPages** – which routes/pages to render & include in sitemap
- **contactForm** – fields, provider, reCAPTCHA, honeypot name
- **contact** – email, phone, address, hours
- **sections** – default data for hero, blog limit, pricing cards, etc.

**To customize:**

1. Open `lib/site.config.local.ts`.
2. Replace placeholder strings (`""`) with your client's real values.
3. Toggle booleans under `features` to disable entire sections when not needed.
4. Update `enabledPages` to reflect only the routes your client requires.

```ts
export const siteConfig = {
  site: {
    title: "ACME Corp",
    description: "ACME's professional services",
    url: "https://client-site.com",
    name: "ACME Corp",
    openGraph: {
      image: { url: "/images/og.png", width: 1200, height: 630, alt: "ACME" },
    },
    twitterImage: "/images/twitter.png",
  },
  theme: {
    colors: { primary: "#FF0000", secondary: "#00FF00", accent: "#0000FF" },
    logo: { src: "/logo.svg", alt: "ACME Logo" },
    favicon: "/favicon.ico",
  },
  navLinks: [
    { text: "Home", href: "/" },
    { text: "About", href: "/about" },
  ],
  footerLinks: [
    /* similar shape */
  ],
  social: {
    facebook: "https://fb.com/acme",
    twitter: "https://twitter.com/acme",
    instagram: "https://insta.com/acme",
    linkedin: "https://linkedin.com/acme",
  },
  cookieConsent: { cookiebotId: "XXXX-XXXX" },
  tracking: {
    gtmId: "GTM-XXXX",
    ga4Id: "G-XXXX",
    fbPixelId: "XXXX",
    linkedinId: "XXXX",
    hubspotId: "XXXX",
    googleAdsId: "AW-XXXX",
  },
  newsletter: {
    provider: "hubspot",
    hubspot: { portalId: "123", formId: "456" } /*..*/,
  },
  features: {
    enableBlog: true,
    enableServices: true,
    enableFooterServices: true /*..*/,
  },
  enabledPages: ["/", "/services", "/about", "/contact"],
  contactForm: {
    provider: "smtp",
    fields: [
      /*..*/
    ],
    recaptchaSiteKey: "",
    honeypotFieldName: "honeypot",
  },
  contact: {
    email: "info@client.com",
    phone: "123-456-7890",
    address: {
      /*..*/
    },
    hours: { monFri: "9-5", sat: "Closed", sun: "Closed" },
  },
  sections: {
    hero: {
      /*..*/
    },
    blog: { limit: 5 },
    pricing: {
      cards: [
        /*..*/
      ],
    },
  },
} as const;
```

---

## Theme & Branding Customization

### Tailwind Configuration

**File:** `tailwind.config.ts`

- Adjust `theme.extend.colors.brand.*` or define new `colors` under `extend`. These map to CSS variables used by shadcn/ui components.
- To change container padding or breakpoints, update the `theme.container` object.

### Fonts & Global Styles

**File:** `app/globals.css` & `app/layout.tsx`

- Font imports in `app/layout.tsx` via `next/font/google`.
- CSS variables (e.g., `--font-poppins`) are applied to `<body>`.
- Modify or add global utilities in `globals.css` as needed.

### Logo & Favicon

- Place logo/favicons under `public/` (e.g., `public/logo.svg`).
- Reference paths in `site.config.local.ts`.

---

## Navigation & Footer Links

**Nav:** rendered in `components/layout/header.tsx` using `siteConfig.navLinks`.
**Footer:** rendered in `components/layout/footer.tsx` using `siteConfig.footerLinks`.

1. Open `lib/site.config.local.ts` → `navLinks` & `footerLinks`.
2. For each link:
   ```ts
   { text: string, href: string, external?: boolean }
   ```
3. To highlight active routes, the `<Header>` component matches `href` to current path.

---

## Pages & Feature Flags

### Enabling/Disabling Sections

- Use `siteConfig.features.enableX` in `lib/site.config.local.ts`.
- Middleware (`middleware.ts`) enforces route availability for `/blog`, `/services`, and `/contact`.

### Adding a New Page

1. Create a new folder under `app/`, e.g., `app/testimonial/`.
2. Add `page.tsx` with a default export of your React component.
3. Include metadata in `app/testimonial/metadata.ts` if needed.
4. Add `/testimonial` to `siteConfig.enabledPages` and to `navLinks`.

### Dynamic Routes

- Services: `app/services/[slug]/page.tsx` reads data from `lib/data/services.ts` or CMS.
- Blog: `app/blog/[slug]/page.tsx`.
- Ensure your data module exports an array of slugs and props.

---

## Section Components & Data

> **IMPORTANT:** All content for each section lives in a data file under `lib/data/`. Currently, the only data file is `lib/data/homepage.ts`, which exports `heroSectionData`, `featuresSectionData`, `clientsSectionData`, and other homepage-related data. Never edit the component files in `components/sections/` directly to change text, images, links, or stats; always update the corresponding data file. When you add new pages or custom sections, create a new data file (e.g. `lib/data/services.ts`) exporting the appropriate `<SectionName>SectionData`.

**Pattern:** Data-driven.

1. **Data file:** `lib/data/<section>.ts` exports typed arrays/objects.
2. **Section component:** `components/sections/<section>-section.tsx` consumes props.
3. **Integration:** In a page (e.g., `app/page.tsx`), import data + component:

   ```tsx
   import { featuresData } from "@/lib/data/features";
   import FeaturesSection from "@/components/sections/features-section";

   <LazySection>
     <FeaturesSection {...featuresData} />
   </LazySection>;
   ```

If you add a new section:

- Create its data file under `lib/data/` (export a Zod-validated shape if desired).
- Add its component under `components/sections/` following existing patterns.
- Update `siteConfig.sections` shape and Zod schema (`lib/site.config.ts`) if needed.

---

## Images & Asset Pipeline

1. **Raw assets**: place in `assets/images/raw/<category>/` (e.g., `team`, `services`).
2. **Placeholders**: copy existing placeholders to `assets/images/raw/placeholders/`.
3. **Optimize**: run:
   ```bash
   npm run image-optimize
   ```
   - Copies raw → `public/images/<category>/`
   - Generates `public/images/blurDataURL.json` for low-res placeholders.
4. **Usage**: in React components, import `OptimizedImage`:
   ```tsx
   <OptimizedImage
     src="/images/services/service1.jpg"
     alt="Service 1"
     placeholder="blur"
     blurDataURL={blurMap["/images/services/service1.jpg"]}
   />
   ```
5. Commit both `assets/images/raw` and generated `public/images` + `blurDataURL.json` to preserve CI consistency.

---

## SEO & Metadata

- **Metadata util:** `lib/metadata.ts` builds default Metadata from `siteConfig`.
- **Structured Data:** `components/seo/structured-data.tsx` for Organization and Website schemas.
- **Page-level overrides:** supply a `metadata.ts` file alongside `page.tsx`:
  ```ts
  export const metadata = defaultMetadata({
    title: "Custom Page",
    description: "...",
  });
  ```

---

## Cookie Consent & Tracking

- **Cookiebot:** configured via `NEXT_PUBLIC_COOKIEBOT_ID`, loaded in `app/layout.tsx` → `CookiebotLoaderClient`.
- **Custom Banner:** enable via `siteConfig.features.enableCustomCookieBanner` and component `CookieConsentBanner`.
- **Tracking scripts:** `components/tracking/tracking-scripts.tsx` respects cookie categories (`statistics`, `marketing`).
- **Tracking script optimization:** *Tracking scripts are only injected if both consent is given and the corresponding tracking ID in `siteConfig.tracking` is set (non-empty). This prevents empty or broken script loads, improves performance, and keeps onboarding/automation simple—just add the ID to enable a platform.*
- **Data layer:** `DataLayerProvider` + `PageViewTracker` inject into pages.

---

## Linting, Formatting & Imports

- **ESLint:** rules in `.eslintrc.json` & Biome in `biome.toml`.
- **Import sorting:** run `npm run lint -- --fix` to apply `simple-import-sort` conventions.
- **Formatting:** `npm run format` (Prettier).
- **Pre-commit hook:** Image optimize & stage images.
- **Pre-push hook:** Full build.
- **Manually:**
  ```bash
  npm run lint -- --max-warnings=0
  npm run format
  ```

---

## Testing & Quality Assurance

- **Unit tests:** Vitest config in `vitest.config.ts`; setup in `vitest.setup.ts`.
- **E2E tests:** Playwright config in `playwright.config.ts`; tests live under `tests/` (create this folder).
- **Seed tests:** add at least one smoke test (e.g., home page loads).
  ```ts
  // tests/home.spec.ts
  import { test, expect } from "@playwright/test";
  test("homepage loads", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/ACME Corp/);
  });
  ```

---

## Build, Deployment & CI

1. **Local build:**
   ```bash
   npm run build
   npm start
   ```
2. **Staging deploy:**
   ```bash
   npm run deploy
   ```
3. **CI script:** `npm run ci:verify` runs build + lint (no warnings) + tests.
4. **GitHub Actions:** see `.github/workflows/ci.yml` – gates PRs & pushes to `main`.
5. **Vercel:** configure Build Command to `npm run ci:verify` and set environment variables in Vercel dashboard.

---

## Rollback & Emergency Recovery

If you need to revert to the original, minimal workflow:

1. Remove `ci:verify` from `package.json`.
2. Delete `.github/workflows/ci.yml`.
3. The existing Husky hooks (`.husky/pre-commit` & `.husky/pre-push`) will continue to run image optimization and builds locally.

---

## Additional Resources

- **README.md** – high-level template overview
- **lib/site.config.ts** – Zod validation schema
- **components/** – directory reference for UI, layout, sections, tracking, SEO
- **scripts/** – image-optimize & codemod scripts
- **.husky/** – commit/push hooks definitions
- **.env.example** – environment variable template

_End of guide._

## Contact Form & Email Provider Setup

The public-facing form component lives in `components/sections/contact-section.tsx` (or the standalone Contact page component). The backend endpoint is **`app/api/contact/route.ts`** which supports six providers:

| Provider (`siteConfig.contactForm.provider`) | Required env vars                                                               |
| -------------------------------------------- | ------------------------------------------------------------------------------- |
| `smtp` (default)                             | `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`               |
| `sendgrid`                                   | `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`                                       |
| `postmark`                                   | `POSTMARK_API_TOKEN`, `POSTMARK_FROM_EMAIL`                                     |
| `mailchimp`                                  | `MAILCHIMP_TRANSACTIONAL_API_KEY`, `MAILCHIMP_TRANSACTIONAL_FROM_EMAIL`         |
| `activeCampaign`                             | `ACTIVECAMPAIGN_API_URL`, `ACTIVECAMPAIGN_API_KEY`, `ACTIVECAMPAIGN_FROM_EMAIL` |
| `hubspot`                                    | `HUBSPOT_API_KEY`, `HUBSPOT_FROM_EMAIL`                                         |

Steps:

1. Choose provider in `lib/site.config.local.ts` → `contactForm.provider`.
2. Update `.env.local` with the variables above.
3. Adjust `contactForm.fields` if you need extra fields (remember to update `contactSchema` in the API route for validation).
4. If using reCAPTCHA, set `siteConfig.contactForm.recaptchaSiteKey` **and** `RECAPTCHA_SECRET_KEY`.

---

## Sitemap, Robots & PWA Manifest

| File                     | Purpose                                                                       | How to customize                                                                       |
| ------------------------ | ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `app/sitemap.ts`         | Generates the XML sitemap using `siteConfig.enabledPages` and dynamic routes. | Update priorities, change frequencies or add extra URLs as needed.                     |
| `app/robots.ts`          | Exposes robots.txt rules.                                                     | Modify the `disallow` array or sitemap URL to match production domain.                 |
| `app/manifest.ts`        | Provides the Web App Manifest for PWA support.                                | Replace icons under `public/icons/`, update `name`, `theme_color`, `background_color`. |
| `next-sitemap.config.js` | Config for the `next-sitemap` postbuild step.                                 | Set `siteUrl` to your client domain and tweak trailingSlash, priority defaults, etc.   |

After editing these files run:

```bash
npm run build && npm run sitemap
```

`postbuild` automatically executes `next-sitemap` in CI.

---

## Project Utility Scripts

| Script                 | Location                           | What it does                                                                                          |
| ---------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `image-optimize`       | `scripts/image-optimize.js`        | Optimises raw images → `public/images` & builds `blurDataURL.json`. Runs in pre-commit & CI.          |
| `ensure-react-imports` | `scripts/ensure-react-imports.js`  | Adds `import React` to legacy runtime files. Rarely needed with Next 14, but handy for older content. |
| `codemod`              | `scripts/convert-react-runtime.js` | Converts files from classic React runtime to the automatic runtime if you migrate legacy components.  |
| `partytown`            | npm script – `partytown copylib`   | Copies Partytown worker files to `public/~partytown` so third-party scripts run off-main-thread.      |

Run any script with `npm run <name>`.

---

## Middleware & Feature Flags Deep-Dive

`middleware.ts` rewrites requests to `/404` when a route is disabled via `siteConfig.features`. If you add new gated sections:

1. Extend the `features` object in `lib/site.config.local.ts` _and_ the Zod schema in `lib/site.config.ts`.
2. Add a corresponding check in `middleware.ts`, updating the `matcher` export so only those paths are intercepted.

---

## Updating Dynamic Content Data

- **Services**: Data for each service slug can live in `lib/data/services.ts` (create this file if missing) or be fetched from a CMS. Each object should include `slug`, `title`, `summary`, and any props consumed by `components/sections/services-section.tsx`.
- **Blog**: The default template expects Markdown/MDX under `content/blog/` or a headless CMS fetch. Include `slug`, `title`, `date`, `excerpt`, `coverImage`, etc.

Update your page generators (`app/services/[slug]/page.tsx`, `app/blog/[slug]/page.tsx`) to import or fetch the enriched data as required.

---

## next.config & Image Strategy

`next.config.mjs` currently sets `images.unoptimized = true`. If you prefer the built-in Next Image Optimization:

1. Remove or set `images.unoptimized = false`.
2. Add `images.domains` or a custom loader if you keep files on a CDN.
3. Ensure your Vercel / hosting plan supports the on-the-fly optimizer.

---

## Additional Tailwind Tokens

- Define CSS custom properties in `app/globals.css` (e.g., `--brand-primary`) so `tailwind.config.ts` color tokens (`brand.primary`) resolve correctly.
- Utility classes for animations (`blink`, `typing`, `accordion-down`) are already configured—reuse them for new components to ensure consistency.

---

## Test Utilities & Coverage

- `vitest.setup.ts` polyfills `IntersectionObserver` so Framer Motion tests don't fail in JSDOM.
- Consider adding `jest-axe` a11y assertions inside your Vitest tests:
  ```ts
  import { axe } from 'jest-axe';
  const { container } = render(<HeroSection />);
  expect(await axe(container)).toHaveNoViolations();
  ```
- Generate a coverage report with:
  ```bash
  npx vitest run --coverage
  ```

---

## Localised Strings & i18n (Optional)

Internationalisation is not built-in, but if your client requires multiple languages:

1. Add `next-intl` or `next-translate`.
2. Move copy from `lib/data/` files to locale JSON files.
3. Adjust `middleware.ts` to prepend `/:locale` to match patterns.

---

**You now have full coverage of every moving part in this codebase.**

_Happy launching!_

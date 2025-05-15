# Entrepreneur Website Template

A modern, responsive website template for entrepreneurs and small businesses looking to establish a strong online presence. Built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui components.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Pages](#pages)
- [Components](#components)
- [Analytics & Tracking](#analytics--tracking)
- [Cookie Consent System](#cookie-consent-system)
- [SEO Optimization](#seo-optimization)
- [Performance Considerations](#performance-considerations)
- [Customization Guide](#customization-guide)
- [Getting Started](#getting-started)
- [AI-Powered Copy & UX/UI Client Onboarding](#ai-powered-copy--uxui-client-onboarding)

## Overview

This template is designed for entrepreneurs and small businesses who want to establish a professional online presence. It includes all the essential pages and components needed for a business website, with a focus on lead generation, service presentation, and content marketing. The idea is that the admin user (Gydo) will work with AI coding tools to clone this codebase and customize to tailer it to new clients need. It functions as a optimised ready to go codebase to quickly deploy modern smooth and slick websites for entrepreneurs wihtout them having to care about code or any CMS management.

The template is built with modern web technologies:

- **Next.js 14+** with App Router for server-side rendering and optimized performance
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for responsive, utility-first styling
- **shadcn/ui** for high-quality, accessible UI components
- **Framer Motion** for smooth animations and transitions

## Project Structure

The project follows a standard Next.js App Router structure with some additional organization for components and utilities:

\`\`\`
entrepreneur-website-template/
├── app/ # Next.js App Router pages
│ ├── about/ # About page
│ ├── blog/ # Blog section with dynamic routes
│ ├── contact/ # Contact page
│ ├── faq/ # FAQ page
│ ├── landing/ # Landing pages for paid-ads funnels
│ ├── privacy-policy/ # Privacy policy page
│ ├── resources/ # Resource pages (e-books, whitepapers, case studies)
│ ├── services/ # Services section with dynamic routes
│ ├── terms-of-service/ # Terms of service page
│ ├── cookie-policy/ # Cookie policy page
│ ├── globals.css # Global styles
│ ├── layout.tsx # Root layout with metadata
│ ├── not-found.tsx # 404 page
│ └── page.tsx # Homepage
├── components/ # Reusable components
│ ├── cookie/ # Cookie consent components
│ ├── layout/ # Layout components (header, footer)
│ ├── sections/ # Page sections (hero, features, etc.)
│ ├── seo/ # SEO components
│ ├── tracking/ # Tracking and analytics components
│ └── ui/ # UI components (buttons, cards, etc.)
├── hooks/ # Custom React hooks
├── lib/ # Utility functions and data
├── public/ # Static assets
└── types/ # TypeScript type definitions
\`\`\`

## Key Features

1. **Modern Design**: Clean, professional design with attention to typography, spacing, and visual hierarchy
2. **Fully Responsive**: Optimized for all device sizes from mobile to desktop
3. **Performance Optimized**: Fast loading times with optimized images and code splitting
4. **SEO Ready**: Proper metadata, structured data, and semantic HTML
5. **Analytics Integration**: Ready-to-use integrations with popular analytics platforms
6. **Cookie Consent System**: GDPR-compliant cookie consent management
7. **Accessibility**: WCAG-compliant components and keyboard navigation
8. **Content Sections**: Pre-built sections for services, testimonials, blog, etc.
9. **Dynamic Routes**: Dynamic pages for services and blog posts
10. **Contact Form**: Ready-to-use contact form with validation

## Pages

### Homepage (`app/page.tsx`)

The homepage showcases the business's key offerings and value proposition. It includes:

- Hero section with animated typing effect
- Client logos section
- Services overview
- Features comparison
- About section
- Process explanation
- Testimonials carousel
- Blog preview
- Call-to-action section
- Contact form

### Services Page (`app/services/page.tsx`)

Lists all services with descriptions and links to individual service pages.

### Individual Service Page (`app/services/[slug]/page.tsx`)

Detailed page for each service with:

- Service description
- Key benefits
- Process explanation
- FAQs
- Testimonials
- Call-to-action

### Blog Page (`app/blog/page.tsx`)

Blog listing page with featured post and regular posts.

### Blog Post Page (`app/blog/[slug]/page.tsx`)

Individual blog post page with:

- Post content
- Author information
- Related posts
- Social sharing

### About Page (`app/about/page.tsx`)

Company information page with:

- Company story
- Team members
- Values and mission
- Statistics and achievements

### Contact Page (`app/contact/page.tsx`)

Contact form and information page.

### Landing Pages (`app/landing/[slug]/page.tsx`)

- Slim, focused pages designed for paid advertising campaigns and specific funnels.
- Minimal header and footer to reduce distractions and maximize conversion.
- Content is dynamically pulled from `lib/data/resources.ts`, sharing data with the full `/resources` pages.
- Not typically included in main site navigation or sitemap to maintain targeted traffic flow.

### Resource Pages (`app/resources/page.tsx` and `app/resources/[slug]/page.tsx`)

- **Index Page (`app/resources/page.tsx`)**: Lists all available resources (e-books, whitepapers, case studies, etc.).
- **Detail Page (`app/resources/[slug]/page.tsx`)**:
    - Provides full content for each resource, using a shared `ResourceContent` component.
    - Includes the standard site header and footer for full navigation.
    - Designed for organic discovery, SEO, and inclusion in the sitemap.
    - Shares its underlying data with the corresponding `/landing/[slug]` page.

### FAQ Page (`app/faq/page.tsx`)

Frequently asked questions with searchable accordion.

### Legal Pages

- Privacy Policy (`app/privacy-policy/page.tsx`)
- Terms of Service (`app/terms-of-service/page.tsx`)
- Cookie Policy (`app/cookie-policy/page.tsx`)

### 404 Page (`app/not-found.tsx`)

Custom 404 error page.

## Components

### Layout Components

#### Header (`components/layout/header.tsx`)

- Responsive navigation with mobile menu
- Sticky header with scroll effect
- Active link highlighting

#### Footer (`components/layout/footer.tsx`)

- Multi-column layout with links
- Newsletter subscription form
- Social media links
- Contact information
- Legal links and cookie settings

### Section Components

#### Hero Section (`components/sections/hero-section.tsx`)

- Animated typing effect
- Call-to-action buttons
- Statistics counter
- Hero image with decorative elements

#### Services Section (`components/sections/services-section.tsx`)

- Service cards with icons
- Popular service highlighting
- Feature lists

#### Features Section (`components/sections/features-section.tsx`)

- Comparison between with/without services
- Visual differentiation with icons

#### About Section (`components/sections/about-section.tsx`)

- Company introduction with optional badge, heading, paragraphs, and CTA
- Philosophy box highlighting core beliefs
- Feature cards showcasing key credentials or benefits
- Supports `variant` prop:
  - default: two-column layout without an image (text & CTA on left, content on right)
  - `classic`: legacy image-left layout with statistics and decorative image

#### Process Section (`components/sections/process-section.tsx`)

- Step-by-step process explanation
- Timeline visualization
- Detailed descriptions

#### Testimonials Section (`components/sections/testimonials-section.tsx`)

- Testimonial carousel
- Client photos and quotes
- Rating stars

#### Blog Section (`components/sections/blog-section.tsx`)

- Blog post cards
- Category badges
- Read more links

#### CTA Section (`components/sections/cta-section.tsx`)

- Call-to-action with buttons
- Visual background

#### Contact Section (`components/sections/contact-section.tsx`)

- Contact form with validation
- Contact information
- Business hours

#### Clients Section (`components/sections/clients-section.tsx`)

- Client logos carousel
- Grayscale to color hover effect

#### Homepage FAQ Section (`components/sections/homepage-faq-section.tsx`)

- Accordion-based FAQ list optimized for the homepage (no search bar)
- Pulls data from `lib/data/homepage.ts` via the `homepageFaqCategories` export
- Usage example in `app/page.tsx`:

```tsx
<HomepageFaqSection categories={homepageFaqCategories} />
```

### Resource Content & Section Components (`components/resources/`)

- **`ResourceContent.tsx`**: A shared component that renders the main content for both `/landing/[slug]` and `/resources/[slug]` pages. It typically includes a hero section and then dynamically renders a series of sub-sections.
- **`TextSection.tsx`**: Renders a block of text content for a resource.
- **`ImageSection.tsx`**: Renders an image within a resource page.
- **`FormSection.tsx`**: Renders a form (often an embed from a third-party provider like HubSpot) within a resource, typically used for lead capture on landing pages.

### Data-Driven Section Component Pattern

When you add or update a section component, follow this structure for consistency:

1. **Data Definition** – Declare your content shape in a file under `lib/data/` and export it (e.g., `homepageFaqCategories`).
2. **Section Component** – Create a component under `components/sections/` that accepts props matching your data shape.
3. **Page Integration** – Import both the data and component into your page (e.g., `app/page.tsx`), then render the section with `<LazySection>` for deferred loading:

   ```tsx
   import { homepageFaqCategories } from "@/lib/data/homepage";
   import HomepageFaqSection from "@/components/sections/homepage-faq-section";

   <LazySection>
     <HomepageFaqSection categories={homepageFaqCategories} />
   </LazySection>;
   ```

4. **Styling & Behavior** – Ensure the section adheres to the design tokens and responsive utility classes in `globals.css` and `tailwind.config.ts`.
5. **SEO & Accessibility** – Use `StructuredData` for schema markup if applicable, and semantic HTML for headings, lists, and interactive elements.

### UI Components

#### Service Card (`components/ui/service-card.tsx`)

Reusable card component for displaying services.

#### Blog Card (`components/ui/blog-card.tsx`)

Reusable card component for displaying blog posts.

#### Testimonial Card (`components/ui/testimonial-card.tsx`)

Reusable card component for displaying testimonials.

#### FAQ Accordion (`components/ui/faq-accordion.tsx`)

Accordion component for FAQs with search functionality.

#### Section Divider (`components/ui/section-divider.tsx`)

Visual divider between sections with various styles.

#### Scroll To Top (`components/ui/scroll-to-top.tsx`)

Button that appears when scrolling to navigate back to top.

### Cookie and Tracking Components

#### Cookie Consent Banner (`components/cookie/cookie-consent-banner.tsx`)

GDPR-compliant cookie consent banner with customizable preferences.

#### Cookie Settings Button (`components/cookie/cookie-settings-button.tsx`)

Button to reopen cookie preferences.

#### Tracking Scripts (`components/tracking/tracking-scripts.tsx`)

Component that loads tracking scripts based on cookie consent.

#### Data Layer Provider (`components/tracking/data-layer-provider.tsx`)

Initializes the data layer for tracking.

#### Page View Tracker (`components/tracking/page-view-tracker.tsx`)

Tracks page views across route changes.

### SEO Components

#### Structured Data (`components/seo/structured-data.tsx`)

- Implements JSON-LD structured data for better search engine understanding
- Supports Organization, WebSite, and BreadcrumbList schemas
- Customizable with props

#### Blog Post Schema (`components/seo/blog-post-schema.tsx`)

- Implements JSON-LD structured data for blog posts
- Includes article, author, and publisher information
- Customizable with props

#### Breadcrumb (`components/ui/breadcrumb.tsx`)

- Dynamic breadcrumb navigation based on current path
- Includes structured data for SEO
- Customizable separators and styling

### Performance Components

#### Optimized Image (`components/ui/optimized-image.tsx`)

- Enhanced version of Next.js Image component
- Built-in loading state with placeholder
- Optimized for Core Web Vitals

#### Lazy Section (`components/ui/lazy-section.tsx`)

- Intersection Observer-based lazy loading for sections
- Various animation options (fade, slide, zoom)
- Improves initial page load performance

## Analytics & Tracking

The template includes integrations with popular analytics and tracking platforms:

### Google Tag Manager

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `GTM-XXXXXXX`
- Loads only when analytics consent is given
- **Optimization:** *Tracking scripts are only injected if both consent is given and the corresponding tracking ID in `siteConfig.tracking` is set (non-empty). This prevents empty or broken script loads, improves performance, and keeps onboarding/automation simple—just add the ID to enable a platform.*

### Google Analytics 4

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `G-XXXXXXXXXX`
- Loads only when analytics consent is given

### Facebook Pixel

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXXXXXXXXXXXX`
- Loads only when marketing consent is given

### LinkedIn Insight Tag

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXX`
- Loads only when marketing consent is given

### HubSpot Tracking

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `XXXXXXX`
- Loads only when marketing consent is given

### Google Ads Conversion Tracking

- Implementation in `components/tracking/tracking-scripts.tsx`
- Placeholder: `AW-XXXXXXXXXX`
- Loads only when marketing consent is given

### Tracking Utilities

The `lib/tracking-utils.ts` file provides utility functions for tracking events across different platforms:

- `trackGAEvent`: Track events in Google Analytics
- `trackFBEvent`: Track events in Facebook Pixel
- `trackLinkedInEvent`: Track events in LinkedIn
- `trackHubSpotEvent`: Track events in HubSpot
- `trackGoogleAdsConversion`: Track conversions in Google Ads
- `trackEvent`: Generic function that tracks across all platforms

## Cookie Consent System

The template includes a comprehensive cookie consent system that complies with GDPR and other privacy regulations:

- **Tracking script optimization:** *Tracking scripts are only injected if both consent is given and the corresponding tracking ID in `siteConfig.tracking` is set (non-empty). This prevents empty or broken script loads, improves performance, and keeps onboarding/automation simple—just add the ID to enable a platform.*

### Cookie Consent Hook (`hooks/use-cookie-consent.tsx`)

- Manages user consent preferences
- Persists preferences in local storage
- Provides functions to update consent

### Cookie Consent Banner (`components/cookie/cookie-consent-banner.tsx`)

- Initial consent banner
- Detailed preferences modal
- Options for necessary, analytics, marketing, and preferences cookies

### Cookie Settings Button (`components/cookie/cookie-settings-button.tsx`)

- Button to reopen cookie preferences
- Located in the footer

### Cookiebot Integration

- Optional integration with Cookiebot
- Script in `app/layout.tsx` pulls your ID from `process.env.NEXT_PUBLIC_COOKIEBOT_ID`
- To configure:
  1. In your hosting platform (e.g., Vercel), set the environment variable:
     ```bash
     NEXT_PUBLIC_COOKIEBOT_ID=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     ```
  2. Deploy so that the Cookiebot `<Script>` runs with `strategy="beforeInteractive"` before other scripts.
  3. Ensure any tracking `<Script>` tags you add use:
     ```tsx
     type="text/plain"
     data-cookieconsent="statistics"  // for analytics scripts
     data-cookieconsent="marketing"   // for marketing scripts
     ```
     Cookiebot will block/unblock those scripts based on user consent.
- Testing the setup:
  - Open the site in a fresh or incognito browser—verify the Cookiebot consent banner appears and no trackers load initially.
  - Give consent for each category and confirm the corresponding scripts load (check Network panel or dataLayer events).
  - Use Cookiebot's dashboard to review discovered cookies and categories.

## SEO Optimization

The template is optimized for search engines:

### Metadata

- Each page has appropriate metadata (title, description)
- Open Graph and Twitter card metadata
- Canonical URLs

### Semantic HTML

- Proper heading hierarchy
- Semantic elements (section, article, nav, etc.)
- ARIA attributes for accessibility

### Performance

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Minimal CSS with Tailwind's JIT compiler

### Mobile Optimization

- Fully responsive design
- Mobile-friendly navigation
- Appropriate touch targets

### SEO Files

#### Sitemap (`app/sitemap.ts`)

- Dynamically generated sitemap
- Includes all static and dynamic routes
- Customizable priorities and change frequencies

#### Robots (`app/robots.ts`)

- Robots.txt configuration
- Customizable rules for search engine crawlers

#### Manifest (`app/manifest.ts`)

- Web App Manifest for PWA support
- Customizable icons and theme colors

## Performance Considerations

The template is optimized for performance:

### Image Optimization

- Next.js Image component for automatic optimization
- Responsive images with appropriate sizes
- Lazy loading for off-screen images

### Code Splitting

- Automatic code splitting with Next.js
- Dynamic imports for large components

### Font Optimization

- Local font files with `next/font`
- Font display swap for better perceived performance

### Animation Performance

- Hardware-accelerated animations
- Minimal layout shifts
- Debounced event handlers

### Animations & Motion

- Use **Framer Motion** for lightweight entry/exit and scroll-triggered effects.
- Wrap sections or components in `LazySection` to reveal when in view.
- For card-like components (e.g., blog, services, testimonials), use a fade-up or slide animation on each card matching the gallery style.
- For text or non-card elements, apply a simple fade-in or slide-in that aligns with the section's container vibe.
- Supports left, right, or center reveal variations for balanced flow.
- Animate **once** per viewport entry to maintain performance.
- To synchronize multiple adjacent sections (e.g., Pain & Solution), wrap them together in a single `<LazySection>` for unified animation.

### Animations & UX/UI Feature Flags

- **Global Scroll-Reveal Animations:** Behind `siteConfig.features.enableStaggeredAnimations`, wrap content in `<LazySection animation="..." delay={...}>…</LazySection>` to animate on scroll; these respect users' `prefers-reduced-motion` setting.
- **Page Transitions:** Controlled by `siteConfig.features.enablePageTransitions` with variant selected via `siteConfig.features.pageTransitionVariant` (`fade` | `slide` | `cover`), implemented in `components/layout/PageTransitionWrapper`.
- **Animated Backgrounds:** Gated by `siteConfig.features.enableAdvancedBackgrounds` and configured via `siteConfig.features.animatedBackgroundType` (`none`, `gradient`, `particles`, `parallax`, `noise`, `wave`, `image`) and optional `siteConfig.features.backgroundImageUrl`, rendered by `components/ui/BackgroundCanvas`.
- **Section Layout Variants:** Many section components (Hero, About, Services, etc.) accept a `variant` prop (`imageLeft` | `imageRight` | `centered`) to reorder layouts via config without code changes.
- **Micro-Interactions:** Toggle subtle hover effects, button scales, progress indicators, and interactive counters via `siteConfig.features.enableMicroInteractions` using CSS-only Tailwind utilities.
- **Accessibility Fallback:** All animations (scroll-reveal, page transitions, backgrounds) automatically disable when users request reduced motion via `prefers-reduced-motion`.

## Customization Guide

### Configuration Files

All configuration lives in a single file under `lib/`:

- **lib/site.config.local.ts** – the single source of truth for all public-facing settings (site metadata, theme, navigation links, feature flags, tracking IDs, etc.). This file is now part of the repository and used at build time. It appears in every fresh clone—simply open it and replace the placeholder values with your client's real data; there's no need to copy or rename it.

Components import `siteConfig` from `lib/site.config.local.ts`. Populate each field in that file with your client's values—empty or missing entries (strings left blank, boolean flags set to `false`) will safely disable their respective features.

1. Populate `lib/site.config.local.ts` with your client-specific values.
2. Fill in each field with your client's values:
   - `site` metadata (title, description, URL, og/twitter images)
   - `theme` colors, logo, favicon
   - `navLinks` & `footerLinks`
   - `social` URLs
   - `cookieConsent.cookiebotId`
   - `tracking.*Id` values (GTM, GA4, FB Pixel, LinkedIn, HubSpot, Google Ads)
   - `newsletter` provider keys
   - `contact` email, phone, address, hours
   - `sections` default copy, images, CTA labels, stats arrays, blog limit, etc.

### Ignoring Linter Warnings for Inline Scripts

We inject vendor scripts (GTM, GA4, FB Pixel, etc.) via `<Script dangerouslySetInnerHTML>` in `components/tracking/tracking-scripts.tsx`. These produce ESLint/biome warnings (`react/no-danger`, `@next/next/no-dangerous-html`, `security/no-dangerously-set-inner-html`).

To silence these safely, we've disabled those rules in `.eslintrc.json`:

```json
{
  "rules": {
    "react/no-danger": "off",
    "@next/next/no-dangerous-html": "off",
    "security/no-dangerously-set-inner-html": "off"
    // … other rules …
  }
}
```

Since all the HTML snippets are static and controlled by you (not end-user input), this is safe and does not compromise XSS protections.

### Branding

1. Update colors in `tailwind.config.ts`
2. Replace logo in header and footer
3. Update favicon and other icons in `public/`

### Content

1. Replace placeholder text in all components
2. Update images with your own
3. Modify service and blog data in `lib/data-utils.ts`

#### Content Data vs Component Defaults

- Components define built-in default prop values (e.g. in `components/.../hero-section.tsx`) so they render standalone with reasonable fallbacks.
- The actual live copy for each page lives in data modules under `lib/data/` (for example `lib/data/homepage.ts`).
- To change real site text, images, links, and stats, update the corresponding data file; only edit component defaults when you need to adjust fallback behavior.

### Images & Asset Pipeline

#### 1. Raw Assets

- Master images live in `assets/images/raw/<category>` (e.g. `assets/images/raw/team/jane-doe.jpg`).
- Default categories: `branding`, `team`, `services`, `blog`, `testimonials`, `general`.
- To include the **current placeholder** images in the same pipeline (for consistent format, responsive sizes, and blurDataURLs), copy them from the `public/` root into `assets/images/raw/placeholders` before running optimization.
- To onboard a new section, create a raw subfolder (e.g. `assets/images/raw/features`)—the pipeline auto-detects any folder.

#### 2. Generating Optimized Assets

- Run `npm run image-optimize` (automatically invoked in CI via `npm run build`).
- This copies files to `public/images/<category>` and produces `public/images/blurDataURL.json`.

#### 3. Consuming Assets in Code

- Reference images in `lib/site.config.local.ts` or your data files: e.g. `photo: "/images/team/jane-doe.jpg"`.
- In React components, use Next.js `<Image>` or our `OptimizedImage` wrapper:

  ```tsx
  import blurMap from "/public/images/blurDataURL.json";

  <OptimizedImage
    src={member.photo}
    alt={member.name}
    width={200}
    height={200}
    placeholder="blur"
    blurDataURL={blurMap[member.photo]}
  />;
  ```

#### 4. Blur Placeholders

- The `blurDataURL.json` map holds Base64 previews for each image path.
- Import it in your components to provide `blurDataURL` when using `placeholder="blur"`.

#### 5. Onboarding New Sections

- Create matching folders in `assets/images/raw` and `public/images`.
- Add raw images to `assets/images/raw/<section>`, then run `npm run image-optimize`.
- Extend your Zod schema (`lib/site.config.ts`) and local config (`lib/site.config.local.ts`) if needed for new image fields.
- Wire up the images in your new section component using `OptimizedImage`.

#### 6. Commit & CI

- Commit both `assets/images/raw` and `public/images` (including `blurDataURL.json`).
- CI will run `npm run build` and optimize assets before merging to `main`.

### Newsletter Provider

To enable the built-in newsletter subscription form, configure these environment variables in your deployment (e.g., Vercel):

1. `NEXT_PUBLIC_NEWSLETTER_PROVIDER` – set to `mailchimp`, `hubspot`, or `activecampaign`.
2. **Mailchimp**
   - `MAILCHIMP_API_KEY=your-key-usX`
   - `MAILCHIMP_LIST_ID=your-list-id`
3. **HubSpot**
   - `HUBSPOT_PORTAL_ID=your-portal-id`
   - `HUBSPOT_FORM_ID=your-form-id`
4. **ActiveCampaign**
   - `ACTIVECAMPAIGN_API_URL=https://youraccount.api-usX.com`
   - `ACTIVECAMPAIGN_API_TOKEN=your-token`
5. When `NEXT_PUBLIC_NEWSLETTER_PROVIDER` is unset or unsupported, the form will be hidden; you can replace it with a static CTA.

The template includes `components/ui/SubscribeForm.tsx`, which automatically selects and renders the proper form based on the provider. After updating your env variables, redeploy so the changes take effect.

### Contact Form Provider

To enable email forwarding for the contact form, configure these environment variables in your deployment (e.g., Vercel):

1. `SMTP_HOST` – your SMTP server hostname
2. `SMTP_PORT` – your SMTP server port
3. `SMTP_SECURE` – set to `true` if your SMTP server requires SSL/TLS, otherwise `false`
4. `SMTP_USER` – the SMTP username or service account
5. `SMTP_PASS` – the SMTP password or API key

Ensure that `siteConfig.contact.email` in `lib/site.config.local.ts` is set to the recipient address for contact form submissions.

### Tracking

1. Replace tracking IDs in `components/tracking/tracking-scripts.tsx`
2. Update Cookiebot ID in `app/layout.tsx`

### Styling

1. Modify global styles in `app/globals.css`
2. Adjust component styles as needed
3. Add custom fonts if desired

### Section Wrapper & Background Modes

The template includes a reusable `Section` component (`components/layout/Section.tsx`) that standardizes spacing, centering, and optional full-width backgrounds across all sections. Use the built-in API to choose between a boxed container or a full-bleed layout:

- Default (boxed) mode:

  ```tsx
  <Section className="bg-gray-50">
    {/* content stays within container gutters */}
  </Section>
  ```

  The `Section` component will render:

  ```html
  <section class="container mx-auto px-4 py-12 md:py-16 bg-gray-50">
    ...
  </section>
  ```

- Full-bleed mode:
  ```tsx
  <Section fullBleed className="bg-brand-dark text-white">
    {/* content spans full browser width, inner container centers children */}
  </Section>
  ```
  This renders:
  ```html
  <section class="bg-brand-dark text-white">
    <div class="container mx-auto px-4 py-12 md:py-16">...</div>
  </section>
  ```

**Customizing borders, rounding, or shadows:**
Simply pass Tailwind utility classes via the `className` prop:

```tsx
<Section className="border border-gray-200 rounded-lg shadow-sm">
  {/* content with subtle box effect */}
</Section>
```

> **Tip:** When converting an existing section to full-bleed, remove any manual outer `<section>` wrapper and rely on the `fullBleed` prop instead—this keeps your markup consistent and DRY.

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Install Git hooks (Husky):**
   ```bash
   npm run prepare
   ```
   - Sets up `pre-commit` (runs `npm run image-optimize` and stages `/public/images`) and `pre-push` (runs `npm run build`).
4. **Generate optimized assets:**
   ```bash
   npm run image-optimize
   ```
   - Converts `assets/images/raw` → `public/images` (includes responsive variants and `blurDataURL.json`).
5. **Start the development server:**
   ```bash
   npm run dev
   ```
6. **Open the site:**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

**Verify build, lint, and tests:**

```bash
npm run build
npm run lint
npm test
```

### Production Build

1. **Install dependencies:**
   ```bash
   npm ci
   ```
2. **Install Git hooks:**
   ```bash
   npm run prepare
   ```
3. **Generate optimized assets:**
   ```bash
   npm run image-optimize
   ```
4. **Build for production:**
   ```bash
   npm run build
   ```
5. **Run tests:**
   ```bash
   npm test
   ```
6. **Start the production server:**
   ```bash
   npm start
   ```

### Deployment

The template is ready to deploy on Vercel or any other Next.js-compatible hosting platform.

### Environment Variables

Configure these environment variables in your hosting platform (e.g., Vercel) under Settings → Environment Variables:

- **NEXT_PUBLIC_COOKIEBOT_ID**: Your Cookiebot ID to load the consent banner via `CookiebotLoader`.
- **RECAPTCHA_SECRET_KEY**: Secret key for reCAPTCHA verification in contact forms (`app/api/contact/route.ts`).
- **SMTP_HOST**, **SMTP_PORT**, **SMTP_SECURE**, **SMTP_USER**, **SMTP_PASS**: Credentials for the "smtp" contact-form provider.
- **SENDGRID_API_KEY**, **SENDGRID_FROM_EMAIL**: Keys for the SendGrid provider in `app/api/contact/route.ts`.
- **POSTMARK_API_TOKEN**, **POSTMARK_FROM_EMAIL**: Keys for the Postmark provider in `app/api/contact/route.ts`.
- **MAILCHIMP_TRANSACTIONAL_API_KEY**, **MAILCHIMP_TRANSACTIONAL_FROM_EMAIL**: Keys for Mailchimp Transactional provider in `app/api/contact/route.ts`.
- **NEXT_PUBLIC_NEWSLETTER_PROVIDER**: Set to `hubspot`, `mailchimp`, or `activecampaign` to enable the subscribe form.
  - If using `hubspot`, also set **HUBSPOT_PORTAL_ID** and **HUBSPOT_FORM_ID** for your HubSpot form.

### Client Onboarding & Implementation Guide

This guide walks through the entire codebase structure, customization points, and step-by-step onboarding for a new client.

2. Onboarding Steps

   1. **Clone this repository** into your local workspace (always start from a fresh clone).
   2. **Install dependencies**: `npm install`
   3. **Install Git hooks**: run `npm run prepare`. This adds Husky hooks:
      - **pre-commit**: automatically runs `npm run image-optimize` and stages `/public/images` + `blurDataURL.json`.
      - **pre-push**: automatically runs `npm run build`, ensuring everything compiles and optimized assets exist.
   4. **Generate optimized assets** (when adding or updating masters):
      ```bash
      npm run image-optimize
      ```
   5. **Populate client config & images**:
      - Open `lib/site.config.local.ts` and replace placeholder values with your client's data.
      - Place raw masters in `assets/images/raw/<category>/…` and re-run `npm run image-optimize` to emit optimized variants in `public/images/<category>/…`.
   6. **Set environment variables**: configure them in your hosting platform or `.env.local` (see "Environment Variables").
   7. **Customize theme variables** (optional): adjust colors, fonts, etc., in `app/globals.css` or `tailwind.config.ts`.
   8. **Run and verify locally**:
      - `npm run dev` to preview.
      - `npm run build && npm run lint && npm test` to ensure zero errors/warnings.
   9. **Commit & push**:
      ```bash
      git add .
      git commit -m "chore: onboard new client"
      git push origin main
      ```
      Your CI will then run: image optimization, build, lint, tests—and Vercel will auto-deploy `main`.

3. Key Logic & Customization Points
   - **Configuration Validation**: `lib/site.config.ts` enforces shape via Zod—missing or invalid fields will throw at build time.
   - **Layout & Theming**: `app/layout.tsx`

## AI-Powered Copy & UX/UI Client Onboarding

This section outlines how to use Cursor AI to gather client information and apply the best practice research for UI/UX copy customization. Follow these steps:

1. Read Best Practice Documentation

   - Cursor AI should load and understand all files under `docs/building/ui-ux-copy-client-customization/` in the following order:
     - `00-Research-Report-Complete-Context.md`
     - `01-Homepage-Brief.md`
     - `02-AboutPage-Brief.md`
     - `03-ServicesPage-Brief.md`
     - `04-TestimonialsPage-Brief.md`
     - `05-ContactPage-Brief.md`
     - `06-BlogPage-Brief.md`
     - `07-FAQPage-Brief.md`
     - `08-SiteWideBestPractices-Brief.md`

2. Gather Client Information  
   Use this prompt template to collect core details:

   > Please provide:
   >
   > - Business name
   > - Core value proposition
   > - Target audience
   > - Brand voice and tone
   > - Primary services/products
   > - Key differentiators
   > - Specific messages for each page (Homepage, About, Services, Testimonials, Contact, Blog, FAQ)

3. Map Information to Template Sections

   - Homepage: Hero headline, subheadline, CTAs
   - About Page: Company story, team bios, mission statement
   - Services Page: Service descriptions, benefits, CTAs
   - Testimonials Page: Client quotes, photos, ratings
   - Contact Page: Contact form text, instructions, business hours
   - Blog Page: Post intro, categories, SEO meta
   - FAQ Page: Questions, answers, search keywords

4. Iterate and Refine
   - Review AI-generated drafts and adjust for brand consistency and UX clarity.
   - Deploy to staging to validate copy flow and layout.

> By following this AI-driven onboarding, we ensure research-backed best practices are applied and streamline client customization.

## CI & Quality Gates

We've introduced a `ci:verify` npm script that runs a full build, lint (with zero warnings), and tests in one command:

```bash
npm run ci:verify
```

A GitHub Actions workflow is configured in `.github/workflows/ci.yml` to automatically run these checks on every pull request and push to the `main` branch. This ensures your site builds cleanly and passes all quality checks before deploying.

If you ever need to revert to the previous setup, simply remove the `ci:verify` script from `package.json` and delete the `.github/workflows/ci.yml` file—your Husky hooks (image optimization on commit, build on push) will continue enforcing the existing workflow.

## Landing & Resource Page Architecture

The template features a dual-route system for content like e-books, whitepapers, or case studies, allowing them to be served both as focused landing pages and as fully integrated site resources:

- **Shared Data Layer (`lib/data/resources.ts`)**:
    - Defines a `Resource` type.
    - Exports functions like `getResources()` and `getResourceBySlug(slug)` to fetch resource data. This data source is the single source of truth for content displayed on both landing and resource pages.
- **Shared Content Component (`components/resources/ResourceContent.tsx`)**:
    - Renders the actual content of a resource (hero, text sections, images, forms).
    - Used by both `/landing/[slug]/page.tsx` and `/resources/[slug]/page.tsx`.
- **Landing Pages (`app/landing/[slug]/page.tsx`)**:
    - Wrapped in `app/landing/layout.tsx` which provides a minimal header (`LandingHeader.tsx`) and footer (`LandingFooter.tsx`).
    - Designed for targeted campaigns (e.g., paid ads).
    - Hidden from main navigation and sitemap to ensure focused user journeys.
    - Feature flag: `siteConfig.features.enableLandingPages` controls their availability (guarded by `middleware.ts`).
- **Resource Pages (`app/resources/[slug]/page.tsx`)**:
    - Use the standard site layout (full header and footer).
    - `app/resources/page.tsx` serves as an index, listing all available resources.
    - Designed for organic discovery and included in the sitemap.
- **Form Integration**:
    - `components/resources/FormSection.tsx` typically handles form embeds (e.g., HubSpot, Typeform) for lead capture, especially on landing pages.

This architecture ensures content is managed in one place (`lib/data/resources.ts`) but can be presented in two distinct contexts optimized for different acquisition channels.

## AI Assistant Guide: Dynamic Theming & Configuration

This codebase is designed for maximum flexibility, automation, and AI-driven customization. Here's how dynamic theming and configuration work:

### Centralized Theme Config
- **All theme values** (colors, fonts, spacing, borders, etc.) are set in `lib/site.config.local.ts`.
- This config is the single source of truth for branding and design tokens.

### globals.css: Fallbacks & SSR Safety
- `app/globals.css` defines default CSS variables for all theme tokens (e.g., `--primary`, `--font-heading`).
- These ensure the site renders with sensible defaults during SSR or before JS loads, preventing a "flash of unstyled content" (FOUC).
- **At build/SSR time,** the theme config is read and all CSS variables are injected into the <head> via a <style> tag in `app/layout.tsx`, making the site fully dynamic without any client-side provider.

### Dual CSS Variable Pattern for Colors
- For each theme color (primary, secondary, accent, etc.), both a hex and an RGB variable are set:
  - `--primary: #2563EB;`
  - `--primary-rgb: 37,99,235;`
- This allows for both solid and alpha/opacity color utilities in Tailwind and CSS.

### Keeping Config and CSS in Sync
- The values in `site.config.local.ts` **should always match** the defaults in `globals.css`.
- If you change a color, font, or spacing in the config, update the fallback in `globals.css` as well.
- This prevents mismatches and visual glitches during SSR/initial load.

### Adding New Theme Tokens
- To add a new color (e.g., info, warning):
  1. Add both `--info` and `--info-rgb` to `globals.css` with sensible defaults.
  2. Add the color to `site.config.local.ts`.
  3. Update the server-side CSS variable generator in `app/layout.tsx` to set both variables at build/SSR time.
  4. Add new Button/component variants as needed.

### Legacy CSS Classes
- Old classes like `.btn-primary`, `.btn-secondary`, `.btn-outline` are deprecated.
- Use the Button component and its variants for all buttons.
- Remove legacy classes to avoid confusion.

### Best Practices for AI Agents & Developers
- Always use theme variables—never hardcode colors or fonts in components.
- Use the Button component for all buttons, not custom classes.
- When onboarding a new client, update only `site.config.local.ts` and (optionally) the fallbacks in `globals.css`.
- All theme variables are now injected server-side; no client provider is needed.

### Why Are Colors/Fonts in Both Places?
- `globals.css` provides SSR/FOUC-safe fallbacks.
- `site.config.local.ts` is the dynamic, runtime source of truth.
- The server-side logic in `app/layout.tsx` syncs the two at build/SSR time.

---

This setup ensures the site is always styled, always dynamic, and always ready for AI or human-driven customization.

## AI Assistant Guide: Dynamic Theming & Configuration

> **Performance Note (Flagged for Future Refactor by Gydo):**
>
> If you do **not** need runtime theme switching (e.g., dark mode, live preview, A/B tests, or user-driven theme changes), you can safely keep all CSS variable generation logic in your server layout (`app/layout.tsx`) and do not need a client-side provider.
>
> **Benefits:**
> - Less client-side JavaScript and a smaller bundle
> - Faster hydration and first paint (all theme tokens are present immediately)
> - No risk of mismatch or flash between SSR and client
>
> **Tradeoff:**
> - You lose the ability to change theme tokens at runtime without a full page reload (but for static/admin-driven theming, this is not needed).
>
> **Conclusion:**
> For static, admin-driven theming (the current use case), this is a net win for performance and simplicity. If you ever want runtime theme switching, you can reintroduce a client-side provider.


### Custom Color‐Opacity Utilities

1. **CSS Variable Injection** (in `app/layout.tsx`):

   ```ts
   // at SSR build time we inject:
   --primary: #2563EB;
   --primary-rgb: 37,99,235;
   --secondary: #FF9D48;
   --secondary-rgb: 255,157,72;
   // …etc for accent, muted, destructive, popover, card…
   ```

2. **Tailwind Plugin** (in `tailwind.config.ts`):

   ```ts
   import plugin from 'tailwindcss/plugin';

   export default {
     // …
     plugins: [
       // …other plugins…
       plugin(({ matchUtilities, theme }) => {
         const colors = ['primary','secondary','destructive','muted','accent','popover','card'];
         for (const color of colors) {
           matchUtilities({
             [`bg-${color}`]:   v => ({ backgroundColor: `rgba(var(--${color}-rgb), ${v})` }),
             [`text-${color}`]: v => ({ color:          `rgba(var(--${color}-rgb), ${v})` }),
             [`border-${color}`]: v => ({ borderColor:  `rgba(var(--${color}-rgb), ${v})` }),
           }, { values: theme('opacity.0') });
         }
       }),
     ],
   };
   ```

3. **How to Use**:

   ```html
   <!-- 10% primary fill, 80% secondary text, 50% muted border -->
   <div class="bg-primary-10 text-secondary-80 border-muted-50">
     …
   </div>
   ```

   Compiles to:

   ```css
   background-color: rgba(var(--primary-rgb), 0.1);
   color:            rgba(var(--secondary-rgb), 0.8);
   border-color:     rgba(var(--muted-rgb), 0.5);
   ```

4. **Explicit Fallback** (if you need an arbitrary opacity):

   ```html
   <div class="bg-[rgba(var(--primary-rgb),0.4)]">
     …
   </div>
   ```

With this in place, any future AI or human can instantly see how to write and extend color-opacity utilities—and you'll never accidentally ship a broken `text-primary/40` again.

### KPI Section & About Section Feature Flags

Two new feature flags allow toggling the display of KPI stats sections:

- `siteConfig.features.enableAboutSection` (boolean, default: true)  
  Controls display of the About section block on all pages (including the homepage). By default, this is enabled so that the About section appears on the homepage.

- `siteConfig.features.enableKpiSection` (boolean, default: false)  
  Controls display of the separate KPI stats section on the homepage. By default, this is disabled on the homepage. To enable the homepage KPI stats block, set `enableKpiSection: true` in your `lib/site.config.local.ts`.

- `siteConfig.features.enableAboutKpiSection` (boolean, default: false)  
  Controls display of the KPI stats block on the About page. By default, this is disabled. To enable it on the About page, set `enableAboutKpiSection: true` in your `lib/site.config.local.ts`.

You can find these flags under the `features` key in your `lib/site.config.local.ts` file.
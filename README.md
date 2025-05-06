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
├── app/                      # Next.js App Router pages
│   ├── about/                # About page
│   ├── blog/                 # Blog section with dynamic routes
│   ├── contact/              # Contact page
│   ├── faq/                  # FAQ page
│   ├── privacy-policy/       # Privacy policy page
│   ├── services/             # Services section with dynamic routes
│   ├── terms-of-service/     # Terms of service page
│   ├── cookie-policy/        # Cookie policy page
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout with metadata
│   ├── not-found.tsx         # 404 page
│   └── page.tsx              # Homepage
├── components/               # Reusable components
│   ├── cookie/               # Cookie consent components
│   ├── layout/               # Layout components (header, footer)
│   ├── sections/             # Page sections (hero, features, etc.)
│   ├── seo/                  # SEO components
│   ├── tracking/             # Tracking and analytics components
│   └── ui/                   # UI components (buttons, cards, etc.)
├── hooks/                    # Custom React hooks
├── lib/                      # Utility functions and data
├── public/                   # Static assets
└── types/                    # TypeScript type definitions
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
- Company introduction
- Statistics and achievements
- Image with decorative elements

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

### Data-Driven Section Component Pattern
When you add or update a section component, follow this structure for consistency:
1. **Data Definition** – Declare your content shape in a file under `lib/data/` and export it (e.g., `homepageFaqCategories`).
2. **Section Component** – Create a component under `components/sections/` that accepts props matching your data shape.
3. **Page Integration** – Import both the data and component into your page (e.g., `app/page.tsx`), then render the section with `<LazySection>` for deferred loading:
   ```tsx
   import { homepageFaqCategories } from '@/lib/data/homepage';
   import HomepageFaqSection from '@/components/sections/homepage-faq-section';

   <LazySection>
     <HomepageFaqSection categories={homepageFaqCategories} />
   </LazySection>
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
    "security/no-dangerously-set-inner-html": "off",
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
- Default categories: `branding`, `team`, `services`, `blog`, `testimonials`.
- To include the **current placeholder** images in the same pipeline (for consistent format, responsive sizes, and blurDataURLs), copy them from the `public/` root into `assets/images/raw/placeholders` before running optimization.
- To onboard a new section, create a raw subfolder (e.g. `assets/images/raw/features`)—the pipeline auto-detects any folder.

#### 2. Generating Optimized Assets
- Run `npm run image-optimize` (automatically invoked in CI via `npm run build`).
- This copies files to `public/images/<category>` and produces `public/images/blurDataURL.json`.

#### 3. Consuming Assets in Code
- Reference images in `lib/site.config.local.ts` or your data files: e.g. `photo: "/images/team/jane-doe.jpg"`.
- In React components, use Next.js `<Image>` or our `OptimizedImage` wrapper:
  ```tsx
  import blurMap from '/public/images/blurDataURL.json';

  <OptimizedImage
    src={member.photo}
    alt={member.name}
    width={200}
    height={200}
    placeholder="blur"
    blurDataURL={blurMap[member.photo]}
  />
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
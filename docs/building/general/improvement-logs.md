# Improvement Logs

This document lists the core enhancements still required for an AI-driven build of the Next.js entrepreneur template.

## 1. Configuration Management & Feature Toggles

- **Schema Validation**: Define a Zod schema for `siteConfig` in `lib/site.config.ts` to enforce config shape and surface misconfigurations at build/runtime.
- **Feature Flags**: Add boolean flags (e.g., `enableBlog`, `enableServices`, `enableTestimonials`, `enableContactForm`, `enablePricing`) to toggle pages and sections.
- **Route Gating**: Use Next.js `middleware.ts` or App Router handlers to 404 or redirect disabled routes.
- **Logical Config Grouping**: Refactor `site.config.example.ts` into grouped categories: `seo`, `theme`, `integrations`, `features`, `contactForm`.

**Action**: Implement Zod validation, update config example, and build middleware-based route gating.

## 2. Contact Form & CRM Integration

- **Email-Only Mode**: Implement `/api/contact` route using Nodemailer/SMTP, forwarding to `process.env.CONTACT_EMAIL`.
- **Provider Support**: Add support for SendGrid, Postmark, Mailchimp, ActiveCampaign, HubSpot via config-driven API keys and `contactForm.provider`.
- **Dynamic Fields & Spam Protection**: Generate form inputs from `contactForm.fields` in config and include optional reCAPTCHA or honeypot.
- **Confirmation Workflow**: Configurable emails to submitter and site owner.

**Action**: Extend Zod schema with `contactForm`, and scaffold route handlers for each mode with example templates.

## 3. SEO & Sitemap Generation

- **Dynamic JSON-LD**: Continue emitting Organization, WebSite, BreadcrumbList, Article, FAQ schemas based on content.
- **Metadata Overrides**: Ensure per-page metadata uses App Router's `generateMetadata`, pulling from validated config.
- **Sitemap & robots.txt**: Integrate `next-sitemap` to generate `sitemap.xml` and `robots.txt`, filtering routes based on feature flags.

**Action**: Install and configure `next-sitemap` to respect feature flags.

## 4. Performance & Core Web Vitals

- **Script Offloading**: Adopt Partytown for analytics/marketing scripts with consent gating.
- **Font Loading**: Use `next/font` with `preload: true` and `display: swap`, and add `<link rel="preconnect">` for external fonts.
- **Component Optimization**: Audit Server vs. Client component boundaries and lazy-load non-critical sections.

**Action**: Set up Partytown integration, update fonts, and review component boundaries.

## 5. Feature Toggle Mechanism

- Instead of deleting code, hide routes and nav links via an `enabledPages` array in config.
- Use this array in both UI (navigation rendering) and sitemap generation.

**Action**: Implement `enabledPages` in config and update layout/navigation logic.

## 6. Pricing Section

- **Three Cards**: Create a responsive section with three pricing cards matching the template's style.
- **Customizable Fields**: Allow titles, prices, feature lists, and CTAs to be driven via `siteConfig.sections.pricing`.
- **Feature Flag**: Add an `enablePricing` boolean under `siteConfig.features` to toggle the pricing section.
- **Action**: Scaffold `components/sections/pricing-section.tsx`, extend the Zod schema, and integrate the section into the homepage.

---

Here's a quick audit of everything in `improvement-logs.md` and where we stand: THIS IS OUTDATED BUT HERE FOR LOGS

1. Configuration Management & Feature Toggles

- Zod schema for `siteConfig` in `lib/site.config.ts`: ✅ Done
- Feature flags (`enableBlog`, `enableServices`, `enableContactForm`, `enableTestimonials`, `enablePricing`): ✅ Done
- Route gating via `middleware.ts`: ✅ Done
- Logical grouping of `site.config.local.ts`: ✅ Done

2. Contact Form & CRM Integration

- `/api/contact` with Nodemailer/SMTP, Zod validation & honeypot: ✅ Done
- Provider support (SendGrid, Postmark, Mailchimp, ActiveCampaign, HubSpot): ❌ Not yet implemented
- Dynamic fields from config + reCAPTCHA/honeypot:
  - Honeypot: ✅ Done
  - Dynamic fields: ✅ Done
  - reCAPTCHA integration: ✅ Done
- Confirmation workflow (emails to submitter & owner): ❌ Pending

3. SEO & Sitemap Generation

- JSON-LD for Organization, WebSite, BreadcrumbList, Article, FAQ schemas: ✅ Done
- Per-page metadata overrides via `generateMetadata`, `defaultMetadata`: ✅ Done
- `next-sitemap` + `robots.txt` with feature-flag filtering: ✅ Done

4. Performance & Core Web Vitals

- Script offloading with Partytown: ✅ Done
- Font loading via `next/font` with `preload: true` and `display: swap`: ✅ Done
  - `<link rel="preconnect">` for external fonts: ✅ Done
- Component boundary audit & lazy-load non-critical sections: ✅ Done

5. Feature Toggle Mechanism

- Hide routes & nav links via an `enabledPages` array: ✅ Done
- Use this array in both UI and sitemap logic: ✅ Done

6. Pricing Section

- Three responsive cards matching template style: ✅ Done
- Config-driven titles, prices, feature lists, CTAs: ✅ Done
- Feature flag (`enablePricing`): ✅ Done
- Scaffolded & integrated `PricingSection`: ✅ Done

**Bottom line:** Core enhancements are now in place—config, toggles, routing, sitemap, performance tweaks, pricing, and dynamic contact form fields. Remaining work includes CRM-provider modes, confirmation workflow, additional JSON-LD schemas (BreadcrumbList, Article, FAQ), and full middleware-driven route gating if expanding beyond App Router checks.

### Next Steps

1. Contact Form & CRM Integration

- Implement ActiveCampaign and HubSpot transactional email providers in `/api/contact`

2. SEO & Structured Data

- Inject FAQ JSON-LD on the FAQ page

3. Testing & Documentation

- Add unit and integration tests for:
  - Contact form provider modes and reCAPTCHA validation
  - FAQ structured-data injection on the FAQ page
  - Robots.txt and sitemap filtering based on feature flags
- Update README and documentation to describe new configurations and behaviors

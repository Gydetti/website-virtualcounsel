# Improvement Logs

This document lists the core enhancements still required for an AI-driven build of the Next.js entrepreneur template.

## 1. Configuration Management & Feature Toggles

- **Schema Validation**: Define a Zod schema for `siteConfig` in `lib/site.config.ts` to enforce config shape and surface misconfigurations at build/runtime.
- **Feature Flags**: Add boolean flags (e.g., `enableBlog`, `enableServices`, `enableTestimonials`, `enableContactForm`) to toggle pages and sections.
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

---

### Next Steps

1. Implement Zod schema for `siteConfig`.
2. Add feature flags and middleware-based route gating.
3. Scaffold and test `/api/contact` for all configured providers.
4. Configure `next-sitemap` with feature-flag filtering.
5. Integrate Partytown for script offloading and optimize font loading.

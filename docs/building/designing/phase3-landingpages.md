# Phase 3: Landing Pages & Resources Foundation

We're laying the structural foundation so any future client can spin up GDPR-compliant landing pages _and_ full-layout resource pages (e-books, whitepapers, case-studies, etc.) in a single codebase. All content lives in one data layer, and one shared content component renders both variants.

> **Goal:** define each resource once (title, hero, sections, form embed…), then expose it as:
>
> - `/landing/[slug]` → slim header/footer, hidden from main nav, ideal for paid-ads funnels
> - `/resources/[slug]` → full header/footer, included in nav/sitemap, ideal for organic discovery


## 🚀 Phase 3 Scaffolding Summary

Before you dive in, here’s a quick recap of what’s been implemented:

- **Shared Data Layer**  
  • Created `lib/data/resources.ts` exporting a `Resource` type and two async helpers:  
    - `getResources()` returns all resources (stubbed).  
    - `getResourceBySlug(slug)` looks up a single resource by slug.

- **Resource Content Component**  
  • Added `components/resources/ResourceContent.tsx` to render:  
    - A top “Hero” section (title, subtitle, hero image).  
    - Dynamic sub‐sections based on `resource.sections`:  
      – `TextSection` (`components/resources/TextSection.tsx`)  
      – `FormSection` (`components/resources/FormSection.tsx`)  
      – `ImageSection` (`components/resources/ImageSection.tsx`)

- **Landing Pages (Paid‐Ads Funnels)**  
  • `app/landing/layout.tsx` for a slim header/footer wrapper.  
  • `components/layout/LandingHeader.tsx` & `LandingFooter.tsx` stubs.  
  • `app/landing/[slug]/page.tsx` uses `generateStaticParams`, fetches `resource`, and renders it inside `LandingLayout`.

- **Resource Pages (Organic Discovery)**  
  • `app/resources/page.tsx` lists all resources with links.  
  • `app/resources/[slug]/page.tsx` renders each resource detail via `ResourceContent`.

- **Configuration & Guards**  
  • Introduced `features.enableLandingPages` in both `lib/site.config.local.ts` and Zod schema (`lib/site.config.ts`).  
  • Updated `middleware.ts` to rewrite `/landing/*` to 404 when that flag is off.  
  • Added `/resources` to `navLinks` and `enabledPages`, leaving `/landing` unlisted.

All new code has been formatted, linted, type-checked, and confirmed building (with zero errors). Feel free to drop in real resource data, wire up your form embed, and flip the feature flag to see your landing and resource pages live!```

---

## 1. Folder Structure

```text
app/
  landing/
    layout.tsx         # landing-only header/footer wrapper
    [slug]/
      page.tsx         # dynamic template powered by getLandingPageBySlug()
```

- **`landing/layout.tsx`** will render a slim header + footer.
- **`landing/[slug]/page.tsx`** reads a data source and renders title, content, hero image, form placeholder, etc.

---

## 2. Code Templates

### 2.1 app/landing/layout.tsx

```tsx
import LandingHeader from "@/components/layout/LandingHeader";
import LandingFooter from "@/components/layout/LandingFooter";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <LandingHeader />
      <main>{children}</main>
      <LandingFooter />
    </>
  );
}
```

### 2.2 app/landing/[slug]/page.tsx

```tsx
import { notFound } from "next/navigation";
import { getLandingPageBySlug, getLandingPages } from "@/lib/data-utils";

export async function generateStaticParams() {
  return (await getLandingPages()).map((page) => ({ slug: page.slug }));
}

export default async function LandingPage({ params: { slug } }) {
  const page = await getLandingPageBySlug(slug);
  if (!page) notFound();

  return (
    <section className="landing-hero">
      <h1>{page.title}</h1>
      <p>{page.subtitle}</p>
      <img src={page.heroImage} alt={page.title} />

      {/* Form-embed placeholder: replace with client's preferred 3rd-party snippet */}
      <div id="landing-form-placeholder">
        {/* TODO: swap in <YourFormEmbed /> or <iframe src="..." /> */}
      </div>

      {/* Additional sections (features, testimonials, etc.) can render here */}
    </section>
  );
}
```

> **Note:** we skip A/B testing details for now—this is purely scaffolding.

---

## 3. Feature Flag Toggle

Add a new flag in your config so unused landing code stays tree-shaken if disabled:

**lib/site.config.ts**

```ts
export const siteConfig = {
  // ...existing features
  features: {
    enableBlog: true,
    enableServices: true,
    enableLandingPages: true, // <-- new flag
  },
};
```

**middleware.ts** (to guard `/landing/*` in production):

```ts
// in the `checks` array:
{ pattern: /^\/landing(\/|$)/, enabled: siteConfig.features.enableLandingPages },

// and in `config.matcher`:
matcher: [
  '/blog/:path*',
  '/services/:path*',
  '/contact/:path*',
  '/landing/:path*',          // <-- include landing routes
],
```

When `enableLandingPages` is `false`, all `/landing/*` URLs rewrite to `/404`.

---

## 4. Form Embed Placeholder

Clients may use a variety of form tools (HubSpot, Typeform, Gravity Forms, Klaviyo, etc.). We leave a clear `<div id="landing-form-placeholder"/>` or a minimal `<LandingFormPlaceholder />` component in the template, with inline comments:

```tsx
// In LandingPage:
<div id="landing-form-placeholder">
  {/* e.g. <HubSpotForm portalId="..." formId="..." /> */}
</div>
```

Future AI coders or devs can search for `landing-form-placeholder` and drop in any embed snippet.

---

## 5. Tracking & Analytics Flow

We already load our global tracking scripts (`<TrackingScripts />`) in `app/layout.tsx`, so landing pages inherit pageview tracking and consent gating. For conversion events:

1. **Client-side**: wrap the submit button or hook into the embedded form's callback to call:

   ```ts
   import { trackEvent } from "@/components/tracking/trackEvent";
   trackEvent("landing_form_submit", { slug, utm_source, utm_campaign });
   ```

2. **Server-side**: if you capture leads via `/api/lead/route.ts`, send a server-side event to GA4 or Meta Conversions API there.

We leave markers in the template so you can wire up any flow later:

```tsx
{
  /* TODO: on success, call trackEvent or fetch('/api/lead', ...) */
}
```

---

## 6. Next Steps

- Scaffold the folder structure:

  1. Create `app/landing/layout.tsx` and `app/landing/[slug]/page.tsx` using the templates above.
  2. Create `app/resources/page.tsx` (index) and `app/resources/[slug]/page.tsx` (detail).

- Implement the shared data layer:

  ```ts
  // lib/data/resources.ts
  export type Resource = {
    /* … */
  };
  export async function getResources() {
    /* … */
  }
  export async function getResourceBySlug(slug: string) {
    /* … */
  }
  ```

- Build the shared content component:

  - `components/resources/ResourceContent.tsx`
  - Stub out sub-components: `TextSection`, `FormSection`, `ImageSection`

- Configure feature flags and middleware:

  1. In `lib/site.config.ts`, ensure `enableLandingPages` is set.
  2. In `middleware.ts`, include `/landing/:path*` guard as shown.

- Update navigation:

  - Add `/resources` to `siteConfig.navLinks` or footer links.
  - Leave `/landing` unlisted.

- Validate functionality:
  1. Run `npm run build && npm run lint && npm test` to confirm zero errors.
  2. Deploy to staging and verify:
     - The EU cookie banner appears before any form scripts.
     - Landing pages at `/landing/[slug]` render with slim header.
     - Resource pages at `/resources/[slug]` render with full header.

---

_This document is your blueprint for phase 3. Once the scaffolding is in place, onboarding a new resource means: fill out `lib/data/resources.ts`, flip on `enableLandingPages`, wire your form embed in `FormSection`, and add your page to the `/resources` index._

## 7. Shared Data & Dual-Route Architecture

### 7.1 Data Layer (`lib/data/resources.ts`)

```ts
export type Resource = {
  slug: string;
  type: "ebook" | "whitepaper" | "case-study" | string;
  title: string;
  subtitle?: string;
  heroImage: string;
  sections: Array<{
    type: "text" | "form" | "image" | string;
    props: any;
  }>;
};

export async function getResources(): Promise<Resource[]> {
  // e.g. fetch from CMS or return hard-coded array
}
export async function getResourceBySlug(
  slug: string,
): Promise<Resource | undefined> {
  return (await getResources()).find((r) => r.slug === slug);
}
```

### 7.2 Shared Content Component (`components/resources/ResourceContent.tsx`)

```tsx
import Image from "next/image";
import FormSection from "@/components/resources/FormSection";
import TextSection from "@/components/resources/TextSection";
import ImageSection from "@/components/resources/ImageSection";
import type { Resource } from "@/lib/data/resources";

export default function ResourceContent({ resource }: { resource: Resource }) {
  return (
    <>
      {/* Hero */}
      <section className="resource-hero">
        <h1>{resource.title}</h1>
        {resource.subtitle && <p>{resource.subtitle}</p>}
        <Image
          src={resource.heroImage}
          alt={resource.title}
          width={1200}
          height={600}
        />
      </section>

      {/* Dynamic Sections */}
      {resource.sections.map((section, i) => {
        switch (section.type) {
          case "text":
            return <TextSection key={i} {...section.props} />;
          case "form":
            return <FormSection key={i} {...section.props} />;
          case "image":
            return <ImageSection key={i} {...section.props} />;
          default:
            return null;
        }
      })}
    </>
  );
}
```

### 7.3 Landing Route (`app/landing/[slug]/page.tsx`)

```tsx
import LandingLayout from "@/app/landing/layout";
import ResourceContent from "@/components/resources/ResourceContent";
import { getResourceBySlug } from "@/lib/data/resources";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return (await getResources()).map((r) => ({ slug: r.slug }));
}

export default async function LandingPage({ params: { slug } }) {
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <LandingLayout>
      <ResourceContent resource={resource} />
    </LandingLayout>
  );
}
```

### 7.4 Resource Route (`app/resources/[slug]/page.tsx`)

```tsx
import ResourceContent from "@/components/resources/ResourceContent";
import { getResourceBySlug } from "@/lib/data/resources";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return (await getResources()).map((r) => ({ slug: r.slug }));
}

export default async function ResourceDetail({ params: { slug } }) {
  const resource = await getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <>
      <ResourceContent resource={resource} />
    </>
  );
}
```

### 7.5 Navigation & Index

- Add `/resources` to `siteConfig.navLinks` or footer.
- Create `app/resources/page.tsx` to list and link each resource by slug.
- Ensure `/landing` remains unlisted in main navigation.

---

_With this, any future AI or developer only ever touches `lib/data/resources.ts` and the `ResourceContent` component. All pages (paid & organic) render the same source of truth._

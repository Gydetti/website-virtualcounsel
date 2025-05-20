# Hero Section Gradient Centralization & Alignment Plan

## Purpose
To centralize and configure the hero-style gradient background across all core pages (Home, About, Services, Blog index, Resources index, FAQ, Contact, Testimonials) so that updating it requires a single change in configuration rather than manual edits in multiple components.

## Scope
- All "hero" or top-section wrappers currently using:
  ```
  bg-gradient-to-r from-brand-primary/10 to-brand-hero-background
  ```
- Components affected:
  - `components/sections/hero-section.tsx`
  - `components/sections/about-section.tsx` (classic & default variants)
  - `app/faq/FaqClientPage.tsx`
  - `app/contact/ContactPageClient.tsx`
  - `app/blog/page.tsx`
  - `components/sections/services-overview-section.tsx`
  - `components/sections/ResourceListSection.tsx`
  - `app/testimonials/page.tsx`
- Shared `Section` wrapper where applicable.

## Implementation Steps

### 1. Add Config Key
- In `lib/site.config.local.ts`, add:
  ```ts
  sectionStyles: {
    heroGradient: 'bg-gradient-to-r from-brand-primary/10 to-brand-hero-background',
  },
  ```
- Update Zod schema (`lib/schemas/siteConfig.schema.ts`) to include:
  ```ts
  sectionStyles: z.object({
    heroGradient: z.string().nonempty(),
  }).optional(),
  ```

### 2. Extend Section Component
- Update `components/layout/Section.tsx`:
  ```ts
  export interface SectionProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    fullBleed?: boolean;
    bgClass?: string;
  }
  export function Section({ bgClass = '', className = '', fullBleed = true, ...rest }: SectionProps) {
    const base = 'overflow-hidden';
    const wrapper = fullBleed
      ? `${base} ${bgClass} ${className}`
      : `${containerClasses} ${bgClass} ${className}`;
    return (
      <section className={wrapper} {...rest}>
        {fullBleed ? <div className={containerClasses}>{children}</div> : children}
      </section>
    );
  }
  ```
- Use default:
  ```tsx
  <Section bgClass={siteConfig.sectionStyles?.heroGradient}>…</Section>
  ```

### 3. Migrate Hero-Style Wrappers
- Replace raw `<section className="… bg-gradient-to-r from-… to-…">` with:
  ```tsx
  <Section
    id="hero-section"
    bgClass={siteConfig.sectionStyles!.heroGradient}
    className="hero-pattern relative"
  >
    …hero content…
  </Section>
  ```
- Apply same change in About, FAQ, Contact, Blog, Services, Resources, Testimonials.

### 4. Ensure Tailwind JIT Inclusion
- Confirm literal appears in code so Tailwind JIT picks it up.
- If needed, safelist in `tailwind.config.ts`:
  ```js
  safelist: [
    'bg-gradient-to-r',
    'from-brand-primary/10',
    'to-brand-hero-background',
  ],
  ```

### 5. Testing & Validation
- Manual smoke: change `heroGradient` in config and verify each page.
- E2E: Playwright test to assert computed background-image contains 'linear-gradient'.
- Unit: snapshot test for `<Section bgClass>` output.

### 6. Performance Considerations
- No additional CSS: Tailwind generates each utility once.
- Runtime cost: single string lookup, negligible.
- SSR: CSS variables injection unchanged.

## Future Extensions
- Add more `sectionStyles` keys (e.g. `footerBanner`, `ctaBanner`).
- Support multiple gradient variants via config.

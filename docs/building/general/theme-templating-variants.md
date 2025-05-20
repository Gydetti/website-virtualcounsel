# Theme Templating & Variant Management (AI-Coder Single Source of Truth)

> **Purpose:** This document defines the end-to-end plan for implementing multi-variant dynamic theming in the GMG template website. It is intended for AI coding agents with zero external context. It provides all necessary definitions, file layouts, code snippets, configuration, and QA steps so that variant theming can be added, toggled, and validated without human instruction.

---

> **Quick Implementation Summary (Updated May 2025):**
>
> - The active theme variant is now chosen by a hardcoded constant in `app/layout.tsx`:
>   ```ts
>   const themeKey = 'v3'; // or 'v1', 'v2', 'v3', etc.
>   ```
> - A fallback to `themeVariants.v1` ensures the site never breaks if the key is invalid.
> - At SSR time, CSS variables for the chosen variant are inlined via a `<style>` tag in `<head>`, avoiding runtime bloat or FOUC.
> - All components and Tailwind utilities reference these CSS variables for styling.
> - To switch variants, simply update the `themeKey` value to the desired variant name and rebuild/redeploy.

## Best Practice: Legacy & Core CSS Variable Unification

**Objective:** Without touching every component or adding runtime JS, ensure _all_ Tailwind color utilities—both modern (`bg-primary`, `text-accent`) and legacy (`bg-brand-*`, `text-brand-*`)—respond to your active theme variant.

**Implementation Steps:**

1. In `app/layout.tsx`'s `getThemeCssVars`, after building `colorVars`, append:

```ts
const brandVars = Object.entries(theme.colors)
  .map(([key, value]) => {
    const name = toKebabCase(key);
    return `--brand-${name}: ${value}; --brand-${name}-rgb: ${hexToRgbServer(value)};`;
  })
  .join('\n');
```

2. Inject both sets in the same inline `<style>`:

```tsx
<style
  dangerouslySetInnerHTML={{
    __html: `:root {${colorVars}\n${brandVars}}`,
  }}
/>
```

3. Rebuild and redeploy; no component changes required.

**Benefits:**

- Zero-impact refactor: no component changes required.
- Zero runtime overhead: SSR-only style injection.
- Centralized control: all tokens in one function.

---

## 1. Terminology & Scope

- **Variant:** A named collection of design tokens (colors, fonts, spacing, radii, etc.). E.g., `v1`, `v2`, `final`.
- **Active Variant:** The single variant currently injected into the site at SSR time.
- **themeVariants object:** A TS module exporting all named variants.
- **CSS Variable Injection:** At SSR/build, injecting the active variant's tokens as `--token-name` into a `<style>` block in `<head>`.
- **Toggle Mechanism:** Changing the active variant via config or query parameter.

**Scope:**

- Data-driven theming only—injection via CSS variables.
- No runtime theme provider or client-side state beyond optional query-param override.
- Preserves Treeshaking: only active CSS variables are shipped.
- Works in Next.js App Router (`app/layout.tsx`).

---

## 2. Directory & File Structure

```text
project-root/
├─ lib/
│  ├─ theme.variants.ts      # Defines all variants
│  └─ site.config.local.ts   # Selects active variant
├─ app/
│  └─ layout.tsx             # Injects CSS variables
└─ docs/
   └─ building/
      └─ general/
         └─ theme-templating-variants.md  # This file
```

---

## 3. Defining Theme Variants

**File:** `lib/theme.variants.ts`

```ts
import type { SiteConfig } from '@/lib/siteConfig';
import { siteConfig as rawConfig } from '@/lib/site.config.local';

// themeVariants must match the full SiteConfig['theme'] schema (colors, logo, favicon, typography,
// spacing, borders, shadows, layout)
export const themeVariants: Record<string, SiteConfig['theme']> = {
  // v1 uses the default client theme
  v1: rawConfig.theme,

  // v2 demonstrates an alternative dark/emblem style
  v2: {
    ...rawConfig.theme, // preserves logo & favicon
    colors: {
      primary: '#1F2937', // dark slate
      secondary: '#10B981', // emerald
      accent: '#F59E0B', // amber highlight
      background: '#111827', // deep background
      header: '#F9FAFB', // light header text
      body: '#E5E7EB', // light body text
      lightGrey: '#374151', // mid-gray surfaces
      heroBackground: '#1F2937', // dark hero section
    },
    typography: {
      headingFont: 'Montserrat',
      bodyFont: 'Roboto',
      baseSize: '18px', // slightly larger
    },
    spacing: {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem',
    },
    borders: {
      radiusBase: '1rem',
      widthBase: '2px',
      colorBase: '#4B5563',
    },
    shadows: {
      sm: '0 2px 4px rgba(0,0,0,0.1)',
      md: '0 6px 8px rgba(0,0,0,0.15)',
      lg: '0 12px 20px rgba(0,0,0,0.2)',
    },
    layout: {
      containerMaxWidth: '1024px',
      containerPadding: '1.5rem',
    },
  },
  // TODO: add 'final' variant combining preferred tokens from v1 & v2
};
```

### 3.1 Additional Variant Controls

Beyond the core design tokens, consider adding these to each variant definition for full stylistic flexibility:

- **Feature Flags Overrides:** Enable or disable animations, page transitions, backgrounds, micro-interactions per variant.
- **Background Patterns & Overlays:** CSS variables or class toggles for SVG patterns (e.g., dots, stripes, noise).
- **Gradient Definitions:** Primary and secondary gradient stops for backgrounds or buttons.
- **Opacity Tokens:** Custom RGBA opacity levels for color tokens (e.g., `--primary-10`, `--primary-80`).
- **Transition Durations & Easing:** Variables for global animation speed (`--transition-duration`, `--transition-easing`).
- **Font Weights & Line Heights:** Extend typography to include `headingWeight`, `bodyWeight`, `lineHeight`.
- **Border & Radius Variants:** Multiple radius sizes (small, medium, large) instead of a single base.
- **Spacing Scale Extensions:** Additional breakpoints or spacing steps (e.g., `xxl`, `xxs`).
- **Layout Variants:** Container max widths for desktop, tablet, mobile.
- **Component Defaults:** Button, card, and badge style overrides (e.g., rounded vs. square, outline vs. filled).
- **Theme Icons & Logos:** Variant-specific logo assets or icon sets.
- **Logo & Favicon Swapping:** Allow each variant to specify its own logo and favicon paths.

These controls let you craft dramatically different 'vibes'—from minimalistic corporate to bold, playful designs—while preserving performance and maintainability.

---

## 4. Selecting the Active Variant

**File:** `lib/site.config.local.ts`

```ts
import { themeVariants, ThemeTokens } from './theme.variants';

// Options: 'v1', 'v2', 'final', etc.
export const siteConfig = {
  themeVariant: process.env.THEME_VARIANT || 'v1',
  // derive active tokens:
  theme: (() => {
    const key = process.env.THEME_VARIANT || 'v1';
    return themeVariants[key] ?? themeVariants['v1'];
  })() as ThemeTokens,
  // ...other client config fields...
} as const;
```

> **Note:** Using an `ENV` var (`THEME_VARIANT`) enables previewing without code edits. Default falls back to `v1`.

---

## 5. SSR Injection of CSS Variables

**File:** `app/layout.tsx`

1. **Import config:**
   ```ts
   import { siteConfig } from '@/lib/site.config.local';
   ```
2. **Generate CSS variables:** loop through `siteConfig.theme`.
3. **Inject inline `<style>`** within `<head>`.

```tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { theme } = siteConfig;
  const cssVars = Object.entries(theme)
    .flatMap(([group, values]) =>
      Object.entries(values as Record<string, string>).map(
        ([token, value]) => `--${group}-${token}: ${value};`
      )
    )
    .join('\n');

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }} />
        {/* other head tags */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

> **Outcome:** At SSR, only the active variant's variables are inlined, avoiding FOUC and bundle bloat.

---

## 6. Toggling & Previewing Variants

### 6.1 ENV-Based Toggle

- Set `THEME_VARIANT=v2 npm run dev` or in `.env.local`:
  ```ini
  THEME_VARIANT=v2
  ```
- Reload to see the site styled with variant `v2`.

### 6.2 Query Parameter Override (Optional)

- In `app/layout.tsx`, read URL:
  ```ts
  import { useSearchParams } from 'next/navigation';
  const params = useSearchParams();
  const override = params.get('theme');
  const activeKey = override && themeVariants[override] ? override : siteConfig.themeVariant;
  const theme = themeVariants[activeKey];
  ```
- Use `?theme=v2` to preview without environment changes.

> **Security:** Validate `override` against known keys to avoid injection.

---

## 7. Advanced: Section-Level Overrides

**Goal:** Mix-and-match variants per section for rapid A/B section-level previews.

1. **Extend `siteConfig`:**
   ```ts
   export const siteConfig = {
     themeVariant: 'final',
     sectionOverrides: { hero: 'v1', footer: 'v2' },
     // ...
   } as const;
   ```
2. **Wrap sections:** In a section component:
   ```tsx
   import { siteConfig } from '@/lib/site.config.local';
   function HeroSection() {
     const variantKey = siteConfig.sectionOverrides.hero || siteConfig.themeVariant;
     const tokens = themeVariants[variantKey];
     const inlineStyle = { '--primary': tokens.colors.primary } as React.CSSProperties;
     return <section style={inlineStyle}>…</section>;
   }
   ```
3. **CSS variables cascade:** Only affects that section's root.

> **Use Case:** Show homepage with v1 hero + v2 services + final footer.

---

## 8. Testing & Verification

1. **Visual QA:** Launch `http://localhost:3000?theme=v1` vs `?theme=v2`. Compare Figma/design.
2. **Unit Tests:** Write Vitest snapshot tests for a key component reading CSS vars from `getComputedStyle`.
3. **E2E Tests:** Playwright test:
   ```ts
   test.each(['v1', 'v2'])('theme %s loads primary color', async ({ page }, variant) => {
     await page.goto(`/?theme=${variant}`);
     const primary = await page.evaluate(() =>
       getComputedStyle(document.documentElement).getPropertyValue('--colors-primary')
     );
     expect(primary.trim()).toBe(themeVariants[variant].colors.primary);
   });
   ```
4. **Lint & Build:** Ensure CSS injection code passes ESLint and no warnings.

---

## 9. CI/CD & Deployment

- **CI Script (`ci:verify`):** Automatically picks up `THEME_VARIANT` from environment. You can add matrix builds:
  ```yaml
  jobs:
    test_v1:
      env: THEME_VARIANT: v1
      steps: [checkout, install, build, test, e2e]
    test_v2:
      env: THEME_VARIANT: v2
      steps: [checkout, install, build, test, e2e]
  ```
- **Staging Previews:** Vercel can deploy separate previews for branches `variant/v1`, `variant/v2`, each with its own ENV.

---

## 10. Performance & Maintenance Notes

- **Minimal Inline CSS:** Only a small `<style>` block of CSS variable definitions (e.g. 50–100 tokens) is injected into `<head>`, typically totaling under 2–3 KB of CSS.
- **Tailwind & Tree-Shaking:** All utility classes compile to `var(--…)` lookups; unused classes (including other variants) are removed by PurgeCSS, so no extra CSS is shipped.
- **Zero Runtime Overhead:** Theming relies purely on CSS variables; there's no client-side theme provider or heavy JS. An optional query-param override is read once in the layout with negligible cost.
- **SSR-Safe & No FOUC:** Variables are inlined at SSR/build time, ensuring correct styles on first paint without flash or hydration mismatch.
- **Cache Busting:** When `THEME_VARIANT` changes (ENV or config), invalidate any server or CDN cache to avoid serving stale CSS variable values.
- **Ease of Preview & CI Integration:** Preview variants instantly via `THEME_VARIANT` ENV var or `?theme=` query param without rebuilding. CI can run matrix jobs for each variant to validate builds and E2E tests in parallel.
- **Accessibility:** Each variant must be validated for WCAG color contrast; include contrast checks in visual QA or automated a11y tests.

---

## 11. Future Extensions

- **UI Toggle Panel:** Build an admin UI to switch variants via query param, store preference in cookie.
- **Runtime Theme Switching:** Introduce a client provider if live switching is ever needed.
- **Dynamic A/B Testing:** Tie variants to analytics experiments.
- **Automatic Diff Generation:** Use visual regression tools to capture before/after screenshots per variant.

---

## 12. Unifying Opacity Syntax (Single & Robust Opacity API)

### Objective

Provide a single, uniform opacity syntax for all colors—variant-driven and semantic—using Tailwind's built-in slash-syntax and eliminating duplication and confusion.

### Decision: Slash-only Implementation

1. Consolidate the dynamic theme-variant palette into Tailwind's static color map:
   - In `tailwind.config.ts` under `theme.extend.colors`, map each `siteConfig.theme.colors` key (`primary`, `secondary`, `accent`, `background`, `heroBackground`, etc.) to its corresponding CSS variable (e.g., `primary: 'var(--primary)'`).
   - Add semantic tokens (`neutral-surface`, `neutral-background`, `feedback-error-bg`, etc.) similarly, referencing their CSS variables.
2. Remove the custom dash-syntax plugin block that generates `bg-primary-10`, `text-accent-80`, etc.
3. Replace any existing dash-syntax class usages (e.g., `bg-primary-10`) with slash-syntax equivalents (`bg-primary/10`).

### Implementation Steps

- Create a feature branch `feature/opacity-unification`.
- Update `theme.extend.colors` in `tailwind.config.ts` to include all theme tokens, mapping to CSS variables.
- Remove the plugin import and plugin block that implements dash-syntax in `tailwind.config.ts`.
- Run a project-wide codemod or sed script to convert dash-based classes to slash-syntax:
  ```bash
  grep -Rl 'bg-[a-z-]*-[0-9]\\+' . | xargs sed -i '' 's/bg-\\([a-z-]*\\)-\\([0-9]\\+\\)/bg-\\1\\/\\2/g'
  ```
- Verify local with `npm run verify:local` and fix any broken references.

### Performance & Validation

- Tailwind JIT and PurgeCSS will generate only the classes you actually use; no bundle size impact.
- SSR CSS variable injection remains unchanged in `app/layout.tsx`.
- Add Vitest and Playwright tests to assert that a sample opacity class (`bg-primary/10`, `bg-neutral-surface/10`) correctly applies the expected color.

---

**End of Theme Templating & Variant Management spec.**

This document is the single source of truth for all AI coding agents implementing and extending multi-variant theme support.

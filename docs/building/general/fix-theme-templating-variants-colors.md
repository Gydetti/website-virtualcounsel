# Fixing Theme Templating & Variant Color Pipeline

> **Purpose:** This research essay manual documents the current color/theming architecture in the GMG Template Website 2025, identifies existing pain points, and prescribes a clean, single-source-of-truth solution—complete with dynamic brand-light and brand-dark generation, Tailwind mapping, and verification steps. This guide is self-contained and can be shared with any AI agent or new developer.

---

## 1. Overview & Goals

- **Single Source of Truth**: All brand colors (e.g., primary, secondary, accent, background, header, body, lightGrey, heroBackground) must come from one config file.
- **Automatic CSS Variables**: At SSR, generate two CSS variables per color: `--<token>: <hex>` and `--<token>-rgb: R,G,B`.
- **Tailwind Integration**: Map those `--<token>-rgb` variables into every `bg-<token>`, `bg-<token>/<opacity>`, `text-<token>`, and `border-<token>` utility—no hardcoding.
- **Dynamic Light/Dark Variants**: Compute `brand-light` and `brand-dark` HSL variants from the primary HEX.
- **No Per-Component Patches**: Tweak colors in one file; watch the entire UI update.

---

## 2. Current Codebase Context

### 2.1 `lib/theme.variants.ts`

- Defines hard-coded variant overrides (`v1`, `v2`, `v3`), but only overrides a few color keys.

### 2.2 `app/layout.tsx` _(SSR Injector)_

- Merges `siteConfig.theme` & selected `themeVariant`.
- Runs `getThemeCssVars(theme, variantKey)` which:  
  • Builds HSL/RGB for `primary-light`/`primary-dark`.  
  • Emits dozens of `--<name>` & `--brand-<name>` variables via two code paths (v1 vs v2+).

### 2.3 `theme/colors.ts` _(Semantic Tokens)_

- Exports `semanticColors` (brand._, neutral._, feedback._, asset._) referencing CSS vars, and `semanticGradients`.

### 2.4 `tailwind.config.ts` _(Tailwind Mapping)_

- Historically used a plugin to loop `siteConfig.theme.colors` and generate `bg-<color>-<opacity>` utilities.
- Later replaced by static placeholder strings with `<alpha-value>`, then by a `withOpacity()` helper.
- Finally drifted back to static, leaving both slash and dash syntaxes broken.

---

## 3. Key Pain Points

1. **Fragmented Injection**: Two separate code paths in `getThemeCssVars`, risking missing tokens.
2. **Drifted CSS-Var Names**: Mismatch between injected `--<token>-rgb` names and Tailwind mapping.
3. **Stale Dash Syntax**: Legacy `bg-<token>-10` removed but never replaced.
4. **Complex Helper Logic**: `withOpacity()`, manual plugin loops, and static blocks all competing.
5. **Hard-coded VariantKey**: No ENV toggle; switching variants requires code edits.
6. **No Automated Verification**: No end-to-end or snapshot test to catch missing variables or broken classes.

---

## 4. Desired Architecture

```
site.config.local.ts
  └─ theme.colors: Record<string, HEX>

app/layout.tsx  (SSR)
  └─ Loop theme.colors → inline <style>:root { --token: HEX; --token-rgb: R,G,B; }

tailwind.config.ts
  └─ import siteConfig
  └─ const brandColors = map theme.colors → ({opacity}) => `rgb(var(--token-rgb)/opacity)`
  └─ theme.extend.colors = { ...semanticColors, ...brandColors }

components/pages
  └─ Use `bg-primary`, `bg-primary/50`, `text-secondary`, `border-accent`, etc.—no code changes required.

Tests & QA
 └─ E2E verifies `--primary-rgb`, CSS class resolutions, and visual smoke tests.
```

---

## 5. Detailed Implementation Plan

1. **Centralize Brand Colors**

   - Move all color definitions to `lib/site.config.local.ts` under `theme.colors`.
   - Remove any duplicate or shadowed values in `themeVariants` and elsewhere.

2. **Simplify SSR Injection**

   - In `app/layout.tsx`, replace existing `getThemeCssVars` with a single loop:
     ```ts
     const cssVars = Object.entries(siteConfig.theme.colors)
       .map(([key, hex]) => {
         const name = toKebabCase(key);
         return `--${name}: ${hex}; --${name}-rgb: ${hexToRgbServer(hex)};`;
       })
       .join('\n');
     ```
   - Append computed `--brand-light`/`--brand-dark` using HSL transforms:
     ```ts
     const [h, s, l] = hexToHslServer(theme.colors.primary);
     cssVars += `--brand-light: ${hslToHexServer(h, s, Math.min(l + 20, 100))};`;
     cssVars += `--brand-dark: ${hslToHexServer(h, s, Math.max(l - 20, 0))};`;
     ```

3. **Dynamic Tailwind Mapping**

   - In `tailwind.config.ts`, delete static mappings and any helper/plugin overpatches.
   - Add:

     ```ts
     import { siteConfig } from './lib/siteConfig';
     const brandColors = Object.fromEntries(
       Object.keys(siteConfig.theme.colors).map(key => {
         const name = toKebabCase(key);
         return [
           name,
           ({ opacityValue = 1 }: { opacityValue?: number }) =>
             `rgb(var(--${name}-rgb) / ${opacityValue})`,
         ];
       })
     );

     // Then inside theme.extend:
     colors: { ...semanticColors, ...brandColors }
     ```

   - This auto-generates:
     • `.bg-<token>` (opacityValue defaults to 1)  
      • `.bg-<token>/<percent>` utilities  
      • `.text-<token>/<percent>` and `.border-<token>/<percent>`
     {/\*

4. **Legacy Dash Syntax**
   - Decide: remove entirely or add back via minimal plugin:
     ``ts
     plugin(({ matchUtilities, theme }) => {
       const opacityMap = theme('opacity.0 ');
       Object.keys(siteConfig.theme.colors).forEach(key => {
         const name = toKebabCase(key);
         matchUtilities({ [`bg-${name}`]: v => /*same*/ }, { values: opacityMap });
         // optionally match `bg-${name}-${n}` if dash syntax needed
       });
     });
     ``
     \*/}
5. **Schema & ENV Toggle**

   - Update `schemas/siteConfig.schema.ts` to accept optional `themeVariant: string`.
   - In `site.config.local.ts`, expose `themeVariant = process.env.THEME_VARIANT || 'v1'`.
   - Wire that into `layout.tsx` to pick the correct values from `themeVariants` if still needed.

6. **Testing & Verification**

   - **Unit**: snapshot test for `getThemeCssVars` output.
   - **E2E**: Playwright test that visits `/`, retrieves `--primary-rgb`, then checks `.bg-primary` background-color.
   - **Visual QA**: developer-only `/dev/theme` page that lists `getComputedStyle` of each `--<token>-rgb`.

7. **Documentation & Onboarding**

   - Replace old theming docs with this single guide.
   - Update `docs/BUILD.md` and onboarding guides.
   - Provide sample snippet for beginners:
     ```jsx
     // Just drop your brand colors here:
     export const siteConfig = { theme: { colors: { primary: '#FF0000', ... } } };
     ```

8. **Cleanup**
   - Remove `getThemeCssVars` variants branches, `withOpacity` helper, and any legacy color patches.
   - Delete dash-syntax plugin if unused.
   - Consolidate `semanticColors` to remove overlapping brand tokens.

---

## 6. Example Code Snippets

### 6.1 SSR Injection (app/layout.tsx)

```tsx
const cssVars = Object.entries(siteConfig.theme.colors)
  .map(([key, hex]) => {
    const name = toKebabCase(key);
    return `--${name}: ${hex}; --${name}-rgb: ${hexToRgbServer(hex)};`;
  })
  .join('\n');

// brand-light & brand-dark:
const [h, s, l] = hexToHslServer(siteConfig.theme.colors.primary);
cssVars += `--brand-light: ${hslToHexServer(h, s, Math.min(l + 20, 100))};`;
cssVars += `--brand-dark: ${hslToHexServer(h, s, Math.max(l - 20, 0))};`;

return (
  <head>
    <style dangerouslySetInnerHTML={{ __html: `:root {${cssVars}}` }} />…
  </head>
);
```

### 6.2 Tailwind Mapping (tailwind.config.ts)

```ts
import { siteConfig } from './lib/siteConfig';
import { semanticColors, semanticGradients } from './theme/colors';
import type { Config } from 'tailwindcss';

const brandColors = Object.fromEntries(
  Object.keys(siteConfig.theme.colors).map(key => {
    const name = toKebabCase(key);
    return [
      name,
      ({ opacityValue = 1 }: { opacityValue?: number }) =>
        `rgb(var(--${name}-rgb) / ${opacityValue})`,
    ];
  })
);

const config: Config = {
  content: [...],
  theme: {
    extend: {
      colors: {
        ...semanticColors,
        ...brandColors,
      },
      backgroundImage: { ...semanticGradients },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
```

---

## 7. FAQ

- **Why not pure Tailwind config?**  
  We generate brand-light/dark variants dynamically based on HSL math at SSR, ensuring consistent contrast and facilitating global tone shifts.

- **What about legacy dash syntax?**  
  Either remove entirely (preferable) or provide a small plugin for `bg-primary-10` → `opacityValue:0.1`.

- **Where to plug in new colors?**  
  Only in `site.config.local.ts` under `theme.colors`. Everything else auto-flows.

---

**End of Fix-Theming Manual**

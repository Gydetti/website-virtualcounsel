# Fix2: Theme & Color Pipeline Cleanup

**NOTE:** We will **keep the existing variant logic** (`themeVariants` + `variantKey`) intact, so that dynamic theming remains fully supported.

## Objectives

- Centralize _all_ color definitions (including `light-2` and `dark-2`) in **`lib/site.config.local.ts`**.
- Maintain the variant override system (v1, v2, v3) based on `themeKey` and `themeVariants`.
- Replace the two-path CSS-variable injector in **`app/layout.tsx`** with a single, unified loop that still uses `variantKey` to merge the correct variant colors.
- Simplify **`tailwind.config.ts`** so every `siteConfig.theme.colors` key generates opacity-aware utilities (slash syntax) automatically.
- Convert all components to use slash-syntax (e.g. `bg-primary/20`) or arbitrary values; remove any dash-syntax or one-off hacks.
- Ensure `white` and other static colors support opacity (e.g. `bg-white/8`).
- Write automated unit and E2E tests to verify CSS variables and Tailwind utilities resolve correctly.
- Update documentation to a single, easy-to-follow README section for color theming.

## Cleanup Plan

1. **Consolidate Colors**

   - In **`lib/site.config.local.ts`**, under `theme.colors`, add any new tokens (`light-2`, `dark-2`).
   - Remove any other hard-coded color strings from components and docs.

2. **Unified SSR Injection**

   - In **`app/layout.tsx`**, replace `getThemeCssVars` with one loop over `siteConfig.theme.colors`, then append computed `--brand-light` and `--brand-dark` from HSL math.
   - Still read `variantKey` and merge `themeVariants[variantKey]` before generating variables.

3. **Dynamic Tailwind Mapping**

   - In **`tailwind.config.ts`**, import `siteConfig` and build `dynamicColors` via:
     ```ts
     const dynamicColors = Object.fromEntries(
       Object.keys(siteConfig.theme.colors).map(key => [
         key,
         ({ opacityValue = 1 }) => `rgb(var(--${key}-rgb) / ${opacityValue})`,
       ])
     );
     // then extend: colors: { ...semanticColors, ...dynamicColors }
     ```
   - Remove any legacy static or plugin-based dash-syntax mappings.

4. **Slash-Syntax Migration**

   - Codemod all `bg-<color>-<n>` to `bg-<color>/<n>` across `.tsx` and `.jsx` files.
   - Update any custom classes (e.g. in `badge.tsx`) to use slash-syntax or arbitrary CSS values.

5. **Enable Opacity on Static Colors**

   - Add a function mapping for `white` in `tailwind.config.ts`:
     ```ts
     dynamicColors.white = ({ opacityValue = 1 }) => `rgba(255,255,255,${opacityValue})`;
     ```
   - Now `bg-white/8` and similar work out of the box.

6. **Purge Legacy Hacks**

   - Search for any `bg-[rgba(`, `bg-[hsl(` or `to-[rgba(` entries; convert to unified approach.
   - Remove `brand-light-2` and `brand-dark-2` injections from multiple files, ensuring only the SSR injector and semantic maps remain.

7. **Automated Testing**

   - **Unit Tests** for the new `getThemeCssVars()` output.
   - **Playwright E2E** tests for key utilities (`.bg-primary/10`, `.bg-brand-light-2`, gradients, etc.).
   - **Visual Snapshot** tests for critical sections (Hero, ProblemPain, etc.).

8. **Documentation & Onboarding**

   - Replace all color theming docs with one section in README:

     ```md
     ## How to Add or Change a Color

     1. Edit `lib/site.config.local.ts` → `theme.colors`.
     2. Build (`npm run build`). Colors and utilities auto-update.
     3. Use `bg-<token>`, `bg-<token>/<opacity>`, `bg-gradient-to-br from-<token>/20 to-transparent`.
     ```

   - Archive or delete old `theme-templating-variants.md` and `fix-theme-templating-variants-colors.md` if superseded.

---

_Run the full local verification (`npm run verify:local`) after completing these steps to ensure zero errors and a clean codebase._

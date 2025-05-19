# Unified Client-Custom Build Blueprint

> **Audience:** AI coding agents in zero-context sessions. A self-contained guide for custom client build preparation and automation.

---

## 1. Mission & Context

This blueprint merges every prior artifact (color-coding plan, placeholder extraction manual, theming guide, build/test workflows, animation strategy) into one unified essay manual. Any AI agent, even with zero context, can follow this to externalize placeholders, centralize configuration, and generate a fully customized client build in minutes.

## 2. Goals & Scope

1. Centralize all placeholder content into `lib/data/staticContent.ts`.
2. Centralize fallback assets (images) into `lib/constants.ts`.
3. Consolidate theme tokens: colors, fonts, spacing via `app/globals.css`, `theme/colors.ts`, `tailwind.config.ts`, and `app/layout.tsx`.
4. Automate code replacements with codemods and ESLint rules to eliminate literals.
5. Enforce build, lint, and tests via the `ci:verify` script.
6. Provide a zero-context chat prompt to bootstrap customization.

## 3. Codebase Layers & Customization Points

### 3.1 Configuration: `lib/site.config.local.ts`

- Single source of truth for client branding, navigation, feature flags, tracking IDs.
- Validated at build time by Zod schema in `lib/site.config.ts`.

### 3.2 Data Modules: `lib/data/`

- `staticContent.ts`: holds all extracted placeholder copy.
- Section data (FAQ, homepage, resources, services) lives here, Zod-validated.

### 3.3 Constants: `lib/constants.ts`

- `DEFAULT_PLACEHOLDER_IMAGE` for all fallback images.

### 3.4 Theme & Styling

- `app/globals.css`: base CSS variables for SSR and FOUC prevention.
- `theme/colors.ts`: semantic color and gradient tokens.
- `tailwind.config.ts`: exposes CSS variables and opacity utilities via plugin.
- `app/layout.tsx`: injects CSS variables at SSR and applies root fonts/backgrounds.

### 3.5 Components & Sections

- Section components under `components/sections/` accept data props; wrap in `<LazySection>` for scroll-triggered animations.
- Shared content components (e.g., `ResourceContent.tsx`) drive both landing and resource pages.

### 3.6 Animations

- `<LazySection>`: scroll-reveal per section or item with `delay`.
- `<PageTransitionWrapper>`: route transition animations, toggled by feature flags.
- `BackgroundCanvas`: animated backgrounds controlled by `siteConfig.features`.

### 3.7 Asset Pipeline

- Raw masters in `assets/images/raw/<category>/`.
- Optimize via `npm run image-optimize` ▶︎ `public/images/` + `blurDataURL.json`.
- Use `OptimizedImage` with blur placeholders in components.

## 4. Step-by-Step Implementation Plan

1. **Extract placeholders**:

   ```bash
   rg --exclude-dir={.next,node_modules,public} -i 'placeholder' app components docs
   ```

   • Move text into `staticContent.ts`; replace inline nodes.

2. **Centralize fallback images**:

   ```bash
   rg "placeholder(\.svg|/placeholders/)" -l app components | xargs sed -i "s|'/images/placeholders/placeholder.svg'| DEFAULT_PLACEHOLDER_IMAGE|g"
   ```

3. **Scaffold & map theme tokens**:
   • Merge all literal colors from `globals.css`, `siteConfig`, and `tailwind.config.ts` into `theme/colors.ts`.
   • Verify semantic token classes (`bg-neutral-background`, `text-body`, `bg-hero-gradient`).

4. **Automate replacements**:
   • Run jscodeshift codemod to swap hardcoded classes/hexes with semantic tokens.
   • Enforce via custom ESLint regex rule for color literals.

5. **Update pages & components**:
   • Import and consume `staticContent`, `DEFAULT_PLACEHOLDER_IMAGE`, and semantic token classes.

6. **Animate content**:
   • Wrap all section headings and card grids in `<LazySection>` with staggered delays.

7. **Validate build & CI**:

   ```bash
   npm run ci:verify
   ```

8. **Zero-context chat prompt**:
   > "Load `staticContent.ts`, `constants.ts`, `theme/colors.ts`, `site.config.local.ts`, and this blueprint; inject client copy into `staticContent`, update `DEFAULT_PLACEHOLDER_IMAGE`, set branding in `site.config.local.ts`, then run `npm run ci:verify`."

## 5. Automation Scripts & Key Commands

```bash
# Find all hardcoded placeholders
rg --exclude-dir={.next,node_modules,public} -i 'placeholder' app components docs

# Replace fallback images in bulk
rg "placeholder(\.svg|/placeholders/)" -l app components | xargs sed -i "s|'/images/placeholders/placeholder.svg'| DEFAULT_PLACEHOLDER_IMAGE|g"

# Run codemod for placeholders
npm run codemod -- --extensions ts,tsx scripts/extract-placeholders.js app components

# Full CI check
echo "> Running CI verify"
npm run ci:verify
```

## 6. Zero-Context Chat Prompt

> You are an AI agent customizing a new client build. Steps:
>
> 1. Load `staticContent.ts`, `constants.ts`, `theme/colors.ts`, `site.config.local.ts`, and this blueprint.
> 2. Prompt: "Inject client copy into staticContent, update DEFAULT_PLACEHOLDER_IMAGE, set branding & feature flags in site.config.local.ts."
> 3. Run replacements, animations wiring, then `npm run ci:verify`.

## 7. Appendix & References

- Color plan: `docs/building/general/unified-color-coding-plan.md`
- Placeholder plan: `docs/building/general/prep-client-customisation-may2025.md`
- CI script: `ci:verify` and `.github/workflows/ci.yml`
- Hardcoded list: `misconfigs-final.txt`

> By following this unified client-custom build blueprint, any AI agent—even in a fresh chat—can deliver a fully branded, optimized, and tested client site under 5 minutes.

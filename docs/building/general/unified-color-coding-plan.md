# Unified Color-Coding Plan

**Mission Statement:**
The goal of this plan is to preserve every color and color usage in the current codebase, mapping each to a clear, semantic token in the theme config. No color or usage will be lost; every token will be linked to its respective UI element or component, ensuring a fully centralized, maintainable, and extensible design system.

## 1. Introduction

This document captures everything we've discovered about our current color usage, why the previous attempt failed, and presents a clear, unified strategy to centralize all styling colors into a single, maintainable theme. All migration, enforcement, and future updates are handled by AI assistants—no manual or phased rollout is required.

**Note:**
This template is designed for single-brand use per project. For each new client, simply copy the template and update the theme file(s) with the new brand's colors. Multi-brand (runtime switching) is not required for this workflow, but the system can be extended to support it if your use case changes in the future.

## 2. Post-Mortem & Key Findings

### 2.1 What Went Wrong

- **Remapping Confusion:** We remapped `brand-light`/`brand-dark` to background/header colors rather than preserving the original HSL stops used by the template.
- **Broken Gradients:** Any section using subtle blues or light gradients lost its intended appearance.
- **Hard-Coded Tailwind Literals:** We still had dozens of places using `bg-blue-100`, `bg-gray-50`, raw hexes like `#2563EB`, and even inline CSS gradients.

### 2.2 Audit Summary

- **178** occurrences of literal color classes or hard-coded hexes across `app/`, `components/`, and other directories.
- **Categories of misuse:**
  - Badges (`bg-blue-100 text-primary hover:bg-blue-200`)
  - Section gradients (e.g. `bg-gradient-to-r brand-primary-10 via-transparent to-transparent`)
  - Overlay backgrounds (`bg-gray-50`, `bg-white`)
  - Feedback states (`bg-red-50`, `text-red-700`, `bg-green-50`, `text-green-700`)
  - Footer specific HSL gradients and blur spots

## 3. Goals

1. **Single Source of Truth:** All colors live in one theme definition, never in JSX, CSS literals, or inline hexes.
2. **Semantic Tokens:** Names reflect _purpose_ (`bg-hero-gradient`, `text-body`, `feedback-error`) not raw colors.
3. **Automated Enforcement:** Lint rules + codemod to prevent regressions.
4. **Future-Ready:** AI or human can tweak the theme file and re-theme entire site instantly.

## 4. Strategy & Roadmap

### 4.1 Centralize Color Definitions

- Create a dedicated theme file (`theme/colors.ts` or extend `tailwind.config.js`) exposing:
  ```js
  export const colors = {
    brand: {
      primary: 'hsl(222, 47%, 56%)',
      light: 'hsl(222, 47%, 90%)',
      dark: 'hsl(222, 47%, 18%)',
    },
    neutral: {
      background: 'var(--color-gray-50)',
      surface: 'var(--color-white)',
      text: 'var(--color-gray-900)',
    },
    feedback: {
      error: 'var(--color-red-700)',
      success: 'var(--color-green-700)',
      warning: 'var(--color-orange-700)',
    },
    // …other tokens…
  };
  ```
- Mirror every existing literal and hex from `globals.css`, `site.config.local.ts`, etc.

### 4.2 Replace Literals with Tokens

- **Codemod**: An AI assistant will run a codemod that reads a mapping (`bg-blue-100 → bg-brand.light`) and replaces all occurrences.
- **Bulk Run**: The codemod will be applied against all identified spots.

### 4.3 Enforce via Lint & CI

- **ESLint rule**: AI assistants will ensure that any `bg-[a-z]`, `text-[a-z]`, or hex literal outside our theme import is flagged and replaced.
- **Pre-commit/CI**: Automated checks will block any literal color usage.

### 4.4 Semantic Token Naming & Conventions

- **Naming Conventions:**
  - Use names that reflect _purpose_ and _placement_, not color value.
  - Examples:
    - `bg-hero-gradient`, `bg-section-overlay`, `bg-card-surface`
    - `text-body`, `text-caption`, `text-heading`
    - `feedback-error-bg`, `feedback-success-text`
    - `border-card`, `border-divider`, `border-accent`
    - States: `-hover`, `-active`, `-disabled`
- **Guidelines:**
  - Use `brand.*` for primarysecondary/hero/accent colors.
  - Use `neutral.*` for backgrounds, surfaces, and text.
  - Use `feedback.*` for error, warning, success, info.
  - Use `gradient-*` for multi-stop backgrounds.

### 4.5 Design System Alignment

- **Palette Source:**
  - Our tokens should map to the _current_ palette as defined in `globals.css` and `site.config.local.ts`.
  - If a new design system is adopted (e.g. Material, Tailwind, custom), tokens should be mapped accordingly, but _token names_ should remain semantic.
- **Vibe:**
  - The current color "vibe" (blues, neutrals, subtle gradients) is preserved in the theme file, not in scattered classnames.

### 4.6 Gradients, Opacity, and Special Cases

- **Gradients:**
  - Define gradient tokens as objects or CSS custom properties:
    ```js
    gradients: {
      hero: 'linear-gradient(90deg, var(--brand-light) 0%, var(--white) 100%)',
      footer: 'linear-gradient(135deg, var(--brand-dark) 0%, var(--brand-darker) 100%)',
    }
    ```
- **Opacity:**
  - Use tokens for overlays: `overlay-light`, `overlay-dark`, etc.
  - Example: `bg-[rgba(var(--brand-primary-rgb),0.08)]` → `bg-overlay-light`
- **Special Cases:**
  - For one-off effects, add a token with a clear name and document its use.

### 4.7 Multi-Brand & Dynamic Theming Support

- **Single Brand Per Project (Recommended):** Update = I actually want to go for theme variants
  - The intended workflow is to use one theme file per project. For each client, copy the template and update the theme file(s) with the new brand's colors. No runtime brand switching is needed.
- **Extensibility:**
  - If your use case ever changes (e.g., you build a multi-tenant SaaS or need runtime brand switching), the system can be extended to support multiple brands by adding separate theme files and a theme provider/context. This is not required for the current workflow.
- **Theme Variants for Client Previews (Optional):**
  - Define multiple variant token sets in `theme/colors.ts` (e.g., `variants.default`, `variants.highContrast`, `variants.warmTone`).
  - Toggle variants via a root class or attribute (e.g., `<html class="theme-highContrast">`).
  - Leverage Tailwind's purge to tree-shake unused variant CSS, ensuring minimal bundle overhead.
  - Use variant toggles to showcase different looks to clients without the complexity of full multi-branding.
  - ⚠️ **Performance Note:** Only support theme variants if Purge CSS and code-splitting safeguard bundle size and page speed; otherwise, maintain a single-theme approach.

### 4.8 Documentation & Onboarding

- Update our Core Building Instructions: add a "Color Tokens" chapter.
- Provide examples:

  ```jsx
  // ❌ Avoid:
  <div className="bg-gray-50 p-4">…</div>

  // ✅ Use:
  <div className="bg-neutral-background p-4">…</div>
  ```

- Add a migration guide and FAQ for contributors.

### 4.9 Visual Examples

#### Before

```jsx
// Old usage
<div className="bg-blue-100 text-gray-700 border-gray-200 hover:bg-gray-50">Hello</div>
```

#### After

```jsx
// New usage
<div className="bg-brand-light text-neutral-text border-divider hover:bg-surface-hover">Hello</div>
```

#### Screenshot Example

- (Insert before/after screenshots here to show the visual impact of tokenization)

---

## 5. Semantic Token Mapping Principles

**Tokens are assigned by _role_ and _context_, not by current color value.**

- If the same color value (e.g. `#111111`) is used for both text and borders, create two tokens: one for text, one for borders.
- Never re-use a token for a different UI role, even if the color is currently the same.
- This ensures future flexibility: if you want to change the border color but not the text color, you only update the relevant token.

**Examples:**

| UI Role        | Old Usage | Token Name       | Value     |
| -------------- | --------- | ---------------- | --------- |
| Body Text      | `#111111` | `text-body`      | `#111111` |
| Card Border    | `#111111` | `border-card`    | `#111111` |
| Section Border | `#111111` | `border-section` | `#111111` |

If later you want to make `border-section` lighter, you only change its value in the theme file.

---

## 6. Mapping Table: Literal → Token

| Old Usage              | New Token/Class          | Notes                          |
| ---------------------- | ------------------------ | ------------------------------ |
| `bg-blue-100`          | `bg-brand-light`         | Hero backgrounds, badges, etc. |
| `bg-gray-50`           | `bg-neutral-background`  | Section backgrounds            |
| `bg-white`             | `bg-surface`             | Cards, overlays, etc.          |
| `text-gray-700`        | `text-neutral-text`      | Body text                      |
| `border-gray-200`      | `border-divider`         | Card and section dividers      |
| `bg-red-50`            | `bg-feedback-error-bg`   | Error backgrounds              |
| `text-red-700`         | `text-feedback-error`    | Error text                     |
| `bg-green-50`          | `bg-feedback-success-bg` | Success backgrounds            |
| `text-green-700`       | `text-feedback-success`  | Success text                   |
| `bg-blue-400/10`       | `bg-brand-secondary/10`  | Blur spots, overlays           |
| `from-blue-50`         | `from-brand-light`       | Gradients                      |
| `to-white`             | `to-surface`             | Gradients                      |
| `bg-gradient-to-r ...` | `bg-hero-gradient`       | Use gradient token             |
| `#2563EB`              | `brand-primary`          | Direct hex → token             |
| ...                    | ...                      | ...                            |

(Expand this table as needed for all found usages.)

---

## 7. Next Steps (AI-Driven)

1. **Scaffold Theme File:** AI assistant creates `theme/colors.ts` and maps every existing color.
2. **Implement Codemod:** AI assistant builds and tests the mapping script.
3. **Write ESLint Rule:** AI assistant blocks any color literal outside tokens.
4. **Run Replacement:** AI assistant applies codemod, reviews changes, and fixes any edge-cases.
5. **CI Integration:** Automated checks enforce color token usage in all PRs.
6. **Document & Train:** AI assistant updates docs and onboarding notes.
7. **Visual QA:** AI assistant compares before/after screenshots to ensure no regressions.

---

Once this is in place, the codebase will be truly theme-driven, maintainable, and ready for any global style update—manual or AI-powered—with zero file-by-file edits.

---

## Appendix: Color Audit Methodology & Reference

### How Hardcoded Color Usages Were Found

To ensure a complete and reproducible audit, the following search methodology was used to identify all files and lines with hardcoded color values or static Tailwind color classes:

#### Main Search Commands

```bash
# Find all hex color codes in relevant source directories
cd /Users/gydorutten/Coding/Klanten/gmg-template-website-2025 && \
grep -R --exclude-dir=.next --exclude-dir=node_modules --exclude-dir=docs --exclude-dir=public -En "#[0-9A-Fa-f]{6}\b" . | tee hardcoded-colors.txt

# Find all hex codes and Tailwind color classes in app, components, lib, hooks, scripts
grep -R --exclude-dir=.next --exclude-dir=node_modules --exclude-dir=docs --exclude-dir=public --exclude-dir=.lighthouseci -En '(#[0-9A-Fa-f]{6})|bg-[a-z]+-[0-9]{1,3}|text-[a-z]+-[0-9]{1,3}|border-[a-z]+-[0-9]{1,3}' app components lib hooks scripts | tee color-misconfigs.txt

# Refine by excluding config and manifest files
grep -R --exclude-dir=.next --exclude-dir=node_modules --exclude-dir=docs --exclude-dir=public --exclude-dir=.lighthouseci --exclude="lib/site.config.local.ts" --exclude="lib/data/homepage.ts" --exclude=app/globals.css --exclude=app/manifest.ts -En '(#[0-9A-Fa-f]{6})|bg-[a-z]+-[0-9]{1,3}|text-[a-z]+-[0-9]{1,3}|border-[a-z]+-[0-9]{1,3}' app components hooks lib scripts | tee misconfigs-final.txt
```

- The final, most accurate list of all hardcoded color usages is stored in `misconfigs-final.txt` at the project root.
- As of the last audit, there were **178** such instances across the codebase.

### Why This Matters

- This appendix ensures that any future work—by AI assistants or humans, in any chat or context—can always trace the original audit, reproduce the search, and know exactly which files/lines require migration.
- If the codebase changes, simply re-run the above commands to update the audit.

### Where to Find the List

- See `misconfigs-final.txt` for the full, line-by-line reference of all hardcoded color usages to be migrated to theme tokens.

---

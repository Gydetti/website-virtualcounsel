# Phase 1.5: Color & Opacity Unity Blueprint for AI-Driven Templates

## Context & Rationale

The GMG Template Website 2025 aims to be a fully AI-customizable, client-friendly codebase. One of the most important aspects of this is **theme color management**—allowing anyone (or any agent) to set brand colors in a single place and have those changes propagate everywhere, including gradients, backgrounds, borders, and alpha/opacity utilities.

### Why Not Just Use Tailwind's Color Tokens?

- **User/AI Friendliness:** Most users and AI agents expect to set colors as hex codes (e.g., `#FF9D48`), not Tailwind's HSL or RGB lists.
- **Centralization:** All theme values (colors, spacing, fonts) should live in `site.config.local.ts` for maintainability and clarity.
- **Tailwind Limitation:** Tailwind's `/10`, `/20`, etc. alpha utilities only work if the underlying CSS variable is a space-separated RGB or HSL value—not a hex. Using hex breaks these utilities, causing gradients and backgrounds to fail or look wrong.

## The Solution: Dual CSS Variables for Each Theme Color

For every theme color (primary, secondary, accent, etc.), expose **both**:

- The hex value (for solid fills, borders, etc.):
  - `--primary: #2563EB;`
  - `--secondary: #FF9D48;`
- The RGB value (for alpha/opacity utilities):
  - `--primary-rgb: 37,99,235;`
  - `--secondary-rgb: 255,157,72;`

This is handled automatically in `app/layout.tsx` by converting the hex to RGB and setting both variables on `:root` at build/SSR time.

## How to Use in Tailwind & Components

- **Solid backgrounds, borders, text:**
  - `bg-[var(--secondary)]`, `border-[var(--primary)]`, `text-[var(--accent)]`
- **Alpha/opacity backgrounds and gradients:**
  - `bg-[rgba(var(--secondary-rgb),0.1)]`, `from-[rgba(var(--primary-rgb),0.2)]`, etc.
- **No more `/10`, `/20` utilities on theme colors**—use the `rgba(var(--*-rgb), alpha)` pattern instead.

## Migration Steps (One-Time Codebase Update)

1. **Server-side CSS Variable Injection:**
   - For each color in `siteConfig.theme.colors`, set both `--color` (hex) and `--color-rgb` (computed RGB) on `:root` in a `<style>` tag in `app/layout.tsx`.
2. **Tailwind Config:**
   - Keep color utilities mapped to `var(--primary)`, `var(--secondary)`, etc. for solid fills.
   - For alpha/opacity, use arbitrary values: `bg-[rgba(var(--secondary-rgb),0.1)]`.
3. **Component Update:**
   - Search for all `/10`, `/20`, etc. usages with theme colors (e.g., `bg-secondary/10`, `from-primary/20`).
   - Replace with `bg-[rgba(var(--secondary-rgb),0.1)]`, `from-[rgba(var(--primary-rgb),0.2)]`, etc.
   - For text and borders, use the solid CSS variable.
4. **Documentation:**
   - Document this pattern in the onboarding and developer docs so future contributors and AI agents know to always use the dual-variable approach.

## Best Practices & Future-Proofing

- **Single Source of Truth:** All color changes happen in `site.config.local.ts`—no more hunting for color codes in component files.
- **AI-Ready:** Any agent can update the theme by changing a hex code; the system handles all downstream effects.
- **No Hardcoding:** Never hardcode color values in components—always use the CSS variables.
- **Consistent Opacity:** All gradients, overlays, and alpha backgrounds will always match the current theme.
- **Extendable:** Add more theme colors (e.g., `info`, `success`, `warning`) by following the same pattern.

## Example: How It Looks in Practice

**site.config.local.ts**

```ts
colors: {
  primary: "#2563EB", // blue
  secondary: "#FF9D48", // orange
  accent: "#3B82F6", // blue-light
}
```

**app/layout.tsx**

```ts
root.style.setProperty('--secondary', theme.colors.secondary);
root.style.setProperty('--secondary-rgb', '255,157,72');
```

**Component Usage**

```tsx
// Solid background
className = 'bg-[var(--secondary)]';
// Gradient with opacity
className = 'bg-gradient-to-b from-[rgba(var(--secondary-rgb),0.1)] to-transparent';
```

## Conclusion

This approach ensures the template is:

- **Fully dynamic and AI-configurable**
- **Robust to future design changes**
- **Easy for non-devs and AI agents to update**
- **Consistent and professional in all color/opacity scenarios**

_Adopt this pattern everywhere in the codebase for a future-proof, best-in-class template._

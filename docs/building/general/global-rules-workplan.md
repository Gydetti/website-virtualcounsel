# Global Rules Workplan

This document outlines the strategic, phased approach to unify typography and section styling across the site, with current implementation status.

## Phase 1: Establish Global Base Rules (Completed ✅)
- Defined in `app/globals.css` under `@layer base`:
  - h1 → 36px mobile, 48px (md), 56px (lg)
  - h2 → 32px mobile, 36px (md)
  - h3 → 26px mobile, 32px (md)
  - h4 → 20px mobile, 26px (md)
  - p  → 18px at all breakpoints
- Created utility classes in `@layer utilities`:
  - `.text-body-lg` (18px)
  - `.text-body-base` (16px)
  - `.text-caption` (14px)

## Phase 2: Normalize Section Headings (H₂) (Completed ✅)
- Updated `.section-title` utility to `text-[2rem] md:text-[2.25rem] font-bold mb-6`.
- Replaced all hard-coded H₂ classes in section components and pages with `className="section-title"`.

## Phase 3: Clean Up H₁, H₃ & H₄ in Components (Completed ✅)
1. **H₁**: Removed explicit sizing/font classes so global h1 rule applies across all pages and components (e.g., homepage, about, services, blog, contact, not-found, legal pages).
2. **H₃**: Stripped local `text-…` and `font-…` overrides in step titles, card headings, testimonial names, FAQ messages, etc., to use the global h3 sizing.
3. **H₄**: Removed local overrides on smaller sub-headings (cookie banner tabs, process details, contact section labels, testimonial card authors) so they inherit global h4 styling.

## Phase 4: Unify Paragraph & Body Text (In Progress)
- Removed `text-lg` on `<p>` tags to default to the 18px global paragraph size.
- Next:
  - Audit remaining `<p>` tags using explicit size classes (`text-xl`, `text-base`, `text-sm`).
  - Where smaller text is intentional (labels, captions), apply:
    - `.text-body-base` for 16px body text.
    - `.text-caption` for 14px caption text.
  - Ensure all standard paragraphs inherit the global base rule without extra classes.

## Phase 5: Quality Assurance & Tuning (Pending)
- Spot-check primary pages (Home, About, Services, Blog, Contact) and all section components across breakpoints.
- Verify semantic heading hierarchy, consistent spacing, and accessibility.
- Run full build, lint, and test suite:
  ```bash
  npm run build && npm run lint -- --fix && npm test
  ```
- Deploy to staging for runtime validation before merging to `main`.

---

_All future refactors should follow this updated workplan to maintain consistency. Ensure any new components adopt these same global styles and utilities._

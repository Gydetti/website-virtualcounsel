# ESLint Blueprint for GMG Template Website 2025

## 1. Objective

Define a comprehensive, data-driven linting strategy to enforce code quality, performance, accessibility, and consistency across our Next.js + TypeScript + Tailwind CSS template.

## 2. Scope & Principles

- **Static analysis** for early bug detection and type safety
- **Style consistency**: imports, formatting, naming, and component patterns
- **Architecture enforcement**: layer boundaries and module isolation
- **Theming integrity**: no hard-coded colors or raw Tailwind literals outside semantic tokens
- **Performance guardrails**: optimized image usage and bundle safety
- **Accessibility assurance**: built-in a11y checks for JSX elements

## 3. Core Plugins & Base Config

Extend and compose the following presets and plugins:

- `next/core-web-vitals`, `next/typescript`
- `plugin:@typescript-eslint/recommended`
- `plugin:react/recommended`, `plugin:react-hooks/recommended`
- `plugin:tailwindcss/recommended`
- `plugin:jsx-a11y/recommended`
- `plugin:import/errors`, `plugin:import/warnings`, `plugin:import/order`
- `plugin:unused-imports/recommended`
- `plugin:boundaries` (or custom boundary rules)
- `plugin:regexp` (for custom no-literal patterns)

## 4. High-Value Rules

### 4.1 React & Hooks

- `react-hooks/rules-of-hooks`: **error**
- `react-hooks/exhaustive-deps`: **error**
- `react/jsx-key`: **error**

### 4.2 TypeScript Strictness (Phase 1 → Phase 2)

- `@typescript-eslint/no-explicit-any`: **warn**, migrate to **error** on critical modules
- `@typescript-eslint/explicit-function-return-type`: **warn**, adopt on public APIs
- `@typescript-eslint/strict-boolean-expressions`: **warn**

### 4.3 Import Management

- `import/no-extraneous-dependencies`: **error**
- `import/order`: group imports as `[builtin, external, internal, parent, sibling, index]`, with path groups for `lib/`, `components/`, `hooks/`, `assets/`
- `simple-import-sort/imports` & `simple-import-sort/exports`: **error** (auto-fix on save)

### 4.4 Semantic Theming & Asset Usage

- Custom `no-restricted-syntax` patterns to ban:
  - Hex literals: `/#[0-9A-Fa-f]{6}/`
  - Raw Tailwind: `/\b(bg|text|border)-[a-z]+-\d{1,3}\b/`
- `@next/next/no-img-element`: **error** (enforce `next/image` or `<OptimizedImage />`)

### 4.5 Accessibility & SEO

- `jsx-a11y/alt-text`: **error**
- `jsx-a11y/interactive-supports-focus`: **error**
- `jsx-a11y/anchor-is-valid`: **error**
- `react/no-danger`: **error** (protect against unsafe HTML)

### 4.6 No Debugging Artifacts

- `no-console`: **error** (allow `console.error` via shared logger)
- `no-debugger`: **error**

### 4.7 Complexity & Maintainability

- `complexity`: **warn** at CC > 10
- `max-lines-per-function`: **warn** at > 200 lines
- `unused-imports/no-unused-imports`: **error**

### 4.8 Architecture Boundaries

- Prevent cross-layer imports via `boundaries/no-cross-imports`
  - Layers: `app/` → may import `components/`, `lib/`, `hooks/`, `assets/`
  - `components/`, `lib/`, `hooks/` must not import from `app/`

## 5. Sample Configuration Snippet

```jsonc
{
  "extends": [
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/order",
    "plugin:unused-imports/recommended",
  ],
  "plugins": ["simple-import-sort", "regexp", "boundaries"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "@typescript-eslint/no-explicit-any": "warn",
    "import/no-extraneous-dependencies": "error",
    "import/order": [
      "error",
      { "groups": ["builtin", "external", "internal", "parent", "sibling", "index"] },
    ],
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "regexp/no-restricted-syntax": [
      "error",
      {
        "pattern": "#[0-9A-Fa-f]{6}",
        "message": "Hardcoded hex literals are forbidden; use theme tokens.",
      },
      {
        "pattern": "\\b(bg|text|border)-[a-z]+-\\d{1,3}\\b",
        "message": "Use semantic Tailwind tokens instead of raw utility classes.",
      },
    ],
    "@next/next/no-img-element": "error",
    "no-console": "error",
    "no-debugger": "error",
    "complexity": ["warn", { "max": 10 }],
    "max-lines-per-function": ["warn", 200],
    "unused-imports/no-unused-imports": "error",
    "boundaries/no-cross-imports": [
      "error",
      {
        "default": "disallow",
        "rules": [
          { "from": "app/**", "allow": ["components/**", "lib/**", "hooks/**", "assets/**"] },
        ],
      },
    ],
  },
  "settings": {
    "boundaries/elements": [
      { "type": "app", "pattern": "app/**" },
      { "type": "component", "pattern": "components/**" },
      { "type": "lib", "pattern": "lib/**" },
      { "type": "hook", "pattern": "hooks/**" },
    ],
    "boundaries/ignore": ["**/*.test.ts", "**/*.spec.ts"],
  },
}
```

## 6. Integration & Enforcement

- **Local workflow**: `npm run lint -- --fix` on save and pre-commit
- **CI pipeline**: run `npm run lint`, `npx biome lint app components lib hooks`; fail on any error
- **Phased rollout**: start with errors for color tokens, hooks, imports, images; migrate legacy code incrementally
- **Automated fixes**: enable `--fix` for import sort, unused imports, basic style issues

## 7. Automated Dependency Management & Upgrade Strategy

- Use Dependabot (or a similar tool) to open PRs for dependency version updates on a regular cadence (e.g., weekly).
- Configure auto-merge for non-breaking patch and minor updates once CI checks pass to reduce manual overhead.
- Manually review major version bump PRs to assess breaking-change notes and update code accordingly.
- Ensure each dependency PR invokes the full CI pipeline (build, format-check, lint, type-check, tests, E2E) before merge.
- Leverage a shared `dependabot.yml` template so every client repository stays in sync with the same update policy.

## 8. Vercel Deployment & Preview Workflow

- Every branch or PR triggers a Vercel Preview Deployment—use these URLs for smoke tests on key pages (home, landing, resources).
- Protect the `main` branch: only merge PRs after CI passes and successful staging or manual validation.
- Production builds and deployments occur exclusively on successful pushes to `main`, ensuring controlled releases.
- Document and automate key smoke-test scenarios against Preview Deployments to catch regressions early.
- Implement rollback strategies via feature flags or Vercel's rollback capabilities to swiftly revert if issues arise.

## 9. Maintenance & Evolution

- Review lint rule output weekly in tracking board
- Update plugin versions quarterly
- Add new custom rules for emerging patterns (e.g., feature-flag gating)
- Archive or refine rules that prove too noisy or obsolete

---

_Internal configuration blueprint for guiding automated enforcement of code quality, performance, and consistency._

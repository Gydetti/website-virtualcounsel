# Deployment Error Update & Fix

## Overview

A structured, step-by-step plan to resolve the `ReferenceError: React is not defined` and related build failures after migrating to Next.js 15+ with the SWC automatic JSX runtime.

## Root Causes

1. **JSX Runtime Mismatch**: Next.js SWC automatic runtime (`jsx: "react-jsx"`) injects only the `jsx`/`jsxs` helpers, not the full `React` object.
2. **Direct React API Calls**: Components use `React.forwardRef`, hooks (`useState`, `useEffect`), `React.createContext`, and namespace calls requiring a live `React` binding.
3. **Biome `useImportType` Rule**: Strips default React imports when considered type-only, removing required runtime imports.
4. **Misplaced `"use client"` Directive**: Next.js demands `"use client"` appear as the first statement in client modules.
5. **Duplicate Imports and Parse Errors**: Late-injected or manual duplicate imports caused identifier conflicts and build failures.

## Detailed Solution Plan

### 1. Embrace SWC Automatic Runtime

- Ensure `tsconfig.json` has:
  ```json
  "jsx": "react-jsx"
  ```
- Remove all default or namespace `import React from "react"` and `import * as React from "react"` lines.

### 2. Convert Direct React API Calls to Named Imports

- Replace `React.forwardRef` with:
  ```ts
  import { forwardRef } from "react";
  ```
  then call `forwardRef(...)`.
- For hooks:
  ```ts
  import { useState, useEffect } from "react";
  ```
- For context or other APIs:
  ```ts
  import { createContext } from "react";
  ```
- Use type-only imports for TypeScript helpers:
  ```ts
  import type { ReactNode, HTMLAttributes } from "react";
  ```

### 3. Ensure Correct Placement of `"use client"`

- Add `"use client"` as the very first line in any file that uses hooks or client-only APIs (before all imports).

### 4. Automate Refactoring with a Codemod

- Write and run a jscodeshift script to:
  1. Remove default and namespace React imports.
  2. Scan for `React.<API>` usages and inject corresponding named imports at the top.
  3. Insert `import type` statements for type-only React helpers.
  4. Prepend `"use client"` where necessary.

### 5. Update Linter & Biome Configuration

- Keep Biome's `lint/style/useImportType` **enabled** to strip leftover type-only imports.
- Run:
  ```bash
  npm run lint -- --fix
  npm run biome organizeImports
  ```
- Confirm zero lint warnings or errors.

### 6. Build & Validate

1. `npm run build` → should compile without missing-React or parse errors.
2. `npm run lint` → zero errors/warnings.
3. `npm test` → all tests pass.
4. Deploy to staging:
   ```bash
   npm run deploy -- --target staging
   ```
5. Smoke-test the staging environment.

### 7. Final Deployment Workflow

- Commit and push changes to the `main` branch.
- Vercel auto-deployment triggers and should pass.

## Relevant File Paths

- `tsconfig.json`
- `next.config.mjs`
- `biome.toml`
- `components/ui/*.tsx`
- `app/**/*.{tsx}`
- `hooks/**/*.tsx`
- `scripts/your-codemod.js`

## Research & Observations

- The `c895204-hero-shadow` snapshot (`docs/building/inspiration/c895204-hero-shadow`) uses the classic Babel transform (`jsx: "preserve"`) with manual `React` imports. It compiles but sacrifices SWC performance optimizations.
- The SWC automatic runtime only injects JSX helpers, not the full `React` binding required by direct API calls.
- Biome's `useImportType` rule prevents type-only imports, which aligns with named-import best practices.

## Handover Essay

To: Development and DevOps Teams

> Our application recently transitioned to Next.js 15's SWC compiler and the automatic JSX runtime. While this brings performance and bundle-size benefits for plain JSX, it surfaced a hidden dependency: our UI library and client components rely on direct `React` API calls (`forwardRef`, hooks, context, etc.). In the legacy Babel pipeline, these calls worked because Babel injected a default `React` binding automatically whenever JSX appeared. Under the new runtime, that binding is not provided, causing `ReferenceError: React is not defined`. Biome's lint rule then stripped out manual `React` imports it deemed "type-only," making the issue worse.

> The plan above unifies our code on the automatic runtime while converting every direct React API usage to named imports. This approach is fully aligned with modern React 18+/Next.js best practices, yields cleaner dependency graphs, and ensures build-time and lint-time safety. Once completed, the staging deployment will validate this globally. From there, merging to `main` triggers a clean Vercel release.

> Please follow the detailed solution steps in your local environment, and reach out to the architecture team for any clarifications. After migration, ensure all CI checks (build, lint, tests) pass with zero errors before final deployment.

## Appendix

- Next.js Automatic JSX Runtime: https://nextjs.org/docs/basic-features/jsx
- jscodeshift: https://github.com/facebook/jscodeshift

_End of Document_

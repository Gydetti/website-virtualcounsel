# Phase 4: Testing Scripts Manual

This document describes where and how to write and organize all tests in the codebase—unit, integration, and end-to-end—using Vitest and Playwright. It includes existing examples and recommended file locations so that any AI or human engineer can jump in and follow the conventions.

---

## 1. Test Directory Structure

All tests live under the top-level `tests/` folder. We recommend creating subfolders by test type:

```
tests/
├── unit/           # Vitest + React Testing Library unit tests
├── integration/    # Vitest + MSW integration tests (API routes, form flows, middleware)
└── e2e/            # Playwright end-to-end tests
```

**Example existing E2E test:**

• `tests/e2e/resource-pages.spec.ts` (copy of `tests/resource-pages.spec.ts`)

---

## 2. End-to-End (E2E) Tests with Playwright

### Configuration

- **Config file:** `playwright.config.ts` (sample):

  ```ts
  testDir: "tests/e2e",
  webServer: { command: "npm run dev", port: 3000, reuseExistingServer: true },
  use: { baseURL: "http://localhost:3000", headless: true, viewport: { width: 1280, height: 720 } }
  ```

- **Script:**
  ```bash
  npm test         # runs `playwright test`
  npx playwright install   # once, to install browser binaries
  ```

### Example: Resource & Landing Pages

```ts
// tests/e2e/resource-pages.spec.ts
import { test, expect } from '@playwright/test';

const slug = 'example-ebook';
const title = 'E-Book: The Ultimate Guide to Conversion Optimization';

test.describe('Resource & Landing Pages', () => {
  test('Resource detail page displays hero content', async ({ page }) => { … });
  test('Landing page displays hero content and Home link', async ({ page }) => { … });
});
```

### Add new E2E specs

- **Homepage** → `tests/e2e/homepage.spec.ts`
- **About page** → `tests/e2e/about.spec.ts`
- **Contact form flow** → `tests/e2e/contact-form.spec.ts`
- **Dynamic routes** → iterate slugs in `tests/e2e/services.spec.ts`, `tests/e2e/blog.spec.ts`

---

## 3. Unit Tests with Vitest

### Configuration

- **Config file:** `vitest.config.ts` (sample):

  ```ts
  test: { environment: 'jsdom', globals: true, setupFiles: ['./vitest.setup.ts'], include: ['tests/unit/**/*.test.{ts,tsx}'] }
  ```

- **Run:**
  ```bash
  npx vitest run        # run all unit tests
  npx vitest            # interactive watch mode
  ```

### Conventions

- File names: `*.test.tsx` or `*.test.ts`
- Place under `tests/unit/` or alongside your component in a `__tests__/` folder.

### What to cover

1. **UI Components** (Hero, Features, Footer, ContactSection):

   - Render with example `lib/data` fixtures
   - Assert text, images (`getByAltText`), button clicks, CSS classes

2. **Feature-flag gating**:

   - Mount layout or page with `siteConfig.features.enableX = false`
   - Assert the section is not rendered

3. **Utility functions** in `lib/`:

   - Metadata builder: ensure default metadata shape
   - Tracking helpers: stub `window.dataLayer`

4. **API schema validation**:
   - Directly import and call `contactSchema.parse()` with valid/invalid payloads

---

## 4. Integration Tests

### Tooling

Use Vitest + MSW (Mock Service Worker) to stub network calls.

### Placement

- File names: `*.spec.ts` or `*.test.ts`
- Directory: `tests/integration/`

### Examples

- **Contact form endpoint** (`app/api/contact/route.ts`):

  - Mock `fetch('https://www.google.com/recaptcha/api/siteverify')`
  - Mock SMTP/sendgrid/postmark calls via MSW or spy on `nodemailer.createTransport`
  - Assert JSON responses for success, validation errors, spam (honeypot)

- **Middleware gating** (`middleware.ts`):
  - Simulate NextRequest for disabled route and assert status 404

---

## 5. Accessibility & Performance Checks

1. **Automated a11y**: use `jest-axe` in Vitest to scan components:

   ```ts
   import { axe } from "jest-axe";
   expect(await axe(container)).toHaveNoViolations();
   ```

2. **Lighthouse CI (optional)**:
   - Configure GitHub Action to run Lighthouse on `staging` deploy
   - Fail on regressions in performance, best practices, accessibility

---

## 6. Running All Tests in CI

Add or update `package.json` scripts:

```json
"scripts": {
  "test:unit": "vitest run",
  "test:e2e": "playwright test",
  "test:integration": "vitest run --include 'tests/integration/**/*'",
  "test": "npm run test:unit && npm run test:integration && npm run test:e2e"
}
```

- In CI (`ci:verify`), call `npm test` to run every suite with zero failures.

---

## 7. Summary

1. **tests/unit/** → isolated component and function tests (Vitest)
2. **tests/integration/** → end-to-end of subsystems (API, form flows)
3. **tests/e2e/** → full UI journeys in real browsers (Playwright)

Use the existing `tests/e2e/resource-pages.spec.ts` as a template for all new E2E scripts. Keep naming and placement consistent so both humans and AI assistants can find and update tests quickly.

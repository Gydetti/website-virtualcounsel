# Test info

- Name: Smoke Tests for Core Pages >> should load /
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/smoke.spec.ts:7:9

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3010/", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/smoke.spec.ts:8:18
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | test.describe('Smoke Tests for Core Pages', () => {
   4 |   const PAGES = ['/', '/about', '/contact'];
   5 |
   6 |   for (const path of PAGES) {
   7 |     test(`should load ${path}`, async ({ page }) => {
>  8 |       await page.goto(path);
     |                  ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
   9 |       await expect(page).toHaveTitle(/.+/);
  10 |       await expect(page.locator('main')).toBeVisible();
  11 |     });
  12 |   }
  13 | });
  14 |
```
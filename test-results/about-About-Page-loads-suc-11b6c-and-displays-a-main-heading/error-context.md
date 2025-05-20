# Test info

- Name: About Page >> loads successfully and displays a main heading
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/about.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3010/about", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/about.spec.ts:5:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('About Page', () => {
   4 |   test('loads successfully and displays a main heading', async ({ page }) => {
>  5 |     const response = await page.goto('/about');
     |                                 ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
   6 |     expect(response?.ok()).toBeTruthy();
   7 |     const heading = page.locator('h2');
   8 |     await expect(heading.first()).toBeVisible();
   9 |   });
  10 | });
  11 |
```
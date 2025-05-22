# Test info

- Name: Homepage >> loads successfully and renders a main heading
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/homepage.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3010/", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/homepage.spec.ts:5:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('Homepage', () => {
   4 |   test('loads successfully and renders a main heading', async ({ page }) => {
>  5 |     const response = await page.goto('/');
     |                                 ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
   6 |     expect(response?.ok()).toBeTruthy();
   7 |     // Expect at least one level-1 heading on the page
   8 |     const heading = page.locator('h1');
   9 |     await expect(heading.first()).toBeVisible();
  10 |   });
  11 | });
  12 |
```
# Test info

- Name: Services Index Page >> loads successfully and contains service links
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/services.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3010/services", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/services.spec.ts:5:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('Services Index Page', () => {
   4 |   test('loads successfully and contains service links', async ({ page }) => {
>  5 |     const response = await page.goto('/services');
     |                                 ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
   6 |     expect(response?.ok()).toBeTruthy();
   7 |     // Expect at least one link to a service detail
   8 |     const links = page.locator('a[href^="/services/"]');
   9 |     await expect(links.first()).toBeVisible();
  10 |   });
  11 | });
  12 |
```
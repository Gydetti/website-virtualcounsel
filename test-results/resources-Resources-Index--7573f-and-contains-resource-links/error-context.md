# Test info

- Name: Resources Index Page >> loads successfully and contains resource links
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/resources.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost:3010/resources
Call log:
  - navigating to "http://localhost:3010/resources", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/resources.spec.ts:5:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('Resources Index Page', () => {
   4 |   test('loads successfully and contains resource links', async ({ page }) => {
>  5 |     const response = await page.goto('/resources');
     |                                 ^ Error: page.goto: net::ERR_ABORTED at http://localhost:3010/resources
   6 |     expect(response?.ok()).toBeTruthy();
   7 |     // Expect at least one link to a resource detail
   8 |     const links = page.locator('a[href^="/resources/"]');
   9 |     await expect(links.first()).toBeVisible();
  10 |   });
  11 | });
  12 |
```
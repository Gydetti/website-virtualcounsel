# Test info

- Name: Resource & Landing Pages >> Landing page returns 200
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/resource-pages.spec.ts:11:7

# Error details

```
Error: page.goto: net::ERR_ABORTED at http://localhost:3010/landing/example-ebook
Call log:
  - navigating to "http://localhost:3010/landing/example-ebook", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/resource-pages.spec.ts:12:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | const slug = 'example-ebook';
   4 |
   5 | test.describe('Resource & Landing Pages', () => {
   6 |   test('Resource detail page returns 200', async ({ page }) => {
   7 |     const response = await page.goto(`/resources/${slug}`);
   8 |     expect(response?.ok()).toBeTruthy();
   9 |   });
  10 |
  11 |   test('Landing page returns 200', async ({ page }) => {
> 12 |     const response = await page.goto(`/landing/${slug}`);
     |                                 ^ Error: page.goto: net::ERR_ABORTED at http://localhost:3010/landing/example-ebook
  13 |     expect(response?.ok()).toBeTruthy();
  14 |   });
  15 | });
  16 |
```
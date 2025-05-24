# Test info

- Name: Contact Page >> loads successfully and displays contact form
- Location: /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/contact.spec.ts:4:7

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3010/contact", waiting until "load"

    at /Users/gydorutten/Coding/Klanten/gmg-template-website-2025/tests/e2e/contact.spec.ts:5:33
```

# Test source

```ts
   1 | import { expect, test } from '@playwright/test';
   2 |
   3 | test.describe('Contact Page', () => {
   4 |   test('loads successfully and displays contact form', async ({ page }) => {
>  5 |     const response = await page.goto('/contact');
     |                                 ^ Error: page.goto: Target page, context or browser has been closed
   6 |     expect(response?.ok()).toBeTruthy();
   7 |     // Expect a form element on the contact page
   8 |     const form = page.locator('form');
   9 |     await expect(form.first()).toBeVisible();
  10 |   });
  11 | });
  12 |
```
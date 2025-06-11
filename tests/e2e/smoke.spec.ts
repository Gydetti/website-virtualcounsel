import { test, expect } from '@playwright/test';

test.describe('Smoke Tests for Core Pages', () => {
  const PAGES = ['/', '/about', '/contact'];

  for (const path of PAGES) {
    test(`should load ${path}`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('main').first()).toBeVisible();
    });
  }
});

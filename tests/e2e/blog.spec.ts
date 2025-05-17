import { expect, test } from '@playwright/test';

test.describe('Blog Index Page', () => {
  test('loads successfully and displays a main heading', async ({ page }) => {
    const response = await page.goto('/blog');
    expect(response?.ok()).toBeTruthy();
    const heading = page.locator('h1');
    await expect(heading.first()).toBeVisible();
  });
});

import { test, expect } from '@playwright/test';

test.describe('Resources Index Page', () => {
  test('loads successfully and contains resource links', async ({ page }) => {
    const response = await page.goto('/resources');
    expect(response?.ok()).toBeTruthy();
    // Expect at least one link to a resource detail
    const links = page.locator('a[href^="/resources/"]');
    await expect(links.first()).toBeVisible();
  });
}); 
import { test, expect } from '@playwright/test';

const slug = 'saas-checklist'; // First resource slug

test.describe('Resource & Landing Pages', () => {
  test.skip('Resource detail page returns 200', async ({ page }) => {
    const response = await page.goto(`/resources/${slug}`);
    expect(response?.ok()).toBeTruthy();
  });

  test.skip('Landing page returns 200', async ({ page }) => {
    const response = await page.goto(`/landing/${slug}`);
    expect(response?.ok()).toBeTruthy();
  });
});

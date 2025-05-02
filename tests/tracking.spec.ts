import { test, expect } from '@playwright/test';

test.describe('Tracking Scripts Smoke Test', () => {
  test.beforeEach(async ({ page }) => {
    // Simulate user consent for analytics and marketing
    await page.addInitScript(() => {
      window.Cookiebot = { consent: { statistics: true, marketing: true } };
    });
  });

  test('loads GA4 script with Partytown type', async ({ page }) => {
    await page.goto('/');
    const ga4Script = page.locator('script[type="text/partytown"][src*="gtag/js?id="]');
    await expect(ga4Script).toHaveCount(1);
  });
}); 
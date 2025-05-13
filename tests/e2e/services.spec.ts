import { expect, test } from "@playwright/test";

test.describe("Services Index Page", () => {
	test("loads successfully and contains service links", async ({ page }) => {
		const response = await page.goto("/services");
		expect(response?.ok()).toBeTruthy();
		// Expect at least one link to a service detail
		const links = page.locator('a[href^="/services/"]');
		await expect(links.first()).toBeVisible();
	});
});

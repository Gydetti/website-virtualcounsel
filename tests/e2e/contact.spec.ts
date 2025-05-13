import { expect, test } from "@playwright/test";

test.describe("Contact Page", () => {
	test("loads successfully and displays contact form", async ({ page }) => {
		const response = await page.goto("/contact");
		expect(response?.ok()).toBeTruthy();
		// Expect a form element on the contact page
		const form = page.locator("form");
		await expect(form.first()).toBeVisible();
	});
});

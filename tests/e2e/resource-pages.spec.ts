import { expect, test } from "@playwright/test";

const slug = "example-ebook";

test.describe("Resource & Landing Pages", () => {
	test("Resource detail page returns 200", async ({ page }) => {
		const response = await page.goto(`/resources/${slug}`);
		expect(response?.ok()).toBeTruthy();
	});

	test("Landing page returns 200", async ({ page }) => {
		const response = await page.goto(`/landing/${slug}`);
		expect(response?.ok()).toBeTruthy();
	});
});

import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("loads successfully and renders a main heading", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.ok()).toBeTruthy();
    // Expect at least one level-1 heading on the page
    const heading = page.locator("h1");
    await expect(heading.first()).toBeVisible();
  });
});

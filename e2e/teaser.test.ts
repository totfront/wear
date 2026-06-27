import { test, expect } from "@playwright/test";

test.describe("Teaser", () => {
  test("shows the teaser section after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Sydney");
    await page.getByText("Australia").first().click();
    await expect(
      page.getByText(/upload your wardrobe/),
    ).toBeVisible({ timeout: 10000 });
  });
});

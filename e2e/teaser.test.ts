import { test, expect } from "./fixtures";

test.describe("Teaser", () => {
  test("shows the teaser section after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Sydney");
    await expect(page.getByText("Australia")).toBeVisible({ timeout: 10000 });
    await page.getByText("Australia").first().click();
    await expect(
      page.getByText(/upload your wardrobe/),
    ).toBeVisible({ timeout: 10000 });
  });
});

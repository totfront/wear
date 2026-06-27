import { test, expect } from "./fixtures";

test.describe("UmbrellaBanner", () => {
  test("shows an umbrella recommendation after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Rome");
    await expect(page.getByText("Italy")).toBeVisible({ timeout: 10000 });
    await page.getByText("Italy").first().click();
    await expect(
      page.getByText(/umbrella/i),
    ).toBeVisible({ timeout: 10000 });
  });
});

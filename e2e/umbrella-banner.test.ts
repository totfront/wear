import { test, expect } from "./fixtures";

test.describe("RainGauge", () => {
  test("shows umbrella gauge with No/Maybe/Yes labels after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Rome");
    await expect(page.getByText("Italy")).toBeVisible({ timeout: 10000 });
    await page.getByText("Italy").first().click();
    await expect(page.getByText("Umbrella today?")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("No", { exact: true })).toBeVisible();
    await expect(page.getByText("Maybe", { exact: true })).toBeVisible();
    await expect(page.getByText("Yes", { exact: true })).toBeVisible();
  });
});

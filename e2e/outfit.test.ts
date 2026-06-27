import { test, expect } from "@playwright/test";

test.describe("Outfit", () => {
  test("shows all four body zones with clothing items", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Madrid");
    await expect(page.getByText("Spain")).toBeVisible({ timeout: 5000 });
    await page.getByText("Spain").first().click();
    await expect(page.getByText("Head", { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText("Upper body")).toBeVisible();
    await expect(page.getByText("Lower body")).toBeVisible();
    await expect(page.getByText("Feet", { exact: true })).toBeVisible();
  });
});

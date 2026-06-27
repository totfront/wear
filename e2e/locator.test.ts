import { test, expect } from "@playwright/test";

test.describe("Locator", () => {
  test("shows location button and search input", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /use my location/i })).toBeVisible();
    await expect(page.getByLabel("Search for a city")).toBeVisible();
  });

  test("searches for a city and shows results", async ({ page }) => {
    await page.goto("/");
    await page.getByLabel("Search for a city").fill("London");
    await expect(page.getByText("United Kingdom")).toBeVisible({ timeout: 5000 });
  });

  test("selecting a city loads weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("London");
    await page.getByText("United Kingdom").first().click();
    await expect(page.getByText("London")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/% rain/)).toBeVisible();
  });
});

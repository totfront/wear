import { test, expect } from "./fixtures";

test.describe("WeatherContext", () => {
  test("shows temperature, place name, and meta after city selection", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Berlin");
    await expect(page.getByText("Germany")).toBeVisible({ timeout: 10000 });
    await page.getByText("Germany").first().click();
    await expect(page.getByText("Berlin")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/feels \d+°/)).toBeVisible();
    await expect(page.getByText(/% rain/)).toBeVisible();
    await expect(page.getByText(/% humidity/)).toBeVisible();
    await expect(page.getByText(/UV \d/)).toBeVisible();
  });
});

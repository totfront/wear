import { test, expect } from "@playwright/test";

test.describe("Verdict", () => {
  test("shows a summary sentence after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Paris");
    await expect(page.getByText("France")).toBeVisible({ timeout: 10000 });
    await page.getByText("France").first().click();
    await expect(
      page.getByText(/(Hot|Warm|Mild|Cool|Chilly|Cold|Freezing)/)
    ).toBeVisible({ timeout: 15000 });
  });
});

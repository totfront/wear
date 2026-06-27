import { test, expect } from "@playwright/test";

test.describe("Verdict", () => {
  test("shows a summary sentence after loading weather", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Paris");
    await page.getByText("France").first().click();
    await expect(page.getByText(/— .+\./)).toBeVisible({ timeout: 10000 });
  });
});

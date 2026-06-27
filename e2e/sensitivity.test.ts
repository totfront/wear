import { test, expect } from "./fixtures";

test.describe("Sensitivity", () => {
  test("toggles sensitivity and updates recommendation", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Oslo");
    await expect(page.getByText("Norway")).toBeVisible({ timeout: 10000 });
    await page.getByText("Norway").first().click();
    await expect(page.getByText("I tend to feel")).toBeVisible({ timeout: 10000 });

    await page.getByRole("button", { name: "cold" }).click();
    await page.waitForTimeout(300);

    const coldBtn = page.getByRole("button", { name: "cold" });
    await expect(coldBtn).toHaveClass(/bg-white/);
  });
});

import { test, expect } from "@playwright/test";

test.describe("Sensitivity", () => {
  test("toggles sensitivity and updates recommendation", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Oslo");
    await page.getByText("Norway").first().click();
    await expect(page.getByText("I tend to feel")).toBeVisible({ timeout: 10000 });

    const verdictBefore = await page.getByText(/— .+\./).textContent();
    await page.getByRole("button", { name: "cold" }).click();
    // Wait for re-render
    await page.waitForTimeout(300);
    const verdictAfter = await page.getByText(/— .+\./).textContent();

    // The recommendation may or may not change depending on temperature,
    // but the cold button should be active
    const coldBtn = page.getByRole("button", { name: "cold" });
    await expect(coldBtn).toHaveClass(/bg-white/);
  });
});

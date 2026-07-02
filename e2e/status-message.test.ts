import { test, expect } from "./fixtures";

test.describe("StatusMessage", () => {
  test("shows idle message when no location is set", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await expect(
      page.getByText("Tell me where you are and I'll tell you what to wear."),
    ).toBeVisible();
  });

  test("shows loading state while fetching", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    // Slow down the weather response so the loading state is catchable
    await page.route("**/api.open-meteo.com/**", async (route) => {
      await new Promise((r) => setTimeout(r, 300));
      await route.continue();
    });
    await page.getByLabel("Search for a city").fill("Tokyo");
    await expect(page.getByText("Japan").first()).toBeVisible({ timeout: 10000 });
    await page.getByText("Japan").first().click();
    await expect(page.getByText("Reading the sky…")).toBeVisible();
  });
});

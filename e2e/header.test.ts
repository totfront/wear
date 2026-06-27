import { test, expect } from "./fixtures";

test.describe("Header", () => {
  test("renders wordmark and tagline", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toContainText("wear");
    await expect(page.getByText("what to actually put on")).toBeVisible();
  });
});

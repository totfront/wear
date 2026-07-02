import { test, expect } from "./fixtures";

test.describe("URL sharing", () => {
  test("updates URL with lat/lon/name after city selection", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Berlin");
    await expect(page.getByText("Germany")).toBeVisible({ timeout: 10000 });
    await page.getByText("Germany").first().click();
    await expect(page.getByText("Berlin")).toBeVisible({ timeout: 10000 });

    const url = new URL(page.url());
    expect(url.searchParams.get("lat")).not.toBeNull();
    expect(url.searchParams.get("lon")).not.toBeNull();
    expect(url.searchParams.get("name")).toContain("Berlin");
  });

  test("loads location automatically from URL params", async ({ page }) => {
    await page.goto("/?lat=52.52&lon=13.41&name=Berlin%2C+Germany");
    await expect(page.getByText("Berlin")).toBeVisible({ timeout: 10000 });
    await expect(page.getByText(/°C/)).toBeVisible();
  });
});

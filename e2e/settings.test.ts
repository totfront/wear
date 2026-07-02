import { test, expect } from "./fixtures";

test.describe("Settings", () => {
  test("toggles temperature unit between °C and °F", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Berlin");
    await expect(page.getByText("Germany")).toBeVisible({ timeout: 10000 });
    await page.getByText("Germany").first().click();
    await expect(page.getByText(/°C/)).toBeVisible({ timeout: 10000 });

    // Open settings and switch to °F
    await page.getByLabel("Settings").click();
    await page.getByRole("button", { name: "°F" }).click();
    await page.keyboard.press("Escape");

    await expect(page.getByText(/feels \d+°F/)).toBeVisible();
    await expect(page.getByText(/feels \d+°C/)).not.toBeVisible();
  });

  test("persists temperature unit preference after reload", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("wear:temp-unit", "F");
      localStorage.setItem("wear:last-location", JSON.stringify({ lat: 52.52, lon: 13.41, name: "Berlin, Germany" }));
    });
    await page.reload();
    await expect(page.getByText(/°F/)).toBeVisible({ timeout: 10000 });
  });
});

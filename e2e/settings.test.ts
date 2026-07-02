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

  test("hide location picker toggle shows/hides locator after weather loads", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("wear:last-location", JSON.stringify({ lat: 52.52, lon: 13.41, name: "Berlin, Germany" }));
    });
    await page.reload();
    await expect(page.getByText("Berlin, Germany")).toBeVisible({ timeout: 10000 });

    // Locator hidden by default when weather is loaded
    await expect(page.getByLabel("Search for a city")).not.toBeVisible();

    // Turn off "Hide location picker" → locator should appear
    await page.getByLabel("Settings").click();
    await page.locator("button[style]").nth(0).click();
    await page.locator("button:has(line)").click();
    await expect(page.locator("h2", { hasText: "Settings" })).not.toBeVisible();
    await expect(page.getByLabel("Search for a city")).toBeVisible();

    // Turn it back on → locator should hide again
    await page.getByLabel("Settings").click();
    await page.locator("button[style]").nth(0).click();
    await page.locator("button:has(line)").click();
    await expect(page.locator("h2", { hasText: "Settings" })).not.toBeVisible();
    await expect(page.getByLabel("Search for a city")).not.toBeVisible();
  });

  test("persists hide location picker preference after reload", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("wear:hide-location", "false");
      localStorage.setItem("wear:last-location", JSON.stringify({ lat: 52.52, lon: 13.41, name: "Berlin, Germany" }));
    });
    await page.reload();
    await expect(page.getByText("Berlin, Germany")).toBeVisible({ timeout: 10000 });
    await expect(page.getByLabel("Search for a city")).toBeVisible();
  });

  test("persists sensitivity preference after reload", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => {
      localStorage.clear();
      localStorage.setItem("wear:sensitivity", "cold");
      localStorage.setItem("wear:last-location", JSON.stringify({ lat: 52.52, lon: 13.41, name: "Berlin, Germany" }));
    });
    await page.reload();
    await expect(page.getByText("Berlin, Germany")).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole("button", { name: "Cold" })).toHaveClass(/accent|bg-\[var/);
  });

  test("prioritize feels like swaps primary temperature display", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.getByLabel("Search for a city").fill("Berlin");
    await expect(page.getByText("Germany")).toBeVisible({ timeout: 10000 });
    await page.getByText("Germany").first().click();
    await expect(page.getByText(/actual \d+°C/)).not.toBeVisible({ timeout: 10000 });

    await page.getByLabel("Settings").click();
    await page.locator("button[style]").nth(1).click();
    await page.locator("button:has(line)").click();

    await expect(page.locator("span", { hasText: /actual \d+°/ })).toBeVisible();
  });
});

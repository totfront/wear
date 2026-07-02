import { test as base, expect } from "@playwright/test";

const MOCK_SEARCH_RESULTS: Record<string, object> = {
  London: {
    results: [
      { name: "London", admin1: "England", country: "United Kingdom", latitude: 51.5, longitude: -0.12 },
    ],
  },
  Paris: {
    results: [
      { name: "Paris", admin1: "Île-de-France Region", country: "France", latitude: 48.85, longitude: 2.35 },
    ],
  },
  Berlin: {
    results: [
      { name: "Berlin", admin1: "Berlin", country: "Germany", latitude: 52.52, longitude: 13.41 },
    ],
  },
  Madrid: {
    results: [
      { name: "Madrid", admin1: "Madrid", country: "Spain", latitude: 40.42, longitude: -3.7 },
    ],
  },
  Oslo: {
    results: [
      { name: "Oslo", admin1: "Oslo", country: "Norway", latitude: 59.91, longitude: 10.75 },
    ],
  },
  Tokyo: {
    results: [
      { name: "Tokyo", admin1: "Tokyo", country: "Japan", latitude: 35.68, longitude: 139.69 },
    ],
  },
  Rome: {
    results: [
      { name: "Rome", admin1: "Lazio", country: "Italy", latitude: 41.89, longitude: 12.51 },
    ],
  },
  Sydney: {
    results: [
      { name: "Sydney", admin1: "New South Wales", country: "Australia", latitude: -33.87, longitude: 151.21 },
    ],
  },
};

const MOCK_WEATHER = {
  current: {
    temperature_2m: 22,
    apparent_temperature: 24,
    relative_humidity_2m: 55,
    uv_index: 5,
    wind_speed_10m: 12,
    weather_code: 1,
    is_day: 1,
  },
  daily: {
    precipitation_probability_max: [40],
  },
  hourly: {
    temperature_2m: Array(24).fill(22).map((v, i) => v + i * 0.3),   // peaks at ~28
    relative_humidity_2m: Array(24).fill(55).map((v, i) => v + i),    // peaks at ~78
  },
};

export const test = base.extend({
  page: async ({ page }, use) => {
    await page.route("**/geocoding-api.open-meteo.com/**", async (route) => {
      const url = new URL(route.request().url());
      const query = url.searchParams.get("name") ?? "";
      const match = Object.entries(MOCK_SEARCH_RESULTS).find(([key]) =>
        key.toLowerCase().startsWith(query.toLowerCase()),
      );
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(match ? match[1] : { results: [] }),
      });
    });

    await page.route("**/api.open-meteo.com/**", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(MOCK_WEATHER),
      });
    });

    await use(page);
  },
});

export { expect };

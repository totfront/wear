# wear.

**Open the app → see what to wear → close the app.** No graphs, no hourly breakdowns, no ads. Just the answer to "what do I put on today?"

👉 **[wear.vercel.app](https://wear.vercel.app)**

## What it does

- Picks clothing head-to-feet based on the actual temperature
- Tells you whether to grab an umbrella (or not)
- Adjusts if you tend to run cold or warm
- Remembers your last city so next time it loads instantly
- Works as a PWA — add to home screen on iOS/Android

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
npx playwright test  # 12 e2e tests
```

## Stack

React · Vite · Tailwind v4 · TypeScript · Open-Meteo API (no key needed) · Playwright · Vercel

## How it works

The recommendation engine is a pure function in `src/recommend/` — no React, no DOM. It picks a "band" by temperature and returns clothing for each body zone. The UI just renders what the engine returns.

To tweak recommendations, edit `src/recommend/bands.ts` — temperature thresholds, clothing items, everything is in one table.

## License

Open-Meteo data is CC BY 4.0. Free for non-commercial use.

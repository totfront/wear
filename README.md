# wear · what to actually put on

A weather app that tells you what to wear, not just the temperature. Picks a
clothing band by air temperature, overlays an umbrella when it's raining and
sunglasses when UV is high, and adjusts for whether you run cold or warm.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Geolocation needs `localhost` or HTTPS to work (browser rule) — `npm run dev`
serves localhost, so you're fine. "Use my location" prompts for permission;
city search works without it.

```bash
npm run build    # production bundle in dist/
npm run preview  # serve the built bundle
```

## How it's structured (and why)

Three layers, deliberately separated so the native wrap later is painless:

- `src/recommend/` — pure logic, no DOM, no network. `bands.ts` is the table
  you tune; `recommend.ts` is the function that reads it. The whole "brain,"
  no React in it. Moves to native untouched.
- `src/data/weather.ts` — Open-Meteo calls. No API key, CORS-enabled, fully
  client-side. Also moves to native untouched.
- `src/App.tsx` + `src/ui/` — the React UI. Only this layer gets re-wrapped.

## Tuning the recommendations

Everything you'll want to change lives in **`src/recommend/bands.ts`**. Each
band is a plain object: a temperature floor, a name, and the clothing for each
of head / upper / lower / feet. Multiple items in a zone render as "X or Y".
Edit numbers, edit clothes, add or remove bands — no other code changes.

Thresholds live in `src/recommend/recommend.ts`:
- `RAIN_THRESHOLD` (default 40%) — when to suggest an umbrella
- `UV_THRESHOLD` (default 6) — when to suggest sunglasses
- `SENSITIVITY_SHIFT` — how many degrees the cold/warm toggle moves you

## The v2 hook (wardrobe / paywall)

Clothing items are stored as `{ category, label }`, not plain strings. v1 shows
the `label`. v2's wardrobe feature matches uploaded items to the `category`
("tshirt", "beanie", …) and swaps in your actual garment. The engine doesn't
change — only the renderer gets richer. That's why the data shape is what it is.

## Native wrap (when ready)

Plain Vite SPA, so Capacitor is the path:

```bash
npm install @capacitor/core @capacitor/cli
npx cap init && npm run build
npx cap add ios && npx cap add android && npx cap copy
```

`recommend/` and `data/` carry over with zero changes. Swap browser geolocation
for `@capacitor/geolocation` in `data/weather.ts` and you're done.

## Open-Meteo licensing

Free for non-commercial use (CC BY 4.0). When the paywall ships, you'll need
their commercial tier or another provider for paid features.

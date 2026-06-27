// ============================================================================
// recommend() — pure function, no DOM, no fetch. This is what moves to native
// untouched. Picks a band by temperature, applies a few simple overlays.
// ============================================================================

import { BANDS, type Band, type Item, type Zone } from './bands';

export type Sensitivity = 'cold' | 'normal' | 'warm';

export interface WeatherInput {
  /** Actual air temperature in °C (we band off this, per the spec). */
  temperature: number;
  /** Probability of precipitation 0–100. */
  precipProbability: number;
  /** UV index, used only to nudge sunglasses/cap. */
  uvIndex: number;
}

export interface Accessory {
  key: string;
  label: string;
}

export interface Recommendation {
  band: Band;
  /** One-line summary sentence for the top of the screen. */
  summary: string;
  zones: Record<Zone, Item[]>;
  accessories: Accessory[];
}

// "Cold" people want to dress as if it's colder → shift temp down so they land
// in a warmer band. "Warm" people the opposite. A couple degrees each way.
const SENSITIVITY_SHIFT: Record<Sensitivity, number> = {
  cold: -3,
  normal: 0,
  warm: 3,
};

const RAIN_THRESHOLD = 40; // % chance at or above which we call it "rain"
const UV_THRESHOLD = 6; // UV index at or above which sun protection matters

export function pickBand(temp: number): Band {
  // BANDS is ordered high → low; first band whose floor we clear wins.
  return BANDS.find((b) => temp >= b.minTemp) ?? BANDS[BANDS.length - 1];
}

export function recommend(
  weather: WeatherInput,
  sensitivity: Sensitivity = 'normal'
): Recommendation {
  const adjustedTemp = weather.temperature + SENSITIVITY_SHIFT[sensitivity];
  const band = pickBand(adjustedTemp);

  // Treat it as rain (umbrella-worthy) only above freezing; below that it's
  // snow, and an umbrella isn't the answer.
  const raining = weather.precipProbability >= RAIN_THRESHOLD && weather.temperature > 1;
  const sunny = weather.uvIndex >= UV_THRESHOLD;

  const accessories: Accessory[] = [];
  if (raining) accessories.push({ key: 'umbrella', label: 'Umbrella' });
  if (sunny) accessories.push({ key: 'sunglasses', label: 'Sunglasses' });

  // Build the summary sentence.
  let summary = `${band.name} — ${band.blurb}`;
  if (raining) summary += ', and grab an umbrella';

  return {
    band,
    summary,
    zones: {
      head: band.head,
      upper: band.upper,
      lower: band.lower,
      feet: band.feet,
    },
    accessories,
  };
}

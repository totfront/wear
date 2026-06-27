// ============================================================================
// THE BAND TABLE — this is the part you tune.
//
// Each band is picked by actual air temperature (°C). Within a band, each body
// zone lists clothing as either/or options. Rendering shows them joined by "or".
//
// Items are stored as { category, label } objects, not plain strings, so the
// future wardrobe feature can match your real items to a `category` while v1
// just shows the `label`. Cost today: zero. It still renders as the label.
// ============================================================================

export type Zone = 'head' | 'upper' | 'lower' | 'feet';

export interface Item {
  /** Stable key for future wardrobe matching, e.g. "tshirt", "beanie". */
  category: string;
  /** What v1 displays, e.g. "T-shirt". */
  label: string;
}

export interface Band {
  /** Inclusive lower bound in °C. The band runs until the next band's min. */
  minTemp: number;
  /** Short name shown in the summary, e.g. "Hot". */
  name: string;
  /** One-line vibe used in the summary sentence. */
  blurb: string;
  head: Item[];
  upper: Item[];
  lower: Item[];
  feet: Item[];
}

const item = (category: string, label: string): Item => ({ category, label });

// Ordered high → low. pickBand() walks until temp >= minTemp.
export const BANDS: Band[] = [
  {
    minTemp: 30,
    name: 'Hot',
    blurb: 'Stay cool, cover up from the sun',
    head: [item('cap', 'Cap'), item('no_cap', 'No cap')],
    upper: [item('tshirt', 'T-shirt'), item('tank', 'Tank top')],
    lower: [item('shorts', 'Shorts'), item('light_pants', 'Light pants')],
    feet: [item('sneakers_light', 'Light sneakers'), item('sandals', 'Sandals')],
  },
  {
    minTemp: 25,
    name: 'Warm',
    blurb: 'Light and breezy',
    head: [item('cap', 'Cap'), item('no_cap', 'No cap')],
    upper: [item('tshirt', 'T-shirt'), item('shirt_short', 'Short-sleeve shirt')],
    lower: [item('shorts', 'Shorts'), item('light_pants', 'Light pants')],
    feet: [item('sneakers_light', 'Light sneakers'), item('sandals', 'Sandals')],
  },
  {
    minTemp: 20,
    name: 'Mild',
    blurb: 'Comfortable, maybe a light layer',
    head: [item('no_hat', 'No hat')],
    upper: [item('tshirt', 'T-shirt'), item('long_sleeve', 'Long-sleeve top')],
    lower: [item('light_pants', 'Light pants'), item('jeans', 'Jeans')],
    feet: [item('sneakers', 'Sneakers')],
  },
  {
    minTemp: 14,
    name: 'Cool',
    blurb: 'A light jacket weather',
    head: [item('no_hat', 'No hat')],
    upper: [item('long_sleeve', 'Long-sleeve top'), item('light_jacket', 'Light jacket')],
    lower: [item('jeans', 'Jeans'), item('trousers', 'Trousers')],
    feet: [item('sneakers', 'Sneakers')],
  },
  {
    minTemp: 8,
    name: 'Chilly',
    blurb: 'Layer up, bring a jacket',
    head: [item('no_hat', 'No hat'), item('light_beanie', 'Light beanie')],
    upper: [item('sweater', 'Sweater'), item('jacket', 'Jacket')],
    lower: [item('jeans', 'Jeans'), item('trousers', 'Trousers')],
    feet: [item('sneakers', 'Sneakers'), item('boots', 'Boots')],
  },
  {
    minTemp: 2,
    name: 'Cold',
    blurb: 'Warm coat and a hat',
    head: [item('beanie', 'Beanie')],
    upper: [item('coat', 'Warm coat'), item('sweater_coat', 'Sweater + coat')],
    lower: [item('trousers', 'Warm trousers'), item('thermal_jeans', 'Jeans + thermals')],
    feet: [item('boots', 'Boots')],
  },
  {
    minTemp: -100,
    name: 'Freezing',
    blurb: 'Full winter gear, cover everything',
    head: [item('beanie', 'Beanie')],
    upper: [item('heavy_coat', 'Heavy winter coat'), item('layers', 'Thermal layers + coat')],
    lower: [item('thermal_trousers', 'Thermal trousers')],
    feet: [item('winter_boots', 'Insulated boots')],
  },
];

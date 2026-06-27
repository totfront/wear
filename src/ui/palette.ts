// Each band name maps to a sky gradient + accent. Keyed by Band.name.
export interface Palette {
  skyTop: string;
  skyBottom: string;
  accent: string;
}

export const BAND_PALETTES: Record<string, Palette> = {
  Hot: { skyTop: '#ffd79a', skyBottom: '#ffeede', accent: '#d4612a' },
  Warm: { skyTop: '#ffe6b0', skyBottom: '#fbf4e6', accent: '#d08a2e' },
  Mild: { skyTop: '#d6ecc9', skyBottom: '#f0f4ea', accent: '#5a8f4e' },
  Cool: { skyTop: '#cfe3ef', skyBottom: '#eef3f0', accent: '#3f7fa0' },
  Chilly: { skyTop: '#c4d4e6', skyBottom: '#eaeef3', accent: '#4a6b94' },
  Cold: { skyTop: '#b9c5db', skyBottom: '#e6e9f0', accent: '#465a82' },
  Freezing: { skyTop: '#c3cfe0', skyBottom: '#eef1f6', accent: '#3a4a6b' },
};

export function paletteFor(bandName: string): Palette {
  return BAND_PALETTES[bandName] ?? BAND_PALETTES.Cool;
}

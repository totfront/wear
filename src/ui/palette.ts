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

export const BAND_PALETTES_DARK: Record<string, Palette> = {
  Hot: { skyTop: '#2d1f0e', skyBottom: '#1a1510', accent: '#e07840' },
  Warm: { skyTop: '#2a1f0d', skyBottom: '#1a1610', accent: '#d4962e' },
  Mild: { skyTop: '#1a2516', skyBottom: '#121810', accent: '#6aad5a' },
  Cool: { skyTop: '#162230', skyBottom: '#101820', accent: '#5a9ec0' },
  Chilly: { skyTop: '#161e2e', skyBottom: '#101620', accent: '#6080b0' },
  Cold: { skyTop: '#141a28', skyBottom: '#0e1220', accent: '#5a70a0' },
  Freezing: { skyTop: '#151a28', skyBottom: '#0e1220', accent: '#5068a0' },
};

export function isDark(): boolean {
  return document.documentElement.classList.contains('dark');
}

export function paletteFor(bandName: string): Palette {
  const palettes = isDark() ? BAND_PALETTES_DARK : BAND_PALETTES;
  return palettes[bandName] ?? palettes.Cool;
}

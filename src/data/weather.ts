// ============================================================================
// Data layer — Open-Meteo. No API key, CORS-enabled, fully client-side.
// Isolated here so it moves to native (Capacitor) untouched.
// ============================================================================

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  precipProbability: number;
  uvIndex: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  isDay: boolean;
}

export interface Place {
  name: string;
  admin?: string;
  country: string;
  latitude: number;
  longitude: number;
}

const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast';
const GEOCODE_URL = 'https://geocoding-api.open-meteo.com/v1/search';

export async function fetchWeather(lat: number, lon: number): Promise<CurrentWeather> {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current: [
      'temperature_2m',
      'apparent_temperature',
      'relative_humidity_2m',
      'precipitation_probability',
      'uv_index',
      'wind_speed_10m',
      'weather_code',
      'is_day',
    ].join(','),
    timezone: 'auto',
  });

  const res = await fetch(`${FORECAST_URL}?${params}`);
  if (!res.ok) throw new Error(`Weather request failed (${res.status})`);
  const data = await res.json();
  const c = data.current;

  return {
    temperature: c.temperature_2m,
    apparentTemperature: c.apparent_temperature,
    precipProbability: c.precipitation_probability ?? 0,
    uvIndex: c.uv_index ?? 0,
    humidity: c.relative_humidity_2m,
    windSpeed: c.wind_speed_10m,
    weatherCode: c.weather_code,
    isDay: c.is_day === 1,
  };
}

export async function searchCity(query: string): Promise<Place[]> {
  if (!query.trim()) return [];
  const params = new URLSearchParams({
    name: query,
    count: '5',
    language: 'en',
    format: 'json',
  });

  const res = await fetch(`${GEOCODE_URL}?${params}`);
  if (!res.ok) throw new Error(`City search failed (${res.status})`);
  const data = await res.json();

  return (data.results ?? []).map((r: any) => ({
    name: r.name,
    admin: r.admin1,
    country: r.country,
    latitude: r.latitude,
    longitude: r.longitude,
  }));
}

export function getBrowserLocation(): Promise<{ lat: number; lon: number }> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (err) => reject(err),
      { timeout: 10000, maximumAge: 300000 }
    );
  });
}

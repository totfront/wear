import { useEffect, useState, useCallback } from 'react';
import {
  fetchWeather,
  searchCity,
  getBrowserLocation,
  type CurrentWeather,
  type Place,
} from './data/weather';
import { recommend, type Sensitivity } from './recommend/recommend';
import { paletteFor } from './ui/palette';
import {
  HeadIcon,
  UpperIcon,
  LowerIcon,
  FeetIcon,
  UmbrellaIcon,
  SunglassesIcon,
} from './ui/icons';
import './App.css';

type Status = 'idle' | 'locating' | 'loading' | 'ready' | 'error';

const ZONE_META = [
  { key: 'head', label: 'Head', Icon: HeadIcon },
  { key: 'upper', label: 'Upper body', Icon: UpperIcon },
  { key: 'lower', label: 'Lower body', Icon: LowerIcon },
  { key: 'feet', label: 'Feet', Icon: FeetIcon },
] as const;

export default function App() {
  const [status, setStatus] = useState<Status>('idle');
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [placeName, setPlaceName] = useState<string>('');
  const [sensitivity, setSensitivity] = useState<Sensitivity>('normal');
  const [error, setError] = useState<string>('');

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);

  const loadWeather = useCallback(async (lat: number, lon: number, name: string) => {
    setStatus('loading');
    setError('');
    try {
      const w = await fetchWeather(lat, lon);
      setWeather(w);
      setPlaceName(name);
      setStatus('ready');
    } catch {
      setError('Could not load the weather. Check your connection and try again.');
      setStatus('error');
    }
  }, []);

  const useMyLocation = useCallback(async () => {
    setStatus('locating');
    setError('');
    try {
      const { lat, lon } = await getBrowserLocation();
      await loadWeather(lat, lon, 'Your location');
    } catch {
      setError('Location is off. Search for a city instead.');
      setStatus('error');
    }
  }, [loadWeather]);

  useEffect(() => {
    if (!weather) return;
    const rec = recommend(
      {
        temperature: weather.temperature,
        precipProbability: weather.precipProbability,
        uvIndex: weather.uvIndex,
      },
      sensitivity
    );
    const p = paletteFor(rec.band.name);
    document.body.style.setProperty('--sky-top', p.skyTop);
    document.body.style.setProperty('--sky-bottom', p.skyBottom);
    document.body.style.setProperty('--accent', p.accent);
  }, [weather, sensitivity]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    const t = setTimeout(async () => {
      try {
        setResults(await searchCity(query));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  const rec = weather
    ? recommend(
        {
          temperature: weather.temperature,
          precipProbability: weather.precipProbability,
          uvIndex: weather.uvIndex,
        },
        sensitivity
      )
    : null;

  return (
    <main>
      <header className="masthead">
        <h1 className="wordmark">wear<span>.</span></h1>
        <p className="tagline">what to actually put on</p>
      </header>

      <section className="locator">
        <button className="loc-btn" onClick={useMyLocation}>
          <LocationDot /> Use my location
        </button>
        <div className="search-wrap">
          <input
            className="search"
            type="text"
            placeholder="or search a city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a city"
          />
          {(results.length > 0 || searching) && query.trim() && (
            <ul className="results">
              {searching && <li className="result-hint">Searching…</li>}
              {results.map((r, i) => (
                <li key={i}>
                  <button
                    onClick={() => {
                      const label = [r.name, r.country].filter(Boolean).join(', ');
                      loadWeather(r.latitude, r.longitude, label);
                      setQuery('');
                      setResults([]);
                    }}
                  >
                    <span className="result-name">{r.name}</span>
                    <span className="result-sub">
                      {[r.admin, r.country].filter(Boolean).join(', ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {status === 'idle' && (
        <div className="empty">
          <p>Tell me where you are and I'll tell you what to wear.</p>
        </div>
      )}

      {(status === 'locating' || status === 'loading') && (
        <div className="empty">
          <p className="pulse">
            {status === 'locating' ? 'Finding you…' : 'Reading the sky…'}
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="empty error">
          <p>{error}</p>
        </div>
      )}

      {status === 'ready' && weather && rec && (
        <>
          <section className="conditions">
            <div className="place">{placeName}</div>
            <div className="meta">
              {weather.precipProbability}% rain · {weather.humidity}% humidity · UV{' '}
              {Math.round(weather.uvIndex)}
            </div>
          </section>

          <section className="verdict">
            <p>{rec.summary}.</p>
          </section>

          <section className="umbrella-banner">
            <UmbrellaIcon />
            <span>
              {weather.precipProbability >= 60
                ? 'You MUST HAVE an umbrella'
                : weather.precipProbability >= 30
                  ? 'You SHOULD TAKE an umbrella'
                  : 'You DO NOT NEED an umbrella'}
            </span>
          </section>

          <section className="outfit">
            {ZONE_META.map(({ key, label, Icon }) => (
              <div className="zone" key={key}>
                <div className="zone-icon">
                  <Icon />
                </div>
                <div className="zone-body">
                  <div className="zone-label">{label}</div>
                  <div className="zone-items">
                    {rec.zones[key].map((it, i) => (
                      <span key={it.category}>
                        {i > 0 && <span className="or">or</span>}
                        <span className="item">{it.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          <section className="conditions conditions-bottom">
            <div className="temp">
              {Math.round(weather.temperature)}°
              <span className="feels">
                feels {Math.round(weather.apparentTemperature)}°
              </span>
            </div>
          </section>

          <section className="sensitivity">
            <span className="sens-label">I tend to feel</span>
            <div className="sens-toggle" role="group" aria-label="Temperature sensitivity">
              {(['cold', 'normal', 'warm'] as const).map((s) => (
                <button
                  key={s}
                  className={sensitivity === s ? 'active' : ''}
                  onClick={() => setSensitivity(s)}
                >
                  {s === 'normal' ? 'average' : s}
                </button>
              ))}
            </div>
          </section>

          {rec.accessories.length > 0 && (
            <section className="accessories">
              {rec.accessories.map((a) => (
                <div className="acc" key={a.key}>
                  {a.key === 'umbrella' ? <UmbrellaIcon /> : <SunglassesIcon />}
                  <span>{a.label}</span>
                </div>
              ))}
            </section>
          )}

          <section className="teaser">
            <p>
              Soon: upload your wardrobe and get your <em>actual</em> outfit, not just
              the category.
            </p>
          </section>
        </>
      )}
    </main>
  );
}

function LocationDot() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

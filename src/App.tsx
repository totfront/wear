import { useEffect, useState, useCallback } from "react";
import {
  fetchWeather,
  searchCity,
  getBrowserLocation,
  type CurrentWeather,
  type Place,
} from "./data/weather";
import { recommend, type Sensitivity } from "./recommend/recommend";
import { paletteFor } from "./ui/palette";
import {
  HeadIcon,
  UpperIcon,
  LowerIcon,
  FeetIcon,
  UmbrellaIcon,
} from "./ui/icons";
import "./App.css";

type Status = "idle" | "locating" | "loading" | "ready" | "error";

const ZONE_META = [
  { key: "head", label: "Head", Icon: HeadIcon },
  { key: "upper", label: "Upper body", Icon: UpperIcon },
  { key: "lower", label: "Lower body", Icon: LowerIcon },
  { key: "feet", label: "Feet", Icon: FeetIcon },
] as const;

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("normal");
  const [error, setError] = useState<string>("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);

  const loadWeather = useCallback(
    async (lat: number, lon: number, name: string) => {
      setStatus("loading");
      setError("");
      try {
        const w = await fetchWeather(lat, lon);
        setWeather(w);
        setPlaceName(name);
        setStatus("ready");
      } catch {
        setError(
          "Could not load the weather. Check your connection and try again.",
        );
        setStatus("error");
      }
    },
    [],
  );

  const useMyLocation = useCallback(async () => {
    setStatus("locating");
    setError("");
    try {
      const { lat, lon } = await getBrowserLocation();
      await loadWeather(lat, lon, "Your location");
    } catch {
      setError("Location is off. Search for a city instead.");
      setStatus("error");
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
      sensitivity,
    );
    const p = paletteFor(rec.band.name);
    document.body.style.setProperty("--sky-top", p.skyTop);
    document.body.style.setProperty("--sky-bottom", p.skyBottom);
    document.body.style.setProperty("--accent", p.accent);
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
        sensitivity,
      )
    : null;

  const isRecommendationReady = status === "ready" && weather && rec;

  return (
    <main>
      <header className="text-center mb-[22px]">
        <h1 className="font-[var(--font-display)] font-semibold text-[2.6rem] tracking-[-0.02em] leading-none text-[var(--ink)]">
          wear
          <span className="text-[var(--accent)] transition-colors duration-[1200ms] ease-in-out">
            .
          </span>
        </h1>
        <p className="text-[0.82rem] text-[var(--ink-soft)] tracking-[0.04em] mt-1">
          what to actually put on
        </p>
      </header>

      {/* 1. Locator — the only action */}
      <section className="flex flex-col gap-2.5 mb-[22px]">
        <button
          className="inline-flex items-center justify-center gap-2 w-full p-[13px] border-none rounded-[14px] bg-[var(--accent)] text-white font-[var(--font-body)] text-[0.95rem] font-semibold cursor-pointer shadow-[var(--shadow)] transition-[filter,transform,background] duration-[180ms,180ms,1200ms] ease-in-out hover:brightness-105 active:scale-[0.985] focus-visible:outline-3 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
          onClick={useMyLocation}
        >
          <LocationDot /> Use my location
        </button>
        <div className="relative">
          <input
            className="w-full px-3.5 py-3 border border-[var(--card-line)] rounded-[14px] bg-[var(--card)] font-[var(--font-body)] text-[0.95rem] text-[var(--ink)] backdrop-blur-[8px] placeholder:text-[var(--ink-faint)] focus-visible:outline-3 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-1"
            type="text"
            placeholder="or search a city…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search for a city"
          />
          {(results.length > 0 || searching) && query.trim() && (
            <ul className="list-none absolute top-[calc(100%+6px)] left-0 right-0 bg-white/96 backdrop-blur-[12px] border border-[var(--card-line)] rounded-[14px] shadow-[var(--shadow)] overflow-hidden z-10">
              {searching && (
                <li className="px-3.5 py-[11px] text-[0.85rem] text-[var(--ink-faint)]">
                  Searching…
                </li>
              )}
              {results.map((r, i) => (
                <li key={i}>
                  <button
                    className="flex flex-col w-full text-left px-3.5 py-[11px] border-none bg-transparent cursor-pointer font-[var(--font-body)] hover:bg-[rgba(28,26,23,0.05)]"
                    onClick={() => {
                      const label = [r.name, r.country]
                        .filter(Boolean)
                        .join(", ");
                      loadWeather(r.latitude, r.longitude, label);
                      setQuery("");
                      setResults([]);
                    }}
                  >
                    <span className="text-[0.92rem] font-semibold text-[var(--ink)]">
                      {r.name}
                    </span>
                    <span className="text-[0.76rem] text-[var(--ink-faint)] mt-px">
                      {[r.admin, r.country].filter(Boolean).join(", ")}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {status === "idle" && (
        <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
          <p>Tell me where you are and I'll tell you what to wear.</p>
        </div>
      )}

      {(status === "locating" || status === "loading") && (
        <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
          <p className="pulse">
            {status === "locating" ? "Finding you…" : "Reading the sky…"}
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center py-12 px-5 text-[#a8453a] text-base leading-normal">
          <p>{error}</p>
        </div>
      )}

      {isRecommendationReady && (
        <>
          {/* 2. Context — place + temperature */}
          <section className="text-center mb-[18px]">
            <div className="font-[var(--font-display)] text-[4rem] font-medium leading-none tracking-[-0.03em] text-[var(--ink)]">
              {Math.round(weather.temperature)}°
              <span className="block font-[var(--font-body)] text-[0.82rem] font-medium text-[var(--ink-soft)] tracking-[0.02em] mt-1.5">
                feels {Math.round(weather.apparentTemperature)}°
              </span>
            </div>
            <div className="text-base font-semibold text-[var(--ink)] mt-2.5">
              {placeName}
            </div>
            <div className="text-[0.78rem] text-[var(--ink-faint)] mt-1">
              {weather.precipProbability}% rain · {weather.humidity}% humidity ·
              UV {Math.round(weather.uvIndex)}
            </div>
          </section>

          {/* 3. Verdict */}
          <section className="bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] px-[22px] py-[18px] mb-[18px] shadow-[var(--shadow)]">
            <p className="font-[var(--font-display)] text-[1.32rem] font-medium leading-[1.32] tracking-[-0.01em] text-[var(--ink)]">
              {rec.summary}.
            </p>
          </section>

          {/* 4. Outfit — the answer */}
          <section className="outfit-thread relative flex flex-col gap-0.5">
            {ZONE_META.map(({ key, label, Icon }) => (
              <div
                className="flex items-center gap-4 px-4 py-3.5 relative"
                key={key}
              >
                <div className="shrink-0 w-[38px] h-[38px] grid place-items-center bg-[var(--card)] border border-[var(--card-line)] rounded-full text-[var(--accent)] shadow-[var(--shadow)] z-[1] transition-colors duration-[1200ms] ease-in-out [&_svg]:w-[21px] [&_svg]:h-[21px]">
                  <Icon />
                </div>
                <div className="flex-1">
                  <div className="text-[0.72rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-[3px]">
                    {label}
                  </div>
                  <div className="text-[1.04rem] text-[var(--ink)] leading-[1.35]">
                    {rec.zones[key].map((it, i) => (
                      <span key={it.category}>
                        {i > 0 && (
                          <span className="text-[0.8rem] text-[var(--ink-faint)] italic mx-[7px]">
                            or
                          </span>
                        )}
                        <span className="font-medium">{it.label}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 5. Umbrella */}
          <section className="flex items-center justify-center gap-2.5 px-5 py-3.5 mt-[18px] mb-[18px] bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] shadow-[var(--shadow)] text-[0.95rem] font-semibold text-[var(--ink)]">
            <span className="text-[var(--accent)] shrink-0 [&_svg]:w-5 [&_svg]:h-5">
              <UmbrellaIcon />
            </span>
            <span>
              {weather.precipProbability >= 60
                ? "You MUST HAVE an umbrella"
                : weather.precipProbability >= 30
                  ? "You SHOULD TAKE an umbrella"
                  : "You DO NOT NEED an umbrella"}
            </span>
          </section>

          {/* 6. Sensitivity — setting, not action */}
          <section className="flex items-center justify-between gap-3 mb-[22px] px-1">
            <span className="text-[0.82rem] text-[var(--ink-soft)] whitespace-nowrap">
              I tend to feel
            </span>
            <div
              className="flex bg-[rgba(28,26,23,0.06)] rounded-[11px] p-[3px]"
              role="group"
              aria-label="Temperature sensitivity"
            >
              {(["cold", "normal", "warm"] as const).map((s) => (
                <button
                  key={s}
                  className={`border-none bg-transparent px-[13px] py-[7px] rounded-lg font-[var(--font-body)] text-[0.82rem] font-medium text-[var(--ink-soft)] cursor-pointer capitalize transition-[background,color] duration-[180ms] ease-in-out focus-visible:outline-2 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-1 ${
                    sensitivity === s
                      ? "bg-white! text-[var(--ink)]! shadow-[0_1px_3px_rgba(28,26,23,0.12)]"
                      : ""
                  }`}
                  onClick={() => setSensitivity(s)}
                >
                  {s === "normal" ? "average" : s}
                </button>
              ))}
            </div>
          </section>

          {/* 7. Teaser */}
          <section className="mt-[34px] px-[18px] py-4 border border-dashed border-[var(--card-line)] rounded-[var(--radius)] text-center">
            <p className="text-[0.84rem] text-[var(--ink-soft)] leading-normal">
              🚧 Soon: upload your wardrobe and get your
              <em className="text-[var(--accent)] italic">actual</em> outfit,
              not just the category. 🚧
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

import { useState, useEffect } from "react";
import { searchCity, type Place } from "../../data/weather";
import { t } from "../../i18n/translations";

interface LocatorProps {
  onUseMyLocation: () => void;
  onSelectCity: (lat: number, lon: number, name: string) => void;
}

export default function Locator({
  onUseMyLocation,
  onSelectCity,
}: LocatorProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Place[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        setResults(await searchCity(query));
      } catch {
        setResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <section className="flex flex-col gap-2.5 mb-[22px]">
      <button
        className="inline-flex items-center justify-center gap-2 w-full p-[13px] border-none rounded-[14px] bg-[var(--accent)] text-white font-[var(--font-body)] text-[0.95rem] font-semibold cursor-pointer shadow-[var(--shadow)] transition-[filter,transform,background] duration-[180ms,180ms,1200ms] ease-in-out hover:brightness-105 active:scale-[0.985] focus-visible:outline-3 focus-visible:outline-[var(--ink)] focus-visible:outline-offset-2"
        onClick={onUseMyLocation}
      >
        <LocationDot /> {t().useMyLocation}
      </button>
      <div className="relative">
        <input
          className="w-full px-3.5 py-3 border border-[var(--card-line)] rounded-[14px] bg-[var(--card)] font-[var(--font-body)] text-[0.95rem] text-[var(--ink)] backdrop-blur-[8px] placeholder:text-[var(--ink-faint)] focus-visible:outline-3 focus-visible:outline-[var(--accent)] focus-visible:outline-offset-1"
          type="text"
          placeholder={t().searchPlaceholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label={t().searchAriaLabel}
        />
        {(results.length > 0 || searching) && query.trim() && (
          <ul className="list-none absolute top-[calc(100%+6px)] left-0 right-0 bg-white/96 backdrop-blur-[12px] border border-[var(--card-line)] rounded-[14px] shadow-[var(--shadow)] overflow-hidden z-10">
            {searching && (
              <li className="px-3.5 py-[11px] text-[0.85rem] text-[var(--ink-faint)]">
                {t().searching}
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
                    onSelectCity(r.latitude, r.longitude, label);
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

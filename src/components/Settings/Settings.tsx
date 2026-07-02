import { useState, useEffect } from "react";
import { type Locale, t, getLocale, setLocale } from "../../i18n/translations";
import { type TempUnit, getTempUnit, setTempUnit } from "../../utils/temperature";

type Theme = "light" | "dark" | "system";

function getStoredTheme(): Theme {
  return (localStorage.getItem("wear:theme") as Theme) || "system";
}

function applyTheme(theme: Theme) {
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", isDark);
}

const LOCALE_LABELS: { key: Locale; flag: string; label: string }[] = [
  { key: "en", flag: "🇬🇧", label: "English" },
  { key: "ru", flag: "🇷🇺", label: "Русский" },
  { key: "de", flag: "🇩🇪", label: "Deutsch" },
  { key: "uk", flag: "🇺🇦", label: "Українська" },
  { key: "lv", flag: "🇱🇻", label: "Latviešu" },
];

interface SettingsProps {
  onLocaleChange: () => void;
  onThemeChange?: () => void;
  onHideLocationChange?: (value: boolean) => void;
  onTempUnitChange?: () => void;
  onFeelsLikePriorityChange?: (value: boolean) => void;
}

export default function Settings({
  onLocaleChange,
  onThemeChange,
  onHideLocationChange,
  onTempUnitChange,
  onFeelsLikePriorityChange,
}: SettingsProps) {
  const [open, setOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState(getLocale());
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredTheme);
  const [currentTempUnit, setCurrentTempUnit] = useState<TempUnit>(getTempUnit);
  const [hideLocation, setHideLocation] = useState(
    () => localStorage.getItem("wear:hide-location") !== "false",
  );
  const [prioritizeFeelsLike, setPrioritizeFeelsLike] = useState(
    () => localStorage.getItem("wear:prioritize-feels-like") === "true",
  );
  const labels = t();

  useEffect(() => {
    applyTheme(currentTheme);
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (currentTheme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [currentTheme]);

  const handleThemeChange = (theme: Theme) => {
    setCurrentTheme(theme);
    localStorage.setItem("wear:theme", theme);
    applyTheme(theme);
    onThemeChange?.();
  };

  const handleLocaleChange = (locale: Locale) => {
    setLocale(locale);
    setCurrentLocale(locale);
    localStorage.setItem("wear:locale", locale);
    onLocaleChange();
  };

  const handleTempUnitChange = (unit: TempUnit) => {
    setTempUnit(unit);
    setCurrentTempUnit(unit);
    onTempUnitChange?.();
  };

  return (
    <>
      <button
        className="fixed top-4 right-4 z-10 w-10 h-10 grid place-items-center rounded-full bg-[var(--card)] border border-[var(--card-line)] shadow-[var(--shadow)] backdrop-blur-[10px] cursor-pointer text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors"
        onClick={() => setOpen(true)}
        aria-label={labels.settings}
      >
        <svg
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
        </svg>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
          <div
            className="fixed w-full max-w-[460px] bg-[var(--card)] backdrop-blur-[16px] border border-[var(--card-line)] rounded-t-[24px] sm:rounded-[24px] shadow-[var(--shadow)] p-6 pb-10 sm:pb-6 animate-in bottom-0 sm:bottom-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-[var(--font-display)] text-lg font-semibold text-[var(--ink)]">
                {labels.settings}
              </h2>
              <button
                className="w-8 h-8 grid place-items-center rounded-full hover:bg-[rgba(28,26,23,0.06)] cursor-pointer border-none bg-transparent text-[var(--ink-soft)]"
                onClick={() => setOpen(false)}
              >
                <svg
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="mb-5">
              <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-2">
                {labels.theme}
              </div>
              <div className="flex gap-2 flex-wrap">
                {[
                  {
                    key: "light" as Theme,
                    label: labels.themeLight,
                    icon: "☀️",
                  },
                  { key: "dark" as Theme, label: labels.themeDark, icon: "🌙" },
                  {
                    key: "system" as Theme,
                    label: labels.themeSystem,
                    icon: "💻",
                  },
                ].map(({ key, label, icon }) => (
                  <button
                    key={key}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[0.88rem] font-medium cursor-pointer transition-all duration-150 ${
                      currentTheme === key
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_1px_3px_rgba(28,26,23,0.12)]"
                        : "bg-transparent text-[var(--ink)] border-[var(--card-line)] hover:bg-[rgba(28,26,23,0.04)]"
                    }`}
                    onClick={() => handleThemeChange(key)}
                  >
                    <span>{icon}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-2">
                {labels.temperatureUnit}
              </div>
              <div className="flex gap-2">
                {(["C", "F"] as TempUnit[]).map((unit) => (
                  <button
                    key={unit}
                    className={`px-4 py-2 rounded-xl border text-[0.88rem] font-medium cursor-pointer transition-all duration-150 ${
                      currentTempUnit === unit
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_1px_3px_rgba(28,26,23,0.12)]"
                        : "bg-transparent text-[var(--ink)] border-[var(--card-line)] hover:bg-[rgba(28,26,23,0.04)]"
                    }`}
                    onClick={() => handleTempUnitChange(unit)}
                  >
                    °{unit}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-2">
                {labels.language}
              </div>
              <div className="flex gap-2 flex-wrap">
                {LOCALE_LABELS.map(({ key, flag, label }) => (
                  <button
                    key={key}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl border text-[0.88rem] font-medium cursor-pointer transition-all duration-150 ${
                      currentLocale === key
                        ? "bg-[var(--accent)] text-white border-[var(--accent)] shadow-[0_1px_3px_rgba(28,26,23,0.12)]"
                        : "bg-transparent text-[var(--ink)] border-[var(--card-line)] hover:bg-[rgba(28,26,23,0.04)]"
                    }`}
                    onClick={() => handleLocaleChange(key)}
                  >
                    <span>{flag}</span>
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-1">
                    {labels.hideLocation}
                  </div>
                  <div className="text-[0.78rem] text-[var(--ink-faint)]">
                    {labels.hideLocationDesc}
                  </div>
                </div>
                <button
                  className="relative ml-4 shrink-0 w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200"
                  style={{
                    background: hideLocation
                      ? "var(--accent)"
                      : "var(--card-line)",
                  }}
                  onClick={() => {
                    const next = !hideLocation;
                    setHideLocation(next);
                    localStorage.setItem("wear:hide-location", String(next));
                    onHideLocationChange?.(next);
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-[left] duration-200"
                    style={{
                      left: hideLocation ? "calc(100% - 22px)" : "2px",
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-1">
                    {labels.prioritizeFeelsLike}
                  </div>
                  <div className="text-[0.78rem] text-[var(--ink-faint)]">
                    {labels.prioritizeFeelsLikeDesc}
                  </div>
                </div>
                <button
                  className="relative ml-4 shrink-0 w-11 h-6 rounded-full border-none cursor-pointer transition-colors duration-200"
                  style={{
                    background: prioritizeFeelsLike
                      ? "var(--accent)"
                      : "var(--card-line)",
                  }}
                  onClick={() => {
                    const next = !prioritizeFeelsLike;
                    setPrioritizeFeelsLike(next);
                    localStorage.setItem("wear:prioritize-feels-like", String(next));
                    onFeelsLikePriorityChange?.(next);
                  }}
                >
                  <div
                    className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-[left] duration-200"
                    style={{
                      left: prioritizeFeelsLike ? "calc(100% - 22px)" : "2px",
                    }}
                  />
                </button>
              </div>
            </div>

            <div className="opacity-40 cursor-default">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[0.78rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-1">
                    🚧 Soon: {labels.detailedMode}
                  </div>
                  <div className="text-[0.78rem] text-[var(--ink-faint)]">
                    {labels.detailedModeDesc}
                  </div>
                </div>
                <div className="relative ml-4 shrink-0">
                  <div className="w-11 h-6 rounded-full bg-[rgba(28,26,23,0.12)]" />
                  <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import type { CurrentWeather } from "../../data/weather";
import { t } from "../../i18n/translations";

interface WeatherContextProps {
  weather: CurrentWeather;
  placeName: string;
  onChangeLocation?: () => void;
}

export default function WeatherContext({
  weather,
  placeName,
  onChangeLocation,
}: WeatherContextProps) {
  return (
    <section className="animate-in text-center mb-[18px]">
      <div className="font-[var(--font-display)] text-[4rem] font-medium leading-none tracking-[-0.03em] text-[var(--ink)]">
        {Math.round(weather.temperature)}°
        <span className="block font-[var(--font-body)] text-[0.82rem] font-medium text-[var(--ink-soft)] tracking-[0.02em] mt-1.5">
          {t().feels} {Math.round(weather.apparentTemperature)}°
        </span>
      </div>
      <div className="flex items-center justify-center gap-1.5 mt-2.5">
        <span className="text-base font-semibold text-[var(--ink)]">
          {placeName}
        </span>
        {onChangeLocation && (
          <button
            className="border-none bg-transparent text-[0.78rem] text-[var(--accent)] font-medium cursor-pointer hover:underline p-0"
            onClick={onChangeLocation}
          >
            {t().changeLocation}
          </button>
        )}
      </div>
      <div className="text-[0.78rem] text-[var(--ink-faint)] mt-1">
        {weather.precipProbability}% {t().rain} · {weather.humidity}% {t().humidity} · UV{" "}
        {Math.round(weather.uvIndex)}
      </div>
    </section>
  );
}

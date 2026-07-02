import type { CurrentWeather } from "../../data/weather";
import { t } from "../../i18n/translations";
import { formatTemp } from "../../utils/temperature";

interface WeatherContextProps {
  weather: CurrentWeather;
  placeName: string;
  onChangeLocation?: () => void;
  prioritizeFeelsLike?: boolean;
}

export default function WeatherContext({
  weather,
  placeName,
  onChangeLocation,
  prioritizeFeelsLike = false,
}: WeatherContextProps) {
  const primary = prioritizeFeelsLike ? weather.apparentTemperature : weather.temperature;
  const secondary = prioritizeFeelsLike ? weather.temperature : weather.apparentTemperature;
  const secondaryLabel = prioritizeFeelsLike ? "actual" : t().feels;

  return (
    <section className="animate-in text-center mb-[18px]">
      <div className="font-[var(--font-display)] text-[4rem] font-medium leading-none tracking-[-0.03em] text-[var(--ink)]">
        {formatTemp(primary)}
        <span className="block font-[var(--font-body)] text-[0.78rem] text-[var(--ink-faint)] tracking-[0.02em] mt-1.5">
          {secondaryLabel} {formatTemp(secondary)} · ↑ {formatTemp(weather.peakTemperature)}
        </span>
      </div>
      <div className="text-[0.78rem] text-[var(--ink-faint)] mt-0.5">
        {weather.humidity}% {t().humidity} · ↑ {weather.peakHumidity}%
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
    </section>
  );
}

import type { CurrentWeather } from "../../data/weather";
import { t } from "../../i18n/translations";
import { formatTemp } from "../../utils/temperature";

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
        {formatTemp(weather.temperature)}
        <span className="block font-[var(--font-body)] text-[0.78rem] text-[var(--ink-faint)] tracking-[0.02em] mt-1.5">
          {t().feels} {formatTemp(weather.apparentTemperature)} · ↑ {formatTemp(weather.peakTemperature)}
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

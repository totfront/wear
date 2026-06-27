import type { CurrentWeather } from "../../data/weather";

interface WeatherContextProps {
  weather: CurrentWeather;
  placeName: string;
}

export default function WeatherContext({
  weather,
  placeName,
}: WeatherContextProps) {
  return (
    <section className="animate-in text-center mb-[18px]">
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
        {weather.precipProbability}% rain · {weather.humidity}% humidity · UV{" "}
        {Math.round(weather.uvIndex)}
      </div>
    </section>
  );
}

import { useEffect, useState, useCallback } from "react";
import {
  fetchWeather,
  getBrowserLocation,
  reverseGeocode,
  type CurrentWeather,
} from "./data/weather";
import { recommend, type Sensitivity } from "./recommend/recommend";
import { paletteFor } from "./ui/palette";
import { t } from "./i18n/translations";
import Header from "./components/Header/Header";
import Locator from "./components/Locator/Locator";
import StatusMessage from "./components/StatusMessage/StatusMessage";
import WeatherContext from "./components/WeatherContext/WeatherContext";
import Verdict from "./components/Verdict/Verdict";
import Outfit from "./components/Outfit/Outfit";
import UmbrellaBanner from "./components/UmbrellaBanner/UmbrellaBanner";
import SensitivityToggle from "./components/Sensitivity/Sensitivity";
import Teaser from "./components/Teaser/Teaser";
import Settings from "./components/Settings/Settings";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

type Status = "idle" | "locating" | "loading" | "ready" | "error";

export default function App() {
  const [status, setStatus] = useState<Status>("idle");
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [placeName, setPlaceName] = useState<string>("");
  const [sensitivity, setSensitivity] = useState<Sensitivity>("normal");
  const [error, setError] = useState<string>("");
  const [, setLocaleKey] = useState(0);
  const [geoPermission, setGeoPermission] = useState<"unknown" | "granted" | "other">("unknown");
  const [alwaysShowLocation, setAlwaysShowLocation] = useState(
    () => localStorage.getItem("wear:always-show-location") === "true"
  );
  const [locatorForced, setLocatorForced] = useState(false);

  const loadWeather = useCallback(
    async (lat: number, lon: number, name: string) => {
      setStatus("loading");
      setError("");
      try {
        const w = await fetchWeather(lat, lon);
        setWeather(w);
        setPlaceName(name);
        setStatus("ready");
        setLocatorForced(false);
        localStorage.setItem(
          "wear:last-location",
          JSON.stringify({ lat, lon, name }),
        );
      } catch {
        setError(t().connectionError);
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
      const name = await reverseGeocode(lat, lon);
      await loadWeather(lat, lon, name);
    } catch {
      setError(t().locationError);
      setStatus("error");
    }
  }, [loadWeather]);

  useEffect(() => {
    const loadFromCache = () => {
      const saved = localStorage.getItem("wear:last-location");
      if (saved) {
        try {
          const { lat, lon, name } = JSON.parse(saved);
          loadWeather(lat, lon, name);
        } catch {
          /* ignore corrupt data */
        }
      }
    };

    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        setGeoPermission(result.state === "granted" ? "granted" : "other");
        result.addEventListener("change", () => {
          setGeoPermission(result.state === "granted" ? "granted" : "other");
        });
        if (result.state === "granted") {
          getBrowserLocation().then(async ({ lat, lon }) => {
            const name = await reverseGeocode(lat, lon);
            loadWeather(lat, lon, name);
          }).catch(loadFromCache);
        } else {
          loadFromCache();
        }
      }).catch(() => {
        setGeoPermission("other");
        loadFromCache();
      });
    } else {
      setGeoPermission("other");
      loadFromCache();
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
  const geoGranted = geoPermission === "granted";
  const geoResolved = geoPermission !== "unknown";
  const hideLocator = geoGranted && !alwaysShowLocation && !locatorForced && status !== "idle";

  return (
    <main>
      <Settings
        onLocaleChange={() => setLocaleKey((k) => k + 1)}
        onThemeChange={() => {
          if (weather) {
            const rec2 = recommend({ temperature: weather.temperature, precipProbability: weather.precipProbability, uvIndex: weather.uvIndex }, sensitivity);
            const p = paletteFor(rec2.band.name);
            document.body.style.setProperty("--sky-top", p.skyTop);
            document.body.style.setProperty("--sky-bottom", p.skyBottom);
            document.body.style.setProperty("--accent", p.accent);
          }
        }}
        onAlwaysShowLocationChange={setAlwaysShowLocation}
      />
      <Header />
      {geoResolved && !hideLocator && (
        <Locator onUseMyLocation={useMyLocation} onSelectCity={loadWeather} />
      )}

      {status !== "ready" && geoResolved && !(status === "idle" && localStorage.getItem("wear:last-location")) && (
        <StatusMessage status={status} error={error} />
      )}

      {isRecommendationReady && (
        <div key={placeName}>
          <WeatherContext
            weather={weather}
            placeName={placeName}
            onChangeLocation={hideLocator ? () => setLocatorForced(true) : undefined}
          />
          <Verdict bandName={rec.band.name} raining={weather.precipProbability >= 40 && weather.temperature > 1} />
          <Outfit zones={rec.zones} />
          <UmbrellaBanner precipProbability={weather.precipProbability} />
          <SensitivityToggle value={sensitivity} onChange={setSensitivity} />
          <Teaser />
        </div>
      )}
      <Analytics />
    </main>
  );
}

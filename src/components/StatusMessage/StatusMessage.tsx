import { t } from "../../i18n/translations";

interface StatusMessageProps {
  status: "idle" | "locating" | "loading" | "error";
  error?: string;
}

export default function StatusMessage({ status, error }: StatusMessageProps) {
  if (status === "idle") {
    return (
      <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
        <p>{t().idleMessage}</p>
      </div>
    );
  }

  if (status === "locating" || status === "loading") {
    return (
      <div className="text-center py-12 px-5 text-[var(--ink-soft)] text-base leading-normal">
        <p className="pulse">
          {status === "locating" ? t().locating : t().loadingWeather}
        </p>
      </div>
    );
  }

  if (status === "error" && error) {
    return (
      <div className="text-center py-12 px-5 text-[#a8453a] text-base leading-normal">
        <p>{error}</p>
      </div>
    );
  }

  return null;
}

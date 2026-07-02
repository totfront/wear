import { t } from "../../i18n/translations";

interface RainGaugeProps {
  probability: number;
}

export default function RainGauge({ probability }: RainGaugeProps) {
  const pct = Math.min(100, Math.max(0, probability));
  const labels = t();

  return (
    <section className="animate-in bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] px-[22px] py-[18px] mt-[18px] mb-[18px] shadow-[var(--shadow)]">
      <p className="text-[0.82rem] font-medium text-[var(--ink-soft)] mb-4">
        {labels.umbrellaToday}
      </p>

      {/* Track area with room above for the indicator */}
      <div className="relative pt-4 pb-1">
        {/* Gradient track */}
        <div
          className="h-px"
          style={{ background: "var(--card-line)" }}
        />

        {/* Divider ticks */}
        <div
          className="absolute top-4 w-px h-2 bg-white/50"
          style={{ left: "33.3%" }}
        />
        <div
          className="absolute top-4 w-px h-2 bg-white/50"
          style={{ left: "66.6%" }}
        />

        {/* Indicator: downward triangle above the track */}
        <div
          className="absolute top-0 -translate-x-1/2"
          style={{ left: `clamp(6px, ${pct}%, calc(100% - 6px))` }}
        >
          <div
            className="w-0 h-0"
            style={{
              borderLeft: "5px solid transparent",
              borderRight: "5px solid transparent",
              borderTop: "7px solid var(--ink)",
            }}
          />
        </div>
      </div>

      {/* Labels */}
      <div className="relative h-5 text-[0.72rem] text-[var(--ink-faint)] mt-0.5">
        <span className="absolute left-0">{labels.umbrellaGaugeNo}</span>
        <span className="absolute left-1/2 -translate-x-1/2">{labels.umbrellaGaugeMaybe}</span>
        <span className="absolute right-0">{labels.umbrellaGaugeYes}</span>
      </div>
    </section>
  );
}

import type { Sensitivity as SensitivityType } from "../../recommend/recommend";

interface SensitivityProps {
  value: SensitivityType;
  onChange: (value: SensitivityType) => void;
}

export default function Sensitivity({ value, onChange }: SensitivityProps) {
  return (
    <section className="animate-in flex items-center justify-between gap-3 mb-[22px] px-1">
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
              value === s
                ? "bg-white! text-[var(--ink)]! shadow-[0_1px_3px_rgba(28,26,23,0.12)]"
                : ""
            }`}
            onClick={() => onChange(s)}
          >
            {s === "normal" ? "average" : s}
          </button>
        ))}
      </div>
    </section>
  );
}

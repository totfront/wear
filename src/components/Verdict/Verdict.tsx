import { getBandName, getBandBlurb, t } from "../../i18n/translations";

interface VerdictProps {
  bandName: string;
  raining: boolean;
}

function getTip(bandName: string): string | null {
  const b = bandName.toLowerCase();
  if (b === "hot" || b === "warm") return t().tipHot;
  if (b === "freezing" || b === "cold") return t().tipCold;
  return null;
}

export default function Verdict({ bandName, raining }: VerdictProps) {
  let summary = `${getBandName(bandName)} – ${getBandBlurb(bandName)}`;
  if (raining) summary += t().grabUmbrella;
  const tip = getTip(bandName);

  return (
    <section className="animate-in bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] px-[22px] py-[18px] mb-[18px] shadow-[var(--shadow)]">
      <p className="font-[var(--font-display)] text-[1.32rem] font-medium leading-[1.32] tracking-[-0.01em] text-[var(--ink)]">
        {summary}.
      </p>
      {tip && (
        <p className="text-[0.82rem] text-[var(--ink-soft)] mt-2">
          {tip}
        </p>
      )}
    </section>
  );
}

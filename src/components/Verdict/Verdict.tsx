import { getBandName, getBandBlurb, t } from "../../i18n/translations";

interface VerdictProps {
  bandName: string;
  raining: boolean;
  windSpeed: number;
  precipProbability: number;
}

function getTips(bandName: string, _raining: boolean, windSpeed: number, precipProbability: number): string[] {
  const b = bandName.toLowerCase();
  const tips: string[] = [];
  if (b === "hot" || b === "warm") tips.push(t().tipHot);
  const coldAndWet = (b === "cold" || b === "freezing" || b === "chilly") && precipProbability >= 40;
  if (coldAndWet) tips.push(t().tipWetCold);
  if (windSpeed >= 30) tips.push(t().tipWindy);
  return tips;
}

export default function Verdict({ bandName, raining, windSpeed, precipProbability }: VerdictProps) {
  let summary = `${getBandName(bandName)} – ${getBandBlurb(bandName)}`;
  if (raining) summary += t().grabUmbrella;
  const tips = getTips(bandName, raining, windSpeed, precipProbability);

  return (
    <section className="animate-in bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] px-[22px] py-[18px] mb-[18px] shadow-[var(--shadow)]">
      <p className="font-[var(--font-display)] text-[1.32rem] font-medium leading-[1.32] tracking-[-0.01em] text-[var(--ink)]">
        {summary}.
      </p>
      {tips.map((tip) => (
        <p key={tip} className="text-[0.82rem] text-[var(--ink-soft)] mt-2">
          {tip}
        </p>
      ))}
    </section>
  );
}

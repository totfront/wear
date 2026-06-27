import { UmbrellaIcon } from "../../ui/icons";
import { t } from "../../i18n/translations";

interface UmbrellaBannerProps {
  precipProbability: number;
}

export default function UmbrellaBanner({
  precipProbability,
}: UmbrellaBannerProps) {
  const labels = t();
  const message =
    precipProbability >= 60
      ? labels.umbrellaMust
      : precipProbability >= 30
        ? labels.umbrellaShould
        : labels.umbrellaNo;

  return (
    <section className="animate-in flex items-center justify-center gap-2.5 px-5 py-3.5 mt-[18px] mb-[18px] bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] shadow-[var(--shadow)] text-[0.95rem] font-semibold text-[var(--ink)]">
      <span className="text-[var(--accent)] shrink-0 [&_svg]:w-5 [&_svg]:h-5">
        <UmbrellaIcon />
      </span>
      <span>{message}</span>
    </section>
  );
}

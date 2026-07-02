import { t } from "../../i18n/translations";

export default function Teaser() {
  const labels = t();
  return (
    <section className="animate-in mt-[34px] px-[18px] py-4 border border-dashed border-[var(--card-line)] rounded-[var(--radius)] text-center">
      <p className="text-[0.84rem] text-[var(--ink-soft)] leading-normal">
        🚧 {labels.teaserBefore}{" "}
        <em className="text-[var(--accent)] italic">{labels.teaserHighlight}</em>{" "}
        {labels.teaserAfter}
      </p>
    </section>
  );
}

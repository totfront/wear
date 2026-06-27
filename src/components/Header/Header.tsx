import { t } from "../../i18n/translations";

export default function Header() {
  return (
    <header className="text-center mb-[22px]">
      <h1 className="font-[var(--font-display)] font-semibold text-[2.6rem] tracking-[-0.02em] leading-none text-[var(--ink)]">
        wear
        <span className="text-[var(--accent)] transition-colors duration-[1200ms] ease-in-out">
          .
        </span>
      </h1>
      <p className="text-[0.82rem] text-[var(--ink-soft)] tracking-[0.04em] mt-1">
        {t().tagline}
      </p>
    </header>
  );
}

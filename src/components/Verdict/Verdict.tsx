interface VerdictProps {
  summary: string;
}

export default function Verdict({ summary }: VerdictProps) {
  return (
    <section className="animate-in bg-[var(--card)] backdrop-blur-[10px] border border-[var(--card-line)] rounded-[var(--radius)] px-[22px] py-[18px] mb-[18px] shadow-[var(--shadow)]">
      <p className="font-[var(--font-display)] text-[1.32rem] font-medium leading-[1.32] tracking-[-0.01em] text-[var(--ink)]">
        {summary}.
      </p>
    </section>
  );
}

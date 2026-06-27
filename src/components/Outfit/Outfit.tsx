import {
  HeadIcon,
  UpperIcon,
  LowerIcon,
  FeetIcon,
} from "../../ui/icons";
import type { Item, Zone } from "../../recommend/bands";

const ZONE_META = [
  { key: "head" as Zone, label: "Head", Icon: HeadIcon },
  { key: "upper" as Zone, label: "Upper body", Icon: UpperIcon },
  { key: "lower" as Zone, label: "Lower body", Icon: LowerIcon },
  { key: "feet" as Zone, label: "Feet", Icon: FeetIcon },
];

interface OutfitProps {
  zones: Record<Zone, Item[]>;
}

export default function Outfit({ zones }: OutfitProps) {
  return (
    <section className="animate-in outfit-thread relative flex flex-col gap-0.5">
      {ZONE_META.map(({ key, label, Icon }) => (
        <div className="flex items-center gap-4 px-4 py-3.5 relative" key={key}>
          <div className="shrink-0 w-[38px] h-[38px] grid place-items-center bg-[var(--card)] border border-[var(--card-line)] rounded-full text-[var(--accent)] shadow-[var(--shadow)] z-[1] transition-colors duration-[1200ms] ease-in-out [&_svg]:w-[21px] [&_svg]:h-[21px]">
            <Icon />
          </div>
          <div className="flex-1">
            <div className="text-[0.72rem] uppercase tracking-[0.09em] text-[var(--ink-faint)] font-semibold mb-[3px]">
              {label}
            </div>
            <div className="text-[1.04rem] text-[var(--ink)] leading-[1.35]">
              {zones[key].map((it, i) => (
                <span key={it.category}>
                  {i > 0 && (
                    <span className="text-[0.8rem] text-[var(--ink-faint)] italic mx-[7px]">
                      or
                    </span>
                  )}
                  <span className="font-medium">{it.label}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

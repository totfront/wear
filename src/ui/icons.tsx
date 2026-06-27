// Simple line icons, one per body zone + accessories. Inline SVG keeps the app
// dependency-free and native-wrap-friendly.

interface IconProps {
  className?: string;
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function HeadIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M5 11a7 7 0 0 1 14 0" />
      <path d="M4 11h16" />
      <path d="M6.5 11V9.5a5.5 5.5 0 0 1 11 0V11" />
    </svg>
  );
}

export function UpperIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M8 3 4 6l2 3 1-1v10h10V8l1 1 2-3-4-3-2 2H10L8 3Z" />
    </svg>
  );
}

export function LowerIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M6 3h12l-1 18h-4l-1-11-1 11H6L6 3Z" />
    </svg>
  );
}

export function FeetIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M4 7h6l3 6h6a1 1 0 0 1 1 1v3H4V7Z" />
      <path d="M4 14h16" />
    </svg>
  );
}

export function UmbrellaIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M12 3v2" />
      <path d="M3 12a9 7 0 0 1 18 0Z" />
      <path d="M12 12v7a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function SunglassesIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...stroke}>
      <path d="M3 9h6v4a2 2 0 0 1-6 0V9Z" />
      <path d="M15 9h6v4a2 2 0 0 1-6 0V9Z" />
      <path d="M9 11h6" />
    </svg>
  );
}

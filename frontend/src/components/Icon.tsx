type IconName =
  | 'home'
  | 'truck'
  | 'users'
  | 'logout'
  | 'lock'
  | 'menu'
  | 'close'
  | 'chart'
  | 'gear';

const paths: Record<IconName, string> = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  truck:
    'M3 7h13v10H3zM16 10h3.5L21 13v4h-5M7 18a1.6 1.6 0 1 0 0.001 0M17.5 18a1.6 1.6 0 1 0 0.001 0',
  users:
    'M16 11a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm-4 5c-4 0-7 2-7 4v1h14v-1c0-2-3-4-7-4z',
  logout: 'M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M15 16l5-4-5-4M20 12H9',
  lock: 'M6 11V8a6 6 0 0 1 12 0v3M4 11h16v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6L6 18',
  chart: 'M4 19V5M8 19v-7M13 19V8M18 19v-4',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1V21a2 2 0 1 1-4 0v-.1A1.6 1.6 0 0 0 7 19.4a1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7H1a2 2 0 1 1 0-4h.1A1.6 1.6 0 0 0 2.6 7a1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H7a1.6 1.6 0 0 0 1-1.5V1a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V7a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z',
};

/** Ícone SVG outline — sem emojis (padrão Prottus). */
export function Icon({
  name,
  size = 18,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}

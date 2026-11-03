import { Icon } from '@/components/ui/Icon'

type Waypoint = { label: string; icon?: string | null }

/** Positions (in % of the scene) along the light path, bottom → top, matching reference A. */
const SLOTS = [
  { x: 56, y: 78 },
  { x: 30, y: 62 },
  { x: 43, y: 44 },
  { x: 36, y: 27 },
  { x: 55, y: 13 },
  { x: 20, y: 82 },
]

/**
 * Dusk lighthouse with a glowing path linking the hero "waypoints". Pure SVG + HTML labels, so
 * the labels stay editable in the CMS and readable by screen readers.
 */
export function LighthouseScene({ waypoints = [] }: { waypoints?: Waypoint[] }) {
  const points = waypoints.slice(0, SLOTS.length)
  return (
    <div className="relative aspect-[4/3] w-full" role="img" aria-label="Lighthouse guiding the way across the sea at dusk">
      <svg viewBox="0 0 800 600" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a0833" stopOpacity="0" />
            <stop offset="0.55" stopColor="#7b2d83" stopOpacity="0.55" />
            <stop offset="0.78" stopColor="#e88a5a" stopOpacity="0.75" />
            <stop offset="0.9" stopColor="#f4c04a" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#651a6b" />
            <stop offset="1" stopColor="#22062a" />
          </linearGradient>
          <linearGradient id="beam" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#fce4b4" stopOpacity="0.9" />
            <stop offset="1" stopColor="#f4c04a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="path" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#f0a824" stopOpacity="0.15" />
            <stop offset="0.5" stopColor="#f4c04a" />
            <stop offset="1" stopColor="#fce4b4" />
          </linearGradient>
          <radialGradient id="sun" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#fce4b4" stopOpacity="0.95" />
            <stop offset="1" stopColor="#f0a824" stopOpacity="0" />
          </radialGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <rect width="800" height="600" fill="url(#sky)" />
        <circle cx="300" cy="400" r="160" fill="url(#sun)" />
        {/* distant shore */}
        <path d="M0 405 Q120 385 240 400 T480 398 L480 420 L0 420Z" fill="#3c0c48" opacity="0.7" />
        {/* sea */}
        <rect y="410" width="800" height="190" fill="url(#sea)" />
        {[430, 460, 495, 535].map((y, i) => (
          <path key={y} d={`M${20 + i * 30} ${y} q40 -6 80 0 t80 0 t80 0`} stroke="#f4c04a" strokeOpacity={0.35 - i * 0.06} strokeWidth="2" fill="none" />
        ))}

        {/* beam */}
        <path d="M640 150 L120 60 L120 230Z" fill="url(#beam)" opacity="0.55" />

        {/* rocks */}
        <path d="M520 600 L540 470 Q580 420 640 430 Q700 400 760 440 L800 430 L800 600Z" fill="#22062a" />
        <path d="M560 600 L585 500 Q630 470 690 480 Q740 470 800 500 L800 600Z" fill="#3c0c48" opacity="0.9" />

        {/* lighthouse */}
        <g>
          <path d="M612 430 L626 205 L654 205 L668 430Z" fill="#faf6fb" />
          <path d="M616 370 L664 370 L666 400 L614 400Z M621 290 L659 290 L661 320 L619 320Z" fill="#e4d3ea" />
          <rect x="622" y="188" width="36" height="20" fill="#e4d3ea" />
          <rect x="618" y="186" width="44" height="4" fill="#faf6fb" />
          <rect x="628" y="160" width="24" height="28" fill="#fce4b4" filter="url(#glow)" />
          <path d="M620 161 L640 136 L660 161Z" fill="#e4d3ea" />
          <circle cx="640" cy="133" r="3" fill="#f4c04a" />
          <rect x="615" y="205" width="50" height="6" fill="#e4d3ea" />
          <rect x="633" y="250" width="14" height="22" rx="7" fill="#3c0c48" />
          <rect x="633" y="335" width="14" height="22" rx="7" fill="#3c0c48" />
          <path d="M590 432 L690 432 L700 450 L580 450Z" fill="#faf6fb" />
        </g>

        {/* glowing path through the waypoints */}
        <path
          d="M440 600 C 520 520, 300 500, 250 420 S 380 300, 330 250 S 300 140, 430 90 S 600 140, 640 160"
          fill="none"
          stroke="url(#path)"
          strokeWidth="6"
          strokeLinecap="round"
          filter="url(#glow)"
        />
      </svg>

      {points.map((w, i) => (
        <div
          key={`${w.label}-${i}`}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
          style={{ left: `${SLOTS[i].x}%`, top: `${SLOTS[i].y}%` }}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-plum-900/80 text-gold-400 ring-2 ring-gold-400 shadow-glow backdrop-blur sm:size-11">
            <Icon name={w.icon ?? 'target'} className="size-5" />
          </span>
          <span className="hidden text-sm leading-tight font-semibold text-white drop-shadow sm:block sm:max-w-[9rem]">{w.label}</span>
        </div>
      ))}
    </div>
  )
}

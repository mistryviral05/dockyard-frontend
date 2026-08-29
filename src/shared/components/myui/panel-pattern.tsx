import { cn } from "@/shared/lib/utils"

const TOP_FADE = "radial-gradient(120% 80% at 50% 0%, black 0%, transparent 70%)"
const BOTTOM_FADE =
  "radial-gradient(115% 100% at 50% 100%, black 0%, transparent 72%)"

/**
 * Decorative layer for the content panel: a faint deploy grid with a few nodes
 * wired together, plus a wider deployment band along the bottom edge. It paints
 * in `currentColor` at a very low opacity and fades out towards the middle, so
 * the panel keeps its own background colour.
 */
function PanelPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground",
        className,
      )}
    >
      <div
        className="absolute inset-0"
        style={{ maskImage: TOP_FADE, WebkitMaskImage: TOP_FADE }}
      >
        <svg className="size-full" fill="none">
          <defs>
            <pattern
              id="panel-grid"
              width="56"
              height="56"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M56 0H0V56"
                stroke="currentColor"
                strokeOpacity="0.045"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#panel-grid)" />
        </svg>

        {/* A small pipeline motif in the corner, the same language as the cards. */}
        <svg
          viewBox="0 0 200 120"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="absolute -top-4 right-6 w-56 opacity-[0.06] sm:w-72"
        >
          <rect x="8" y="34" width="34" height="24" rx="6" />
          <rect x="83" y="14" width="34" height="24" rx="6" />
          <rect x="83" y="54" width="34" height="24" rx="6" />
          <rect x="158" y="34" width="34" height="24" rx="6" />
          <path d="M42 46h20a8 8 0 0 0 8-8v-6a6 6 0 0 1 6-6h7" />
          <path d="M42 46h20a8 8 0 0 1 8 8v6a6 6 0 0 0 6 6h7" />
          <path d="M117 26h7a6 6 0 0 1 6 6v6a8 8 0 0 0 8 8h20" />
          <path d="M117 66h7a6 6 0 0 0 6-6v-6a8 8 0 0 1 8-8h20" />
          <circle cx="25" cy="46" r="3.5" />
          <circle cx="175" cy="46" r="3.5" />
        </svg>
      </div>

      {/* Bottom band: rack -> build fan-out -> merge -> edge region. */}
      <div
        className="absolute inset-x-0 bottom-0 hidden h-64 sm:block"
        style={{ maskImage: BOTTOM_FADE, WebkitMaskImage: BOTTOM_FADE }}
      >
        <svg
          viewBox="0 0 1200 210"
          preserveAspectRatio="xMidYMax meet"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-full opacity-[0.055]"
        >
          {/* Source rack */}
          <rect x="60" y="94" width="150" height="26" rx="7" />
          <rect x="60" y="126" width="150" height="26" rx="7" />
          <rect x="60" y="158" width="150" height="26" rx="7" />
          <circle cx="78" cy="107" r="3.5" />
          <circle cx="78" cy="139" r="3.5" />
          <circle cx="78" cy="171" r="3.5" />
          <path d="M170 107h24M170 139h24M170 171h24" />

          {/* Trunk into the build node */}
          <path d="M230 139h276" />
          <circle cx="520" cy="139" r="14" />

          {/* Fan out to two parallel builds */}
          <path d="M534 139h36a16 16 0 0 0 16-16v-16a14 14 0 0 1 14-14h34" />
          <path d="M534 139h36a16 16 0 0 1 16 16v16a14 14 0 0 0 14 14h34" />
          <rect x="634" y="79" width="64" height="28" rx="9" />
          <rect x="634" y="171" width="64" height="28" rx="9" />

          {/* Merge back into the release node */}
          <path d="M698 93h34a14 14 0 0 1 14 14v16a16 16 0 0 0 16 16h36" />
          <path d="M698 185h34a14 14 0 0 0 14-14v-16a16 16 0 0 1 16-16h36" />
          <circle cx="812" cy="139" r="11" />

          {/* Rollout to the edge */}
          <path d="M827 139h121" strokeDasharray="6 11" />
          <circle cx="1010" cy="139" r="62" />
          <ellipse cx="1010" cy="139" rx="24" ry="62" />
          <path d="M948 139h124" />
          <path d="M956 109q54-16 108 0" />
          <path d="M956 169q54 16 108 0" />
        </svg>
      </div>
    </div>
  )
}

export { PanelPattern }

import { cn } from "@/shared/lib/utils"

/**
 * Decorative layer for the content panel: a faint deploy grid with a few nodes
 * wired together. It paints in `currentColor` at a very low opacity and fades
 * out towards the middle, so the panel keeps its own background colour.
 */
function PanelPattern({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden text-foreground",
        className,
      )}
      style={{
        maskImage:
          "radial-gradient(120% 80% at 50% 0%, black 0%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(120% 80% at 50% 0%, black 0%, transparent 70%)",
      }}
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
  )
}

export { PanelPattern }

import { cn } from "@/shared/lib/utils"

const VIEWBOX = { width: 120, height: 96 }
const STROKE = 9
/**
 * A 240 degree dial around (60, 62) with a radius of 46, so it starts at 210
 * degrees and ends at -30 degrees and keeps its opening at the bottom.
 */
const ARC = "M 20.16 85 A 46 46 0 1 1 99.84 85"

const DEFAULT_THRESHOLDS = { warn: 70, critical: 90 }

type GaugeThresholds = {
  warn: number
  critical: number
}

/** Reading stays green until it crosses a threshold, then it warns, then it alarms. */
function arcColor(percent: number, thresholds: GaugeThresholds) {
  if (percent >= thresholds.critical) {
    return "var(--metric-critical)"
  }

  if (percent >= thresholds.warn) {
    return "var(--metric-warn)"
  }

  return "var(--metric-ok)"
}

/**
 * Dial for a single reading, the arc fills in proportion to `value` and takes
 * its colour from the thresholds. `value` of null draws an empty dial.
 */
function Gauge({
  value,
  max = 100,
  unit,
  caption,
  thresholds = DEFAULT_THRESHOLDS,
  className,
}: {
  value: number | null
  max?: number
  unit?: string
  caption?: string
  thresholds?: GaugeThresholds
  className?: string
}) {
  const hasValue = typeof value === "number" && Number.isFinite(value)
  const percent = hasValue
    ? Math.min(Math.max((value / max) * 100, 0), 100)
    : 0
  const color = arcColor(percent, thresholds)

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div className="relative w-full max-w-37.5">
        <svg
          viewBox={`0 0 ${VIEWBOX.width} ${VIEWBOX.height}`}
          className="w-full overflow-visible"
          role="img"
          aria-label={
            hasValue
              ? `${value.toFixed(1)}${unit ?? ""}`
              : "No reading available"
          }
        >
          <path
            d={ARC}
            fill="none"
            stroke="var(--metric-track)"
            strokeWidth={STROKE}
            strokeLinecap="round"
          />

          {hasValue ? (
            <path
              d={ARC}
              fill="none"
              stroke={color}
              strokeWidth={STROKE}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={`${percent} 100`}
              className="transition-[stroke-dasharray] duration-700"
            />
          ) : null}
        </svg>

        {/* Sits over the middle of the dial, a little above its opening. */}
        <div className="absolute inset-x-0 top-[46%] flex flex-col items-center">
          {hasValue ? (
            <span className="flex items-baseline gap-0.5">
              <span
                className="font-heading text-xl font-semibold tabular-nums"
                style={{ color }}
              >
                {value.toFixed(1)}
              </span>
              {unit ? (
                <span className="text-xs text-muted-foreground">{unit}</span>
              ) : null}
            </span>
          ) : (
            <span className="text-sm text-muted-foreground">N/A</span>
          )}
        </div>
      </div>

      {caption ? (
        <span className="text-xs text-muted-foreground tabular-nums">
          {caption}
        </span>
      ) : null}
    </div>
  )
}

export { Gauge }
export type { GaugeThresholds }

import { Gauge, type GaugeThresholds } from "@/shared/components/myui/gauge"

/** One labelled dial inside the quick readings panel. */
function AgentGaugeCard({
  label,
  value,
  max,
  unit = "%",
  caption,
  thresholds,
}: {
  label: string
  value: number | null
  max?: number
  unit?: string
  caption?: string
  thresholds?: GaugeThresholds
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-card px-3 py-4">
      <span className="truncate text-xs text-muted-foreground">{label}</span>
      <Gauge
        value={value}
        max={max}
        unit={unit}
        caption={caption}
        thresholds={thresholds}
      />
    </div>
  )
}

export { AgentGaugeCard }

import { Card, CardContent } from "@/shared/components/ui/card"
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
    <Card size="sm">
      <CardContent className="flex flex-col items-center gap-2">
        <span className="truncate text-xs text-muted-foreground">{label}</span>
        <Gauge
          value={value}
          max={max}
          unit={unit}
          caption={caption}
          thresholds={thresholds}
        />
      </CardContent>
    </Card>
  )
}

export { AgentGaugeCard }

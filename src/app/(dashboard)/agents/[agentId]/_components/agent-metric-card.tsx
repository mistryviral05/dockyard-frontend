import type { LucideIcon } from "lucide-react"

import { Card, CardContent } from "@/shared/components/ui/card"

/** One status tile, the bar is drawn only for the percent based metrics. */
function AgentMetricCard({
  label,
  icon: Icon,
  value,
  unit,
  hint,
  percent,
}: {
  label: string
  icon: LucideIcon
  value: string
  unit?: string
  hint?: string
  percent?: number | null
}) {
  const filled =
    typeof percent === "number" ? Math.min(Math.max(percent, 0), 100) : null

  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon className="size-4" />
          {label}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="font-heading text-2xl font-semibold tabular-nums tracking-tight">
            {value}
          </span>
          {unit ? (
            <span className="text-sm text-muted-foreground">{unit}</span>
          ) : null}
        </div>

        {filled !== null ? (
          <div className="h-1 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-500"
              style={{ width: `${filled}%` }}
            />
          </div>
        ) : null}

        {hint ? (
          <p className="text-xs text-muted-foreground tabular-nums">{hint}</p>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { AgentMetricCard }

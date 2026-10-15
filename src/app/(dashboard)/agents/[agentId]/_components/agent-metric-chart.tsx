"use client"

import { format } from "date-fns"
import type { LucideIcon } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/components/ui/chart"
import type { AgentMetricsPoint } from "@/features/agent/types"

type MetricKey = "cpu" | "ram" | "disk" | "load"

/**
 * One series over time, drawn with the shadcn chart wrapper so the tooltip and
 * the grid follow the same tokens as the rest of the dashboard.
 */
function AgentMetricChart({
  label,
  icon: Icon,
  metricKey,
  points,
  color,
  unit,
  isPercent = true,
}: {
  label: string
  icon: LucideIcon
  metricKey: MetricKey
  points: AgentMetricsPoint[]
  /** A chart token, for example "var(--chart-1)". */
  color: string
  unit?: string
  isPercent?: boolean
}) {
  const config = {
    [metricKey]: { label, color },
  } satisfies ChartConfig

  const gradientId = `agent-metric-gradient-${metricKey}`

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <Icon className="size-4" />
          {label}
          {unit ? <span className="text-xs">({unit})</span> : null}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {points.length === 0 ? (
          <div className="flex h-[200px] items-center justify-center text-sm text-muted-foreground">
            No samples in this window yet.
          </div>
        ) : (
          <ChartContainer config={config} className="aspect-auto h-[200px] w-full">
            <AreaChart data={points} margin={{ left: 0, right: 8, top: 8 }}>
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="100%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid vertical={false} />

              <XAxis
                dataKey="t"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={28}
                tickFormatter={(value: string) =>
                  format(new Date(value), "HH:mm")
                }
              />

              <YAxis
                width={36}
                tickLine={false}
                axisLine={false}
                tickMargin={4}
                domain={isPercent ? [0, 100] : [0, "auto"]}
                tickFormatter={(value: number) =>
                  isPercent ? `${value}` : value.toFixed(1)
                }
              />

              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      format(new Date(value as string), "d MMM, HH:mm:ss")
                    }
                  />
                }
              />

              <Area
                dataKey={metricKey}
                type="monotone"
                stroke={color}
                strokeWidth={2}
                fill={`url(#${gradientId})`}
                dot={false}
                isAnimationActive={false}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export { AgentMetricChart }

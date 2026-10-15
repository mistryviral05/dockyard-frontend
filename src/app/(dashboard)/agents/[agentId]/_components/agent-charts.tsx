"use client"

import { Activity, Cpu, MemoryStick } from "lucide-react"

import type { AgentMetricsPoint } from "@/features/agent/types"
import { AgentMetricChart } from "./agent-metric-chart"

/** CPU, RAM and Load over the selected window, one card each. */
function AgentCharts({ points }: { points: AgentMetricsPoint[] }) {
  return (
    <div className="flex flex-col gap-6">
      <AgentMetricChart
        label="CPU usage"
        unit="%"
        icon={Cpu}
        metricKey="cpu"
        points={points}
        color="var(--chart-1)"
      />

      <AgentMetricChart
        label="RAM usage"
        unit="%"
        icon={MemoryStick}
        metricKey="ram"
        points={points}
        color="var(--chart-2)"
      />

      <AgentMetricChart
        label="Load average"
        icon={Activity}
        metricKey="load"
        points={points}
        color="var(--chart-3)"
        isPercent={false}
      />
    </div>
  )
}

export { AgentCharts }

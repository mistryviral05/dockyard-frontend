"use client"

import { Activity, Cpu, HardDrive, MemoryStick } from "lucide-react"

import type { AgentMetricsPoint } from "@/features/agent/types"
import { AgentMetricChart } from "./agent-metric-chart"

/** CPU, RAM, Disk and Load over the selected window, one card each. */
function AgentCharts({ points }: { points: AgentMetricsPoint[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
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
        label="Disk usage"
        unit="%"
        icon={HardDrive}
        metricKey="disk"
        points={points}
        color="var(--chart-3)"
      />

      <AgentMetricChart
        label="Load average"
        icon={Activity}
        metricKey="load"
        points={points}
        color="var(--chart-4)"
        isPercent={false}
      />
    </div>
  )
}

export { AgentCharts }

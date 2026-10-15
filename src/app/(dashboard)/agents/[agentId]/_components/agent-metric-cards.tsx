import { Activity, Cpu, HardDrive, MemoryStick } from "lucide-react"

import type { AgentMetrics } from "@/features/agent/types"
import { AgentMetricCard } from "./agent-metric-card"

const EMPTY_VALUE = "--"

function percentValue(value?: number) {
  return typeof value === "number" ? value.toFixed(1) : EMPTY_VALUE
}

/** CPU, RAM, Disk and Load, all read from the latest sample. */
function AgentMetricCards({ metrics }: { metrics: AgentMetrics }) {
  const current = metrics.current
  const cores = metrics.cpu_cores

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <AgentMetricCard
        label="CPU"
        icon={Cpu}
        value={percentValue(current?.cpu_usage)}
        unit={current ? "%" : undefined}
        percent={current?.cpu_usage ?? null}
        hint={cores ? `${cores} cores` : undefined}
      />

      <AgentMetricCard
        label="RAM"
        icon={MemoryStick}
        value={percentValue(current?.ram_usage)}
        unit={current ? "%" : undefined}
        percent={current?.ram_usage ?? null}
      />

      <AgentMetricCard
        label="Disk"
        icon={HardDrive}
        value={percentValue(current?.disk_usage)}
        unit={current ? "%" : undefined}
        percent={current?.disk_usage ?? null}
      />

      <AgentMetricCard
        label="Load"
        icon={Activity}
        value={
          typeof current?.load_1 === "number"
            ? current.load_1.toFixed(2)
            : EMPTY_VALUE
        }
        hint={
          current
            ? `5m ${current.load_5.toFixed(2)} and 15m ${current.load_15.toFixed(2)}`
            : undefined
        }
      />
    </div>
  )
}

export { AgentMetricCards }

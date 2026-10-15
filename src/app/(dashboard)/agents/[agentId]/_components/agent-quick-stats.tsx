import { formatDuration, intervalToDuration } from "date-fns"

import type { AgentMetrics } from "@/features/agent/types"
import { AgentGaugeCard } from "./agent-gauge-card"
import { AgentStatTile } from "./agent-stat-tile"

const UNKNOWN = "N/A"

/** Host uptime in the shortest form that still reads well on a tile. */
function uptime(seconds?: number | null) {
  if (!seconds) {
    return UNKNOWN
  }

  return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }), {
    format: ["days", "hours", "minutes"],
  })
}

/**
 * The dials and counters that answer "is this box healthy" at a glance, read
 * from the latest sample only.
 */
function AgentQuickStats({ metrics }: { metrics: AgentMetrics }) {
  const current = metrics.current
  const cores = metrics.cpu_cores

  // The load per core is a ratio, so it reads as a percentage on the dial.
  const sysLoad =
    typeof current?.load_per_core === "number"
      ? current.load_per_core * 100
      : null

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AgentGaugeCard
          label="CPU busy"
          value={current?.cpu_usage ?? null}
          caption={cores ? `${cores} cores` : undefined}
        />

        <AgentGaugeCard
          label="RAM used"
          value={current?.ram_usage ?? null}
        />

        <AgentGaugeCard
          label="Disk used"
          value={current?.disk_usage ?? null}
          thresholds={{ warn: 80, critical: 92 }}
        />

        <AgentGaugeCard
          label="Sys load"
          value={sysLoad}
          caption={
            current ? `1m ${current.load_1.toFixed(2)}` : undefined
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <AgentStatTile
          label="CPU cores"
          value={cores ?? UNKNOWN}
        />

        <AgentStatTile
          label="Uptime"
          value={uptime(metrics.uptime_seconds)}
        />

        <AgentStatTile
          label="Public IP"
          value={metrics.public_ip ?? UNKNOWN}
        />

        <AgentStatTile
          label="Last sample"
          value={current ? `${current.age_seconds}s ago` : UNKNOWN}
          hint={metrics.live ? "Heartbeat is fresh" : "Heartbeat is stale"}
        />
      </div>
    </div>
  )
}

export { AgentQuickStats }

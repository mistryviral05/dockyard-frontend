"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { agentQueries } from "@/features/agent/useAgentQueries"
import {
  AgentMetricsWindow,
  DEFAULT_AGENT_METRICS_WINDOW,
} from "@/features/agent/types"
import { AgentStatusBadge } from "@/shared/components/myui/agent-status-badge"

function AgentDetailPage() {
  const params = useParams<{ agentId: string }>()
  const agentId = params?.agentId

  const [metricsWindow] = useState<AgentMetricsWindow>(
    DEFAULT_AGENT_METRICS_WINDOW
  )

  const {
    data: metrics,
    isLoading,
    isError,
  } = agentQueries.useGetAgentMetrics(agentId, metricsWindow)

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
          Loading this agent...
        </div>
      </div>
    )
  }

  if (isError || !metrics) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
          Could not load this agent. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          {metrics.name || "Agent"}
        </h1>
        <AgentStatusBadge status={metrics.status} />
      </div>

      {/* The cards, the window selector and the charts land here in the next steps. */}
      <div className="rounded-xl border border-border bg-background px-6 py-6 text-sm text-muted-foreground">
        <p>Window: {metricsWindow}</p>
        <p>Points held: {metrics.series.length}</p>
        <p>Poll: every {metrics.poll_seconds} seconds</p>
        <p>Live: {metrics.live ? "yes" : "no"}</p>
      </div>
    </div>
  )
}

export { AgentDetailPage }

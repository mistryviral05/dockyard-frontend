"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { agentQueries } from "@/features/agent/useAgentQueries"
import {
  AgentMetricsWindow,
  DEFAULT_AGENT_METRICS_WINDOW,
} from "@/features/agent/types"
import { AgentDetailHeader } from "./agent-detail-header"
import { AgentMetricCards } from "./agent-metric-cards"
import { AgentInfoCard } from "./agent-info-card"

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
      <AgentDetailHeader metrics={metrics} />

      <AgentMetricCards metrics={metrics} />

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[20rem_1fr]">
        <AgentInfoCard metrics={metrics} />

        {/* The window selector and the charts land here in the next step. */}
        <div className="rounded-2xl border border-border/40 bg-sidebar px-6 py-6 text-sm text-muted-foreground">
          <p>Window: {metricsWindow}</p>
          <p>Points held: {metrics.series.length}</p>
          <p>Poll: every {metrics.poll_seconds} seconds</p>
        </div>
      </div>
    </div>
  )
}

export { AgentDetailPage }

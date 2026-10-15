"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { agentQueries } from "@/features/agent/useAgentQueries"
import {
  AgentMetricsWindow,
  DEFAULT_AGENT_METRICS_WINDOW,
} from "@/features/agent/types"
import { AgentDetailHeader } from "./agent-detail-header"
import { AgentQuickStats } from "./agent-quick-stats"
import { AgentInfoCard } from "./agent-info-card"
import { AgentWindowTabs } from "./agent-window-tabs"
import { AgentCharts } from "./agent-charts"
import { AgentDetailSkeleton } from "./agent-detail-skeleton"
import { AgentDetailError } from "./agent-detail-error"

function AgentDetailPage() {
  const params = useParams<{ agentId: string }>()
  const agentId = params?.agentId

  const [metricsWindow, setMetricsWindow] = useState<AgentMetricsWindow>(
    DEFAULT_AGENT_METRICS_WINDOW
  )

  const {
    data: metrics,
    isLoading,
    isError,
    error,
  } = agentQueries.useGetAgentMetrics(agentId, metricsWindow)

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <AgentDetailSkeleton />
      </div>
    )
  }

  if (isError || !metrics) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <AgentDetailError error={error} />
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <AgentDetailHeader metrics={metrics} />

      <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_20rem]">
        <AgentQuickStats metrics={metrics} />
        <AgentInfoCard metrics={metrics} />
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-heading text-base font-medium">Usage</h2>
          <AgentWindowTabs value={metricsWindow} onChange={setMetricsWindow} />
        </div>

        <AgentCharts points={metrics.series} />
      </div>
    </div>
  )
}

export { AgentDetailPage }

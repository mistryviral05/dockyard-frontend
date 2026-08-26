"use client"

import { useEffect, useMemo } from "react"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import { deploymentQueries } from "@/features/deployment/useDeploymentQueries"
import { useDeploymentChannel } from "@/features/deployment/useDeploymentChannel"
import { toLogLine } from "@/features/deployment/log-format"
import { isTerminalStatus } from "@/features/deployment/types"
import { projectQueries } from "@/features/project/useProjectQueries"
import { DeploymentHeader } from "./deployment-header"
import { DeploymentTimeline } from "./deployment-timeline"
import { DeploymentSummaryCard } from "./deployment-summary-card"
import { DeploymentErrorAlert } from "./deployment-error-alert"
import { DeploymentLogs } from "./deployment-logs"
import { DeploymentDetailSkeleton } from "./deployment-detail-skeleton"

function DeploymentDetailPage() {
  const params = useParams<{ id: string }>()
  const deploymentId = params?.id
  const queryClient = useQueryClient()

  const {
    data: deployment,
    isLoading,
    isError,
  } = deploymentQueries.useGetDeployment(deploymentId)

  const {
    data: history,
    isLoading: isLoadingLogs,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = deploymentQueries.useGetDeploymentLogs(deploymentId)

  // The whole history has to be on screen before the channel opens, or the
  // lines published in between never reach the box.
  const isHistoryComplete = !isLoadingLogs && !hasNextPage

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) {
      return
    }

    fetchNextPage()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  const channel = useDeploymentChannel(deploymentId, isHistoryComplete)

  // The channel is ahead of the fetched row once a status event lands.
  const status = channel.status ?? deployment?.status
  const isLive = status ? !isTerminalStatus(status) : false
  const errorMessage = channel.error ?? deployment?.error_message ?? null

  const lines = useMemo(
    () => [...(history ?? []).map(toLogLine), ...channel.lines],
    [history, channel.lines]
  )

  const projectId = deployment?.project_id

  // The other views still hold the older status once this one settles.
  useEffect(() => {
    if (!projectId || !status || !isTerminalStatus(status)) {
      return
    }

    queryClient.invalidateQueries({ queryKey: ["deployment", deploymentId] })
    queryClient.invalidateQueries({ queryKey: ["projects"] })
    queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    queryClient.invalidateQueries({
      queryKey: ["project-deployments", projectId],
    })
  }, [queryClient, deploymentId, projectId, status])

  // The project name only feeds the back link, so it can arrive late.
  const { data: project } = projectQueries.useGetProject(projectId)

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <DeploymentDetailSkeleton />
      </div>
    )
  }

  if (isError || !deployment || !status) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-2xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
          Could not load this deployment. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <DeploymentHeader
        deployment={deployment}
        status={status}
        projectName={project?.project_name ?? "project"}
      />

      <DeploymentTimeline status={status} />

      {errorMessage ? <DeploymentErrorAlert message={errorMessage} /> : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
        <DeploymentSummaryCard deployment={deployment} />
        <DeploymentLogs
          lines={lines}
          isLive={isLive}
          isConnected={channel.isConnected}
          isLoading={isLoadingLogs || isFetchingNextPage}
        />
      </div>
    </div>
  )
}

export { DeploymentDetailPage }

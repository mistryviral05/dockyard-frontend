"use client"

import { useEffect } from "react"
import { useParams } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"

import { deploymentQueries } from "@/features/deployment/useDeploymentQueries"
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

  const {
    data: deployment,
    isLoading,
    isError,
  } = deploymentQueries.useGetDeployment(deploymentId)

  const isLive = deployment ? !isTerminalStatus(deployment.status) : false

  const {
    data: logs,
    isLoading: isLoadingLogs,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = deploymentQueries.useGetDeploymentLogs(deploymentId, isLive)

  // The project name only feeds the back link, so it can arrive late.
  const { data: project } = projectQueries.useGetProject(deployment?.project_id)

  const queryClient = useQueryClient()
  const projectId = deployment?.project_id
  const status = deployment?.status

  // Once the deployment settles the project lists still hold the older status.
  useEffect(() => {
    if (!projectId || !status || !isTerminalStatus(status)) {
      return
    }

    queryClient.invalidateQueries({ queryKey: ["projects"] })
    queryClient.invalidateQueries({ queryKey: ["project", projectId] })
    queryClient.invalidateQueries({
      queryKey: ["project-deployments", projectId],
    })
  }, [queryClient, projectId, status])

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <DeploymentDetailSkeleton />
      </div>
    )
  }

  if (isError || !deployment) {
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
        projectName={project?.project_name ?? "project"}
      />

      <DeploymentTimeline status={deployment.status} />

      {deployment.error_message ? (
        <DeploymentErrorAlert message={deployment.error_message} />
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
        <DeploymentSummaryCard deployment={deployment} />
        <DeploymentLogs
          logs={logs ?? []}
          isLive={isLive}
          isLoading={isLoadingLogs}
          hasMoreLogs={hasNextPage}
          isLoadingMore={isFetchingNextPage}
          onLoadMore={() => fetchNextPage()}
        />
      </div>
    </div>
  )
}

export { DeploymentDetailPage }

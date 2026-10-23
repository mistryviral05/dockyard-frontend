"use client"

import { useParams } from "next/navigation"

import { projectQueries } from "@/features/project/useProjectQueries"
import { agentQueries } from "@/features/agent/useAgentQueries"
import { ProjectHeader } from "./project-header"
import { ProjectRepositoryCard } from "./project-repository-card"
import { ProjectAgentCard } from "./project-agent-card"
import { ProjectLastDeploymentCard } from "./project-last-deployment-card"
import { ProjectDeploymentsTable } from "./project-deployments-table"
import { ProjectDetailSkeleton } from "./project-detail-skeleton"

function ProjectDetailPage() {
  const params = useParams<{ id: string }>()
  const projectId = params?.id

  const {
    data: project,
    isLoading,
    isError,
  } = projectQueries.useGetProject(projectId)
  const { data: agents } = agentQueries.useGetAgents()
  const { data: deployments, isLoading: isLoadingDeployments } =
    projectQueries.useGetProjectDeployments(projectId)

  // The project row carries no address, so the matching row of the list holds it.
  const lastDeploymentId = project?.last_deployment?.id
  const liveUrl =
    deployments?.find((item) => item.id === lastDeploymentId && item.status === "running")
      ?.url ?? null

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <ProjectDetailSkeleton />
      </div>
    )
  }

  if (isError || !project) {
    return (
      <div className="mx-auto w-full max-w-7xl">
        <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
          Could not load this project. Please try again.
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <ProjectHeader project={project} liveUrl={liveUrl} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProjectRepositoryCard project={project} />
        <ProjectAgentCard
          projectId={project.id}
          agent={project.agent}
          agents={agents ?? []}
        />
        <ProjectLastDeploymentCard
          deployment={project.last_deployment}
          url={liveUrl}
        />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-medium">Deployments</h2>
        <ProjectDeploymentsTable
          deployments={deployments ?? []}
          isLoading={isLoadingDeployments}
        />
      </div>
    </div>
  )
}

export { ProjectDetailPage }

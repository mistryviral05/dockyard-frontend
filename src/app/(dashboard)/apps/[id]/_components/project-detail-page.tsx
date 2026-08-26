"use client"

import { ProjectHeader } from "./project-header"
import { ProjectRepositoryCard } from "./project-repository-card"
import { ProjectAgentCard } from "./project-agent-card"
import { ProjectLastDeploymentCard } from "./project-last-deployment-card"
import { ProjectDeploymentsTable } from "./project-deployments-table"
import {
  placeholderAgents,
  placeholderDeployments,
  placeholderProject,
} from "./placeholder-project"

function ProjectDetailPage() {
  // Static sample for now, the detail query replaces it at integration time.
  const project = placeholderProject

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <ProjectHeader project={project} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ProjectRepositoryCard project={project} />
        <ProjectAgentCard agent={project.agent} agents={placeholderAgents} />
        <ProjectLastDeploymentCard deployment={project.last_deployment} />
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="font-heading text-lg font-medium">Deployments</h2>
        <ProjectDeploymentsTable deployments={placeholderDeployments} />
      </div>
    </div>
  )
}

export { ProjectDetailPage }

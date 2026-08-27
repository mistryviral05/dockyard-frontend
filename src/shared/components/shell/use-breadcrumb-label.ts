"use client"

import { deploymentQueries } from "@/features/deployment/useDeploymentQueries"
import { projectQueries } from "@/features/project/useProjectQueries"

/** What the trail falls back to while the record is still loading. */
const detailFallbacks: Record<string, string> = {
  apps: "Project",
  deployments: "Deployment",
}

/**
 * Turns the record id in the url into something readable. A deployment has no
 * name of its own, so it borrows the name of the project it belongs to. Both
 * lookups hit the same react-query cache the detail page fills, so the trail
 * costs nothing extra once the page is open.
 */
function useBreadcrumbLabel(section?: string, detail?: string) {
  const projectId = section === "apps" ? detail : undefined
  const deploymentId = section === "deployments" ? detail : undefined

  const { data: project } = projectQueries.useGetProject(projectId)
  const { data: deployment } = deploymentQueries.useGetDeployment(deploymentId)
  const { data: deploymentProject } = projectQueries.useGetProject(
    deployment?.project_id
  )

  if (!detail) return undefined

  const name = project?.project_name ?? deploymentProject?.project_name

  // The raw id never reaches the trail, it reads as noise next to the section.
  return name ?? detailFallbacks[section ?? ""] ?? detail
}

export { useBreadcrumbLabel }

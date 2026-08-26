import { GeneralMessage } from "@/shared/types/responses"
import { DeploymentStatus } from "@/features/deployment/types"
import { AgentStatus } from "@/features/agent/types"
import { ProjectStack } from "./schema"

export type { DeploymentStatus }

/** GET /v1/projects?workspace_id= */
export type Project = {
    id: string
    project_name: string
    project_stack: ProjectStack
    repo_name: string
    /** `null` means the project has never been deployed. */
    deployment_status: DeploymentStatus | null
}

/** The linked github repository, part of the project detail payload. */
export type ProjectRepository = {
    repo_name: string
    repo_full_name: string
    repo_url: string
    is_private: boolean
}

/** The agent a project runs on, `null` until one is picked. */
export type ProjectAgent = {
    id: string
    name: string
    status: AgentStatus
    port: string
}

/** The most recent deployment, `null` when nothing has been deployed yet. */
export type ProjectLastDeployment = {
    id: string
    status: DeploymentStatus
    branch: string
    created_at: string
}

/** GET /v1/projects/{id} — the whole detail page comes from this one call. */
export type ProjectDetail = {
    id: string
    project_name: string
    project_stack: ProjectStack
    default_branch: string
    is_deployed: boolean
    created_at: string
    repository: ProjectRepository | null
    agent: ProjectAgent | null
    last_deployment: ProjectLastDeployment | null
}

/** POST /v1/projects — the API answers with the id of the fresh project. */
export type CreatedProject = {
    id: string
    project_name: string
}

export type CreateProjectResponse = GeneralMessage

/** Shape of the error body the API returns on a failed create. */
export type ProjectErrorResponse = {
    status: "error"
    error: string
}

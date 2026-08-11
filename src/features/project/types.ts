import { GeneralMessage } from "@/shared/types/responses"
import { ProjectStack } from "./schema"

/** `null` means the project has never been deployed. */
export type DeploymentStatus = "running" | "building" | "stopped" | "failed"

/** GET /v1/projects?workspace_id= */
export type Project = {
    id: string
    project_name: string
    project_stack: ProjectStack
    repo_name: string
    deployment_status: DeploymentStatus | null
}

/** POST /v1/projects — the API answers with a plain status/message body. */
export type CreateProjectResponse = GeneralMessage

/** Shape of the error body the API returns on a failed create. */
export type ProjectErrorResponse = {
    status: "error"
    error: string
}

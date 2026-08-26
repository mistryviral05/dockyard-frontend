/** Every state a deployment can be in. `running`, `failed` and `stopped` are terminal. */
export type DeploymentStatus =
    | "queued"
    | "building"
    | "deploying"
    | "running"
    | "failed"
    | "stopped"

const TERMINAL_STATUSES: DeploymentStatus[] = ["running", "failed", "stopped"]

/** A terminal deployment never changes again, so it does not need refreshing. */
export function isTerminalStatus(status: DeploymentStatus) {
    return TERMINAL_STATUSES.includes(status)
}

export type DeploymentTrigger = "manual" | "webhook"

/** GET /v1/deployments/{id} and GET /v1/projects/{id}/deployments */
export type Deployment = {
    id: string
    project_id: string
    status: DeploymentStatus
    trigger_source: DeploymentTrigger
    branch: string
    /** Absent when the commit could not be resolved. */
    commit_sha?: string
    commit_message?: string
    image_tag?: string
    error_message: string | null
    started_at: string | null
    completed_at: string | null
    created_at: string
}

export type DeploymentLogType = "system" | "build" | "runtime" | "error"

/** One row of GET /v1/deployments/{id}/logs */
export type DeploymentLog = {
    id: string
    type: DeploymentLogType
    message: string
    logged_at: string
}

/** The logs endpoint pages with a cursor, `next_cursor` is null on the last page. */
export type DeploymentLogPage = {
    items: DeploymentLog[]
    next_cursor: string | null
}

/** POST /v1/projects/{id}/deploy */
export type StartedDeployment = {
    deployment_id: string
    status: DeploymentStatus
}

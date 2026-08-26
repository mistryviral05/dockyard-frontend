import type { Deployment, DeploymentLog } from "@/features/deployment/types"

/**
 * Static sample used while the deployment page is still ui only.
 * Delete this file once the deployment queries and the live channel are wired in.
 */
export const placeholderDeployment: Deployment = {
  id: "dep_5m1v0xq7ka39",
  project_id: "prj_tz4k91xw0q8n2mv7bd3ls6yh",
  status: "running",
  trigger_source: "manual",
  branch: "main",
  commit_sha: "a1b2c3d4e5f6",
  commit_message: "fix login redirect",
  image_tag: "ghcr.io/dockyard/prj-tz4k91:a1b2c3d4e5f6",
  error_message: null,
  started_at: "2026-08-26T10:20:05Z",
  completed_at: "2026-08-26T10:20:35Z",
  created_at: "2026-08-26T10:20:00Z",
}

export const placeholderProjectName = "avd-room-allocation"

export const placeholderLogs: DeploymentLog[] = [
  {
    id: "log_01",
    type: "system",
    message: "build started, fetching your repository",
    logged_at: "2026-08-26T10:20:01.000123Z",
  },
  {
    id: "log_02",
    type: "system",
    message: "cloning mistryviral05/AVD-Room-Allocation-System at main",
    logged_at: "2026-08-26T10:20:03.114000Z",
  },
  {
    id: "log_03",
    type: "build",
    message: "step 1/8 : FROM golang:1.23-alpine",
    logged_at: "2026-08-26T10:20:06.220000Z",
  },
  {
    id: "log_04",
    type: "build",
    message: "step 2/8 : WORKDIR /app",
    logged_at: "2026-08-26T10:20:07.010000Z",
  },
  {
    id: "log_05",
    type: "build",
    message: "step 3/8 : COPY go.mod go.sum ./",
    logged_at: "2026-08-26T10:20:07.400000Z",
  },
  {
    id: "log_06",
    type: "build",
    message: "step 4/8 : RUN go mod download",
    logged_at: "2026-08-26T10:20:12.900000Z",
  },
  {
    id: "log_07",
    type: "error",
    message: "go: downloading module took longer than expected, retrying",
    logged_at: "2026-08-26T10:20:18.500000Z",
  },
  {
    id: "log_08",
    type: "build",
    message: "step 8/8 : CMD [\"/app/server\"]",
    logged_at: "2026-08-26T10:20:29.300000Z",
  },
  {
    id: "log_09",
    type: "system",
    message: "image pushed, starting the container on vps-mumbai",
    logged_at: "2026-08-26T10:20:32.000000Z",
  },
  {
    id: "log_10",
    type: "runtime",
    message: "server listening on port 8999",
    logged_at: "2026-08-26T10:20:35.700000Z",
  },
]

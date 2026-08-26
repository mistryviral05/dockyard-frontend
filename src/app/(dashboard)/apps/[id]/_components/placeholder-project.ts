import type { ProjectDetail } from "@/features/project/types"
import type { Deployment } from "@/features/deployment/types"
import type { Agent } from "@/features/agent/types"

/**
 * Static sample used while the detail page is still ui only.
 * Delete this file once the project detail query is wired in.
 */
export const placeholderProject: ProjectDetail = {
  id: "prj_tz4k91xw0q8n2mv7bd3ls6yh",
  project_name: "avd-room-allocation",
  project_stack: "go",
  default_branch: "main",
  is_deployed: true,
  created_at: "2026-08-26T10:12:00Z",
  repository: {
    repo_name: "AVD-Room-Allocation-System",
    repo_full_name: "mistryviral05/AVD-Room-Allocation-System",
    repo_url: "https://github.com/mistryviral05/AVD-Room-Allocation-System",
    is_private: true,
  },
  agent: {
    id: "agent_9f3k2md0qla7",
    name: "vps-mumbai",
    status: "active",
    port: "8999",
  },
  last_deployment: {
    id: "dep_5m1v0xq7ka39",
    status: "running",
    branch: "main",
    created_at: "2026-08-26T10:20:00Z",
  },
}

export const placeholderAgents: Agent[] = [
  {
    id: "agent_9f3k2md0qla7",
    name: "vps-mumbai",
    status: "active",
    subdomain: "mumbai.dockyard.dev",
    port: "8999",
  },
  {
    id: "agent_4x7c1nb5zpe8",
    name: "vps-frankfurt",
    status: "pending",
    subdomain: null,
    port: "8999",
  },
]

export const placeholderDeployments: Deployment[] = [
  {
    id: "dep_5m1v0xq7ka39",
    project_id: placeholderProject.id,
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
  },
  {
    id: "dep_2b8n4pw1jc06",
    project_id: placeholderProject.id,
    status: "failed",
    trigger_source: "manual",
    branch: "main",
    commit_sha: "9d8c7b6a5e4f",
    commit_message: "add room filters",
    error_message: "the image could not be built, check the build logs",
    started_at: "2026-08-25T18:04:11Z",
    completed_at: "2026-08-25T18:05:02Z",
    created_at: "2026-08-25T18:04:00Z",
  },
  {
    id: "dep_7q3z6ry8ht52",
    project_id: placeholderProject.id,
    status: "stopped",
    trigger_source: "webhook",
    branch: "develop",
    commit_sha: "4f5e6d7c8b9a",
    commit_message: "bump go version",
    image_tag: "ghcr.io/dockyard/prj-tz4k91:4f5e6d7c8b9a",
    error_message: null,
    started_at: "2026-08-24T09:41:20Z",
    completed_at: "2026-08-24T09:42:03Z",
    created_at: "2026-08-24T09:41:00Z",
  },
]

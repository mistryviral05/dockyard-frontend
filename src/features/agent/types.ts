export type AgentStatus = "pending" | "active" | "inactive" | "offline"

/** GET /v1/agents */
export type Agent = {
  id: string
  name: string
  status: AgentStatus
  subdomain: string | null
  port: string
}

/** POST /v1/agents — the token and run command are returned only once. */
export type CreatedAgent = {
  id: string
  name: string
  status: AgentStatus
  port: string
  created_at: string
  token: string
  token_expires_at: string
  token_expires_in: number
  run_command: string
}

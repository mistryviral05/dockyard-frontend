export type AgentStatus = "pending" | "active" | "offline"

export type Agent = {
  id: string
  name: string
  status: AgentStatus
  port: string
  created_at: string
}

/** POST /v1/agents — the token and run command are returned only once. */
export type CreatedAgent = Agent & {
  token: string
  token_expires_at: string
  token_expires_in: number
  run_command: string
}

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

/** Chart ranges offered by GET /v1/agents/{agentId}/metrics, server clamps to 1m .. 24h. */
export const AGENT_METRICS_WINDOWS = ["15m", "1h", "6h", "24h"] as const

export type AgentMetricsWindow = (typeof AGENT_METRICS_WINDOWS)[number]

export const DEFAULT_AGENT_METRICS_WINDOW: AgentMetricsWindow = "15m"

/** Query string of GET /v1/agents/{agentId}/metrics. */
export type AgentMetricsParams = {
  window?: AgentMetricsWindow
  /** RFC3339 timestamp, returns only the points newer than it. */
  since?: string
}

/** One sample of the chart series, every usage value is a percent. */
export type AgentMetricsPoint = {
  /** RFC3339 timestamp of the bucket. */
  t: string
  cpu: number
  ram: number
  disk: number
  load: number
}

/** The latest sample, drives the status cards. */
export type AgentMetricsCurrent = {
  cpu_usage: number
  ram_usage: number
  disk_usage: number
  load_1: number
  load_5: number
  load_15: number
  load_per_core: number
  recorded_at: string
  age_seconds: number
}

/** GET /v1/agents/{agentId}/metrics */
export type AgentMetrics = {
  agent_id: string
  name: string
  status: AgentStatus
  /** True when the last heartbeat is under 90 seconds old. */
  live: boolean
  public_ip: string | null
  os_info: string | null
  cpu_cores: number | null
  uptime_seconds: number | null
  last_heartbeat_at: string | null
  current: AgentMetricsCurrent | null
  series: AgentMetricsPoint[]
  window_seconds: number
  bucket_seconds: number
  /** Poll interval asked for by the server, the page refetches on it. */
  poll_seconds: number
}

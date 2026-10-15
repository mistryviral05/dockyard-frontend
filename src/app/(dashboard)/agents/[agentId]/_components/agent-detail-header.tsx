import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

import { AgentStatusBadge } from "@/shared/components/myui/agent-status-badge"
import { cn } from "@/shared/lib/utils"
import type { AgentMetrics } from "@/features/agent/types"

function AgentDetailHeader({ metrics }: { metrics: AgentMetrics }) {
  const { agent_id, name, status, live, os_info, last_heartbeat_at } = metrics

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/agents"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to agents
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              {name || "Agent"}
            </h1>
            <AgentStatusBadge status={status} />
          </div>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{agent_id}</span>
            {os_info ? (
              <>
                <span className="size-1 rounded-full bg-border" />
                {os_info}
              </>
            ) : null}
            {last_heartbeat_at ? (
              <>
                <span className="size-1 rounded-full bg-border" />
                {format(new Date(last_heartbeat_at), "d MMM yyyy, HH:mm:ss")}
              </>
            ) : null}
          </p>
        </div>

        <span className="flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className={cn(
              "size-1.5 rounded-full",
              live ? "bg-primary animate-pulse" : "bg-muted-foreground"
            )}
          />
          {live ? "Receiving heartbeats" : "No recent heartbeat"}
        </span>
      </div>
    </div>
  )
}

export { AgentDetailHeader }

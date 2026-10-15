import { format, formatDuration, intervalToDuration } from "date-fns"
import { Server } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { DetailRow } from "@/shared/components/myui/detail-row"
import type { AgentMetrics } from "@/features/agent/types"

/** Keeps the host uptime short, days and hours are enough on this card. */
function uptime(seconds?: number | null) {
  if (!seconds) {
    return null
  }

  return formatDuration(intervalToDuration({ start: 0, end: seconds * 1000 }), {
    format: ["days", "hours", "minutes"],
  })
}

function AgentInfoCard({ metrics }: { metrics: AgentMetrics }) {
  const host = uptime(metrics.uptime_seconds)

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Server className="size-4 text-muted-foreground" />
          Host
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        <DetailRow label="Public IP">
          {metrics.public_ip ? (
            <span className="font-mono text-xs">{metrics.public_ip}</span>
          ) : (
            <span className="text-muted-foreground">Unknown</span>
          )}
        </DetailRow>

        <DetailRow label="Operating system">
          {metrics.os_info ?? <span className="text-muted-foreground">Unknown</span>}
        </DetailRow>

        <DetailRow label="CPU cores">
          {metrics.cpu_cores ?? <span className="text-muted-foreground">Unknown</span>}
        </DetailRow>

        <DetailRow label="Uptime">
          {host ?? <span className="text-muted-foreground">Unknown</span>}
        </DetailRow>

        <DetailRow label="Last heartbeat">
          {metrics.last_heartbeat_at ? (
            format(new Date(metrics.last_heartbeat_at), "d MMM yyyy, HH:mm:ss")
          ) : (
            <span className="text-muted-foreground">Never</span>
          )}
        </DetailRow>

        <DetailRow label="Sample age">
          {metrics.current ? (
            `${metrics.current.age_seconds}s`
          ) : (
            <span className="text-muted-foreground">No sample</span>
          )}
        </DetailRow>

        <DetailRow label="Load per core">
          {metrics.current ? (
            metrics.current.load_per_core.toFixed(2)
          ) : (
            <span className="text-muted-foreground">No sample</span>
          )}
        </DetailRow>
      </CardContent>
    </Card>
  )
}

export { AgentInfoCard }

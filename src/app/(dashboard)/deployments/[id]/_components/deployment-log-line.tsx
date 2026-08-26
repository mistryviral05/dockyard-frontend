import { format } from "date-fns"

import { cn } from "@/shared/lib/utils"
import type { DeploymentLog, DeploymentLogType } from "@/features/deployment/types"

const typeStyles: Record<DeploymentLogType, string> = {
  system: "text-muted-foreground",
  build: "text-foreground",
  runtime: "text-info",
  error: "text-destructive",
}

function DeploymentLogLine({ log }: { log: DeploymentLog }) {
  return (
    <div className="flex gap-4 px-4 py-1 hover:bg-muted/60">
      <span className="shrink-0 font-mono text-xs text-muted-foreground tabular-nums">
        {format(new Date(log.logged_at), "HH:mm:ss")}
      </span>
      <span
        className={cn(
          "min-w-0 font-mono text-xs break-words whitespace-pre-wrap",
          typeStyles[log.type]
        )}
      >
        {log.message}
      </span>
    </div>
  )
}

export { DeploymentLogLine }

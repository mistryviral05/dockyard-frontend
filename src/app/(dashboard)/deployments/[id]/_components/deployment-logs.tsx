"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Terminal } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import type { DeploymentLog } from "@/features/deployment/types"
import { DeploymentLogLine } from "./deployment-log-line"
import { DeploymentLogsEmptyState } from "./deployment-logs-empty-state"

function DeploymentLogs({
  logs,
  isLive,
  hasOlderLogs = false,
}: {
  logs: DeploymentLog[]
  isLive: boolean
  hasOlderLogs?: boolean
}) {
  const [isFollowing, setIsFollowing] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  // New lines arrive at the bottom, so keep the view pinned there while following.
  useEffect(() => {
    if (!isFollowing) {
      return
    }

    bottomRef.current?.scrollIntoView({ block: "end" })
  }, [logs.length, isFollowing])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-heading text-lg font-medium">
          <Terminal className="size-4 text-muted-foreground" />
          Logs
          {isLive ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-info/10 px-2 py-0.5 text-xs font-medium text-info">
              <span className="size-1.5 animate-pulse rounded-full bg-info" />
              Live
            </span>
          ) : null}
        </h2>

        <Button
          variant={isFollowing ? "secondary" : "outline"}
          size="sm"
          onClick={() => setIsFollowing((value) => !value)}
        >
          <ArrowDown
            data-icon="inline-start"
            className={cn(!isFollowing && "text-muted-foreground")}
          />
          {isFollowing ? "Following" : "Follow"}
        </Button>
      </div>

      <div className="rounded-2xl bg-muted p-1.5">
        {logs.length === 0 ? (
          <DeploymentLogsEmptyState />
        ) : (
          <div className="max-h-[28rem] overflow-y-auto rounded-xl border border-border bg-background py-3">
            {hasOlderLogs ? (
              <div className="flex justify-center px-4 pb-3">
                <Button variant="outline" size="xs">
                  Load older logs
                </Button>
              </div>
            ) : null}

            {logs.map((log) => (
              <DeploymentLogLine key={log.id} log={log} />
            ))}

            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  )
}

export { DeploymentLogs }

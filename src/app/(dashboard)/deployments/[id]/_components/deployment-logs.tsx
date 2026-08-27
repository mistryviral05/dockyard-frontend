"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowDown, Check, Copy, Terminal } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { cn } from "@/shared/lib/utils"
import type { LogLine } from "@/features/deployment/log-format"
import { DeploymentLogLine } from "./deployment-log-line"
import { DeploymentLogsEmptyState } from "./deployment-logs-empty-state"

function DeploymentLogs({
  lines,
  isLive,
  isConnected = false,
  isLoading = false,
}: {
  lines: LogLine[]
  isLive: boolean
  isConnected?: boolean
  isLoading?: boolean
}) {
  const [isFollowing, setIsFollowing] = useState(true)
  const [hasCopied, setHasCopied] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // New lines arrive at the bottom, so keep the view pinned there while following.
  useEffect(() => {
    if (!isFollowing) {
      return
    }

    bottomRef.current?.scrollIntoView({ block: "end" })
  }, [lines.length, isFollowing])

  useEffect(() => {
    if (!hasCopied) {
      return
    }

    const timer = setTimeout(() => setHasCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [hasCopied])

  const copyLogs = async () => {
    await navigator.clipboard.writeText(lines.map((line) => line.text).join("\n"))
    setHasCopied(true)
  }

  const errorCount = lines.filter((line) => line.tone === "error").length
  const warningCount = lines.filter((line) => line.tone === "warning").length

  return (
    // min-w-0 keeps a long build line from stretching the grid column.
    <div className="flex min-w-0 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 font-heading text-lg font-medium">
          <Terminal className="size-4 text-muted-foreground" />
          Logs
          {isLive ? (
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium",
                isConnected
                  ? "bg-info/10 text-info"
                  : "bg-muted text-muted-foreground"
              )}
            >
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  isConnected ? "animate-pulse bg-info" : "bg-muted-foreground"
                )}
              />
              {isConnected ? "Live" : "Connecting"}
            </span>
          ) : null}
        </h2>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={copyLogs}>
            {hasCopied ? (
              <Check data-icon="inline-start" className="text-success" />
            ) : (
              <Copy data-icon="inline-start" />
            )}
            {hasCopied ? "Copied" : "Copy"}
          </Button>

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
      </div>

      <div className="min-w-0 rounded-xl  p-1.5">
        <div className="min-w-0 overflow-hidden rounded-xl border border-border/50 bg-sidebar">
          <div className="flex flex-wrap items-center justify-between gap-3  px-4 py-2">
            <span className="font-mono text-xs text-muted-foreground">
              {lines.length} {lines.length === 1 ? "line" : "lines"}
            </span>

            <div className="flex items-center gap-3 text-xs">
              {warningCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-warning">
                  <span className="size-1.5 rounded-full bg-warning" />
                  {warningCount} {warningCount === 1 ? "warning" : "warnings"}
                </span>
              ) : null}
              {errorCount > 0 ? (
                <span className="inline-flex items-center gap-1.5 text-destructive">
                  <span className="size-1.5 rounded-full bg-destructive" />
                  {errorCount} {errorCount === 1 ? "error" : "errors"}
                </span>
              ) : null}
            </div>
          </div>

          {isLoading && lines.length === 0 ? (
            <div className="flex flex-col gap-2 px-4 py-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </div>
          ) : lines.length === 0 ? (
            <DeploymentLogsEmptyState />
          ) : (
            <div className="max-h-128 min-w-0 overflow-y-auto py-2">
              {lines.map((line) => (
                <DeploymentLogLine key={line.key} line={line} />
              ))}

              {isLive ? (
                <div className="flex items-center gap-3 px-4 py-1">
                  <span className="w-20 shrink-0" />
                  <span className="inline-flex items-center gap-1.5 font-mono text-sm text-muted-foreground">
                    <span className="size-1.5 animate-pulse rounded-full bg-info" />
                    waiting for the next step
                  </span>
                </div>
              ) : null}

              <div ref={bottomRef} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export { DeploymentLogs }

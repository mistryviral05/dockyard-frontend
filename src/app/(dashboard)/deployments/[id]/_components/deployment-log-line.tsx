import { format } from "date-fns"

import { cn } from "@/shared/lib/utils"
import type { LogLine, LogTone } from "@/features/deployment/log-format"

const toneStyles: Record<LogTone, { row: string; text: string }> = {
  default: { row: "border-transparent", text: "text-foreground/90" },
  muted: { row: "border-transparent", text: "text-muted-foreground" },
  info: { row: "border-transparent", text: "text-info" },
  success: { row: "border-transparent", text: "text-success" },
  warning: {
    row: "border-warning/70 bg-warning/5",
    text: "text-warning",
  },
  error: {
    row: "border-destructive/70 bg-destructive/5",
    text: "text-destructive",
  },
}

function DeploymentLogLine({ line }: { line: LogLine }) {
  const tone = toneStyles[line.tone]

  return (
    <div
      className={cn(
        "flex gap-3 border-l-2 px-4 py-0.5 transition-colors hover:bg-muted/50",
        tone.row
      )}
    >
      <span className="w-20 shrink-0 font-mono text-sm text-muted-foreground/70 tabular-nums select-none">
        {format(new Date(line.at), "HH:mm:ss")}
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 font-mono text-sm leading-relaxed break-all whitespace-pre-wrap",
          tone.text
        )}
      >
        {line.text || " "}
      </span>
    </div>
  )
}

export { DeploymentLogLine }

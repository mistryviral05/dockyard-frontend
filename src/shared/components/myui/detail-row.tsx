import type { ReactNode } from "react"

import { cn } from "@/shared/lib/utils"

/** One label plus value line, used by the detail cards across the dashboard. */
function DetailRow({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: ReactNode
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-b border-border py-2.5 last:border-b-0",
        className
      )}
    >
      <span className="shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="min-w-0 truncate text-sm">{children}</span>
    </div>
  )
}

export { DetailRow }

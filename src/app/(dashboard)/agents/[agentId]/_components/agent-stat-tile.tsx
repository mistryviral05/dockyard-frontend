import type { ReactNode } from "react"

import { Card, CardContent } from "@/shared/components/ui/card"

/** Small reading with no dial, used for the counts next to the gauges. */
function AgentStatTile({
  label,
  value,
  hint,
}: {
  label: string
  value: ReactNode
  hint?: string
}) {
  return (
    <Card size="sm">
      <CardContent className="flex flex-col gap-1">
        <span className="truncate text-xs text-muted-foreground">{label}</span>
        <span className="truncate font-heading text-lg font-semibold tabular-nums">
          {value}
        </span>
        {hint ? (
          <span className="truncate text-xs text-muted-foreground">{hint}</span>
        ) : null}
      </CardContent>
    </Card>
  )
}

export { AgentStatTile }

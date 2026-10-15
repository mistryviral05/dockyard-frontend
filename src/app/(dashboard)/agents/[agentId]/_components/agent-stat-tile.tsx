import type { ReactNode } from "react"

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
    <div className="flex flex-col gap-1 rounded-xl border border-border/40 bg-card px-4 py-3">
      <span className="truncate text-xs text-muted-foreground">{label}</span>
      <span className="truncate font-heading text-lg font-semibold tabular-nums">
        {value}
      </span>
      {hint ? (
        <span className="truncate text-xs text-muted-foreground">{hint}</span>
      ) : null}
    </div>
  )
}

export { AgentStatTile }

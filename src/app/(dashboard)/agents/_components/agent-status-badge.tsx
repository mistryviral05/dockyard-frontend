import { Badge } from "@/shared/components/myui/badge"
import { cn } from "@/shared/lib/utils"
import type { AgentStatus } from "@/features/agent/types"

const statusConfig: Record<
  AgentStatus,
  { label: string; variant: "default" | "primary" | "outline"; dot: string }
> = {
  active: { label: "Active", variant: "primary", dot: "bg-primary" },
  pending: {
    label: "Pending",
    variant: "outline",
    dot: "bg-muted-foreground animate-pulse",
  },
  inactive: {
    label: "Inactive",
    variant: "default",
    dot: "bg-muted-foreground",
  },
  offline: { label: "Offline", variant: "default", dot: "bg-destructive" },
}

function AgentStatusBadge({ status }: { status: AgentStatus }) {
  const { label, variant, dot } = statusConfig[status]

  return (
    <Badge variant={variant} className="gap-1.5 py-1 pr-2.5 pl-2">
      <span className={cn("size-1.5 rounded-full", dot)} />
      {label}
    </Badge>
  )
}

export { AgentStatusBadge }

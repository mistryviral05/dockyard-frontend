import { Badge } from "@/shared/components/myui/badge"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import { cn } from "@/shared/lib/utils"
import type { DeploymentStatus } from "@/features/deployment/types"

/** `pending` covers an agent that has not connected yet, `null` a project with no deployment. */
export type StatusValue = DeploymentStatus | "pending"

type StatusStyle = {
  label: string
  className: string
  dot: string
  /** Non terminal states keep a spinner running instead of a static dot. */
  busy?: boolean
}

const statusStyles: Record<StatusValue, StatusStyle> = {
  pending: {
    label: "Waiting",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  queued: {
    label: "Queued",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
  building: {
    label: "Building",
    className: "bg-info/10 text-info",
    dot: "bg-info",
    busy: true,
  },
  deploying: {
    label: "Deploying",
    className: "bg-info/10 text-info",
    dot: "bg-info",
    busy: true,
  },
  running: {
    label: "Live",
    className: "bg-success/10 text-success",
    dot: "bg-success",
  },
  failed: {
    label: "Failed",
    className: "bg-destructive/10 text-destructive",
    dot: "bg-destructive",
  },
  stopped: {
    label: "Stopped",
    className: "bg-muted text-muted-foreground",
    dot: "bg-muted-foreground",
  },
}

const notDeployed: StatusStyle = {
  label: "Not deployed",
  className: "border border-border text-muted-foreground",
  dot: "bg-border",
}

function StatusBadge({
  status,
  className,
}: {
  status: StatusValue | null
  className?: string
}) {
  const style = (status && statusStyles[status]) || notDeployed

  return (
    <Badge className={cn("gap-1.5 py-1 pr-2.5 pl-2", style.className, className)}>
      {style.busy ? (
        <CircularSpinner size="xs" className="size-3" />
      ) : (
        <span className={cn("size-1.5 rounded-full", style.dot)} />
      )}
      {style.label}
    </Badge>
  )
}

export { StatusBadge }

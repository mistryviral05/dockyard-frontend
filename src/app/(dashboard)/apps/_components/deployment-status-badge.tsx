import { Badge } from "@/shared/components/myui/badge"
import type { DeploymentStatus } from "@/features/project/types"

type StatusStyle = {
  label: string
  variant: "default" | "primary" | "outline"
  dot: string
}

const statusStyles: Record<DeploymentStatus, StatusStyle> = {
  running: { label: "Running", variant: "primary", dot: "bg-primary" },
  building: {
    label: "Building",
    variant: "outline",
    dot: "bg-muted-foreground animate-pulse",
  },
  stopped: { label: "Stopped", variant: "default", dot: "bg-muted-foreground" },
  failed: { label: "Failed", variant: "default", dot: "bg-destructive" },
}

/** A project with no deployment yet comes back with `deployment_status: null`. */
const notDeployed: StatusStyle = {
  label: "Not deployed",
  variant: "outline",
  dot: "bg-border",
}

function DeploymentStatusBadge({ status }: { status: DeploymentStatus | null }) {
  const style = (status && statusStyles[status]) || notDeployed

  return (
    <Badge variant={style.variant} className="gap-1.5">
      <span className={`size-1.5 rounded-full ${style.dot}`} />
      {style.label}
    </Badge>
  )
}

export { DeploymentStatusBadge }

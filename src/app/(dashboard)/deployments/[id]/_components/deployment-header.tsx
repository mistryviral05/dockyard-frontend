import Link from "next/link"
import { format } from "date-fns"
import { ArrowLeft } from "lucide-react"

import { StatusBadge } from "@/shared/components/myui/status-badge"
import type { Deployment, DeploymentStatus } from "@/features/deployment/types"

function DeploymentHeader({
  deployment,
  status,
  projectName,
}: {
  deployment: Deployment
  /** Comes from the live channel when it is ahead of the fetched row. */
  status: DeploymentStatus
  projectName: string
}) {
  const { id, branch, created_at, project_id } = deployment

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={`/apps/${project_id}`}
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to {projectName}
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="font-heading text-2xl font-semibold tracking-tight">
              Deployment
            </h1>
            <StatusBadge status={status} />
          </div>
          <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-mono text-xs">{id}</span>
            <span className="size-1 rounded-full bg-border" />
            <span className="font-mono text-xs">{branch}</span>
            <span className="size-1 rounded-full bg-border" />
            {format(new Date(created_at), "d MMM yyyy, HH:mm")}
          </p>
        </div>
      </div>
    </div>
  )
}

export { DeploymentHeader }

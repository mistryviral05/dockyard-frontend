import Link from "next/link"
import { GitBranch } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/myui/badge"
import { PROJECT_STACK_LABELS } from "@/features/project/schema"
import { StatusBadge } from "@/shared/components/myui/status-badge"
import type { Project } from "@/features/project/types"

function ApplicationCard({ project }: { project: Project }) {
  const { id, project_name, project_stack, repo_name, deployment_status } =
    project

  return (
    <Link
      href={`/apps/${id}`}
      className="group  outline-none "
    >
      <Card className="h-full gap-0 py-0 transition-colors">
        <CardHeader className="flex items-start justify-between gap-3 pt-6">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground uppercase">
            {project_name.slice(0, 2)}
          </span>
          <StatusBadge status={deployment_status} />
        </CardHeader>

        <CardContent className="pt-6 pb-6">
          <CardTitle className="truncate text-lg">{project_name}</CardTitle>

          <p className="mt-1 flex items-center gap-1.5 truncate font-mono text-xs text-muted-foreground">
            <GitBranch className="size-3.5 shrink-0" />
            {repo_name}
          </p>

          <div className="mt-3">
            <Badge variant="outline" className="text-muted-foreground">
              {PROJECT_STACK_LABELS[project_stack] ?? project_stack}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export { ApplicationCard }

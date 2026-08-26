import { format } from "date-fns"
import { GitBranch } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/myui/badge"
import { PROJECT_STACK_LABELS } from "@/features/project/schema"
import { DetailRow } from "@/shared/components/myui/detail-row"
import type { ProjectDetail } from "@/features/project/types"

function ProjectRepositoryCard({ project }: { project: ProjectDetail }) {
  const { project_stack, default_branch, created_at, repository } = project

  return (
    <Card size="sm" className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="size-4 text-muted-foreground" />
          Repository
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        {repository ? (
          <DetailRow label="Source">
            <a
              href={repository.repo_url}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs hover:underline"
            >
              {repository.repo_full_name}
            </a>
          </DetailRow>
        ) : (
          <DetailRow label="Source">
            <span className="text-muted-foreground">No repository linked</span>
          </DetailRow>
        )}

        <DetailRow label="Visibility">
          <Badge variant="outline" className="text-muted-foreground">
            {repository?.is_private ? "Private" : "Public"}
          </Badge>
        </DetailRow>

        <DetailRow label="Default branch">
          <span className="font-mono text-xs">{default_branch}</span>
        </DetailRow>

        <DetailRow label="Stack">
          {PROJECT_STACK_LABELS[project_stack] ?? project_stack}
        </DetailRow>

        <DetailRow label="Created">
          {format(new Date(created_at), "d MMM yyyy")}
        </DetailRow>
      </CardContent>
    </Card>
  )
}

export { ProjectRepositoryCard }

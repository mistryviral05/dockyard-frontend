import Link from "next/link"
import { ArrowLeft, ExternalLink } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/myui/badge"
import { StatusBadge } from "@/shared/components/myui/status-badge"
import { PROJECT_STACK_LABELS } from "@/features/project/schema"
import type { ProjectDetail } from "@/features/project/types"
import { DeployButton } from "./deploy-button"

function ProjectHeader({ project }: { project: ProjectDetail }) {
  const { project_name, project_stack, repository, agent, last_deployment } =
    project

  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/apps"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to projects
      </Link>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-semibold text-muted-foreground uppercase">
            {project_name.slice(0, 2)}
          </span>

          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-heading text-2xl font-semibold tracking-tight">
                {project_name}
              </h1>
              <StatusBadge status={last_deployment?.status ?? null} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="outline" className="text-muted-foreground">
                {PROJECT_STACK_LABELS[project_stack] ?? project_stack}
              </Badge>
              {repository ? (
                <span className="font-mono text-xs text-muted-foreground">
                  {repository.repo_full_name}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {repository ? (
            <Button
              variant="outline"
              size="sm"
              nativeButton={false}
              render={
                <a
                  href={repository.repo_url}
                  target="_blank"
                  rel="noreferrer noopener"
                />
              }
            >
              Repository
              <ExternalLink data-icon="inline-end" />
            </Button>
          ) : null}
          <DeployButton hasAgent={Boolean(agent)} />
        </div>
      </div>
    </div>
  )
}

export { ProjectHeader }

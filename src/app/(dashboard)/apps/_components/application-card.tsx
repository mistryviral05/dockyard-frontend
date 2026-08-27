import Link from "next/link"
import { GitBranch } from "lucide-react"

import { PROJECT_STACK_LABELS } from "@/features/project/schema"
import { StatusBadge } from "@/shared/components/myui/status-badge"
import type { Project } from "@/features/project/types"

function ApplicationCard({ project }: { project: Project }) {
  const { id, project_name, project_stack, repo_name, deployment_status } =
    project

  return (
    // The top padding leaves room for the tile that hangs over the card edge.
    <Link href={`/apps/${id}`} className="group relative block pt-8 outline-none">
      {/*
        A second slab peeking out from under the card. It is what makes the
        whole thing read as lifted rather than painted on the panel.
      */}
      <span
        aria-hidden
        className="absolute inset-x-5 -bottom-1.5 h-12 rounded-2xl bg-foreground/6 transition-all duration-300 ease-out group-hover:inset-x-3 group-hover:-bottom-2.5"
      />

      <div className="relative flex h-full flex-col items-center rounded-3xl border border-border/50 bg-sidebar px-5 pt-12 pb-5 text-center  transition-all duration-300 ease-out group-hover:-translate-y-1 group-hover:border-border/50  group-focus-visible:ring-3 group-focus-visible:ring-ring/40">
        {/* The identity tile, raised on its own so it sits above the card face. */}
        <span className="absolute -top-8 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-3xl border border-white/10 bg-secondary bg-linear-to-b from-white/4 to-transparent text-lg font-semibold text-primary uppercase shadow-raised transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
          {project_name.slice(0, 2)}
        </span>

        <h3 className="w-full truncate font-heading text-base font-medium">
          {project_name}
        </h3>

        <p className="mt-1 text-sm text-muted-foreground">
          {PROJECT_STACK_LABELS[project_stack] ?? project_stack}
        </p>

        <div className="mt-5 flex w-full items-center justify-between gap-3 border-t border-border/40 pt-4">
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-xs text-muted-foreground">
            <GitBranch className="size-3.5 shrink-0" />
            <span className="truncate">{repo_name}</span>
          </span>

          <StatusBadge status={deployment_status} />
        </div>
      </div>
    </Link>
  )
}

export { ApplicationCard }

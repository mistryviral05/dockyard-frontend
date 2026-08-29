import Link from "next/link"
import { format } from "date-fns"
import { ChevronRight } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { StatusBadge } from "@/shared/components/myui/status-badge"
import type { Deployment } from "@/features/deployment/types"
import { ProjectDeploymentsEmptyState } from "./project-deployments-empty-state"

function ProjectDeploymentsTable({
  deployments,
  isLoading = false,
}: {
  deployments: Deployment[]
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <div className="rounded-3xl bg-muted p-1.5">
        <div className="rounded-xl border border-border bg-background">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0"
            >
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="ml-auto h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (deployments.length === 0) {
    return (
      <div className="rounded-xl bg-muted p-1.5">
        <ProjectDeploymentsEmptyState />
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-sidebar p-1.5">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Branch
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Commit
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Trigger
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Started
            </TableHead>
            <TableHead className="h-10 w-12 px-4" />
          </TableRow>
        </TableHeader>

        <TableBody
          className=" [&_td]:border-border/40 bg-secondary
            [&_tr:first-child_td:first-child]:rounded-tl-xl
            [&_tr:first-child_td:last-child]:rounded-tr-xl
            [&_tr:last-child_td:first-child]:rounded-bl-xl
            [&_tr:last-child_td:last-child]:rounded-br-xl
            "
        >
          {deployments.map((deployment) => (
            <TableRow
              key={deployment.id}
              className="group border-0  rounded-md hover:bg-transparent   cursor-pointer relative isolate [clip-path:inset(0)] transform-[translateZ(0)] after:absolute after:inset-1 after:-z-10 after:rounded-md after:pointer-events-none after:transition-colors hover:after:bg-accent/50"
            >
              <TableCell className="px-4 py-3">
                <Link href={`#`} className='static appearance-none focus-visible:relative focus-visible:z-5  inset-0 before:absolute before:inset-1 before:z-0 before:block before:rounded-md before:pointer-events-auto' />
                <StatusBadge status={deployment.status} />
              </TableCell>
              <TableCell className="px-4 py-3 font-mono text-xs">
                {deployment.branch}
              </TableCell>
              <TableCell className="px-4 py-3">
                {deployment.commit_sha ? (
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <span className="font-mono text-xs">
                      {deployment.commit_sha.slice(0, 7)}
                    </span>
                    <span className="max-w-56 truncate text-xs text-muted-foreground transition-colors group-hover:text-white">
                      {deployment.commit_message}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs text-muted-foreground transition-colors group-hover:text-white">
                    No commit
                  </span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 text-xs text-muted-foreground transition-colors group-hover:text-white">
                {deployment.trigger_source === "manual" ? "Manual" : "Webhook"}
              </TableCell>
              <TableCell className="px-4 py-3 text-xs text-muted-foreground transition-colors group-hover:text-white">
                {format(
                  new Date(deployment.started_at ?? deployment.created_at),
                  "d MMM, HH:mm"
                )}
              </TableCell>
              <TableCell className="px-4 py-3">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Open deployment"
                  nativeButton={false}
                  render={<Link href={`/deployments/${deployment.id}`} />}
                >
                  <ChevronRight />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { ProjectDeploymentsTable }

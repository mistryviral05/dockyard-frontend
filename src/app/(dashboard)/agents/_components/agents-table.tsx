"use client"

import { Bot, ChevronRight } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import { agentQueries } from "@/features/agent/useAgentQueries"
import { AgentStatusBadge } from "@/shared/components/myui/agent-status-badge"
import { AgentsEmptyState } from "./agents-empty-state"
import { AgentsTableSkeleton } from "./agents-table-skeleton"

function AgentsTable() {
  const { data: agents, isLoading, isError } = agentQueries.useGetAgents()

  if (isLoading) {
    return (
      <div className="rounded-xl bg-muted p-1.5">
        <AgentsTableSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-xl bg-muted p-1.5">
        <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
          Could not load your agents. Please try again.
        </div>
      </div>
    )
  }

  if (!agents || agents.length === 0) {
    return (
      <div className="rounded-xl bg-muted p-1.5">
        <AgentsEmptyState />
      </div>
    )
  }

  return (
    <div className="rounded-3xl bg-sidebar p-1.5">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className="h-10 w-12 px-4 text-xs font-medium text-muted-foreground">
              #
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Agent
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Status
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Subdomain
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Port
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
          {agents.map((agent, index) => (
            <TableRow
              key={agent.id}
              className="group relative isolate rounded-md border-0 transform-[translateZ(0)] [clip-path:inset(0)] after:pointer-events-none after:absolute after:inset-1 after:-z-10 after:rounded-md after:transition-colors hover:bg-transparent hover:after:bg-accent/50"
            >
              <TableCell className="px-4 py-3 text-xs tabular-nums text-muted-foreground transition-colors group-hover:text-white">
                {index + 1}
              </TableCell>
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="size-4" />
                  </span>
                  <span className="font-medium">{agent.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3">
                <AgentStatusBadge status={agent.status} />
              </TableCell>
              <TableCell className="px-4 py-3 font-mono text-xs">
                {agent.subdomain ?? (
                  <span className="text-muted-foreground transition-colors group-hover:text-white">
                    —
                  </span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 font-mono text-xs text-muted-foreground transition-colors group-hover:text-white">
                {agent.port}
              </TableCell>
              <TableCell className="px-4 py-3">
                <span
                  aria-hidden
                  className="pointer-events-none flex size-8 items-center justify-center text-muted-foreground transition-colors group-hover:text-white"
                >
                  <ChevronRight className="size-4" />
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { AgentsTable }

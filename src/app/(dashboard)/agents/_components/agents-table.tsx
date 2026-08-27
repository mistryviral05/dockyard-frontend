"use client"

import { Bot } from "lucide-react"

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
          </TableRow>
        </TableHeader>

        <TableBody
          className=" [&_td]:border-border/40 [&_td]:bg-secondary
            [&_tr:first-child_td:first-child]:rounded-tl-xl
            [&_tr:first-child_td:last-child]:rounded-tr-xl
            [&_tr:last-child_td:first-child]:rounded-bl-xl
            [&_tr:last-child_td:last-child]:rounded-br-xl
            "
        >
          {agents.map((agent, index) => (
            <TableRow key={agent.id} className="border-0 hover:bg-transparent">
              <TableCell className="px-4 py-3 text-xs tabular-nums text-muted-foreground">
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
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {agent.port}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { AgentsTable }

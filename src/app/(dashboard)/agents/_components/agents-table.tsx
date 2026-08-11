import { Bot } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"
import type { Agent } from "@/features/agent/types"
import { AgentStatusBadge } from "./agent-status-badge"
import { AgentsEmptyState } from "./agents-empty-state"

// TODO: replace with GET /v1/agents once the feature layer exists.
const agents: Agent[] = [
  {
    id: "agent_tz4k91xw0q8n2mv7bd3ls6yh",
    name: "Build Agent",
    status: "pending",
    subdomain: null,
    port: "8999",
  },
  {
    id: "agent_9m2xq7pv4hd1sc8kt5nr3wbz",
    name: "Deploy Agent",
    status: "active",
    subdomain: "deploy-agent.viralmistry.dev",
    port: "8999",
  },
]

function AgentsTable() {
  if (agents.length === 0) {
    return (
      <div className="rounded-2xl bg-muted p-1.5">
        <AgentsEmptyState />
      </div>
    )
  }

  return (
    <div className="rounded-2xl bg-muted p-1.5">
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
          className="[&_td]:border-b [&_td]:border-border [&_td]:bg-background
            [&_tr:first-child_td]:border-t
            [&_tr:first-child_td:first-child]:rounded-tl-xl
            [&_tr:first-child_td:last-child]:rounded-tr-xl
            [&_tr:last-child_td:first-child]:rounded-bl-xl
            [&_tr:last-child_td:last-child]:rounded-br-xl
            [&_tr_td:first-child]:border-l [&_tr_td:last-child]:border-r"
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

import { Bot } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table"

export type Agent = {
  id: string
  name: string
  command: string
}

const agents: Agent[] = [
  {
    id: "agt_8f2k91",
    name: "Build Agent",
    command: "dockyard run build-agent",
  },
  {
    id: "agt_2c7m04",
    name: "Deploy Agent",
    command: "dockyard run deploy-agent",
  },
  {
    id: "agt_5t1p66",
    name: "Log Collector",
    command: "dockyard run log-collector",
  },
]

function AgentsTable() {
  return (
    <div className="rounded-2xl bg-gray-50 p-1.5 ">
      <Table className="border-separate border-spacing-0">
        <TableHeader>
          <TableRow className="border-0 hover:bg-transparent">
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Agent
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              ID
            </TableHead>
            <TableHead className="h-10 px-4 text-xs font-medium text-muted-foreground">
              Run Command
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
          {agents.map((agent) => (
            <TableRow key={agent.id} className="border-0 hover:bg-transparent">
              <TableCell className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Bot className="size-4" />
                  </span>
                  <span className="font-medium">{agent.name}</span>
                </div>
              </TableCell>
              <TableCell className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {agent.id}
              </TableCell>
              <TableCell className="px-4 py-3">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {agent.command}
                </code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export { AgentsTable }

import { Card } from "@/shared/components/ui/card"
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
    <Card className="py-0">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-6">Agent</TableHead>
            <TableHead>ID</TableHead>
            <TableHead className="pr-6">Run Command</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {agents.map((agent) => (
            <TableRow key={agent.id}>
              <TableCell className="pl-6 font-medium">{agent.name}</TableCell>
              <TableCell className="font-mono text-xs text-muted-foreground">
                {agent.id}
              </TableCell>
              <TableCell className="pr-6">
                <code className="rounded-md bg-muted px-2 py-1 font-mono text-xs">
                  {agent.command}
                </code>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  )
}

export { AgentsTable }

import { AgentsTable } from "./_components/agents-table"
import { CreateAgentButton } from "./_components/create-agent-button"

export default function AgentsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Agents
        </h1>
        <CreateAgentButton />
      </div>
      <div className="mt-8">
        <AgentsTable />
      </div>
    </div>
  )
}

import { Bot } from "lucide-react"

function AgentsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-xl border border-border bg-background px-6 py-16 text-center">
      <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Bot className="size-5" />
      </span>
      <p className="mt-2 font-medium">No agents yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Create an agent to connect one of your servers and start running builds
        and deployments on it.
      </p>
    </div>
  )
}

export { AgentsEmptyState }

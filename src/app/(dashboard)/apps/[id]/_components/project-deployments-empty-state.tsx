import { Rocket } from "lucide-react"

function ProjectDeploymentsEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-border bg-background px-6 py-16 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Rocket className="size-4" />
      </span>
      <p className="text-sm font-medium">No deployments yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Connect an agent and deploy this project to see the history here.
      </p>
    </div>
  )
}

export { ProjectDeploymentsEmptyState }

import { Terminal } from "lucide-react"

function DeploymentLogsEmptyState() {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-16 text-center">
      <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Terminal className="size-4" />
      </span>
      <p className="text-sm font-medium">No logs yet</p>
      <p className="max-w-sm text-sm text-muted-foreground">
        Lines show up here as soon as the build starts.
      </p>
    </div>
  )
}

export { DeploymentLogsEmptyState }

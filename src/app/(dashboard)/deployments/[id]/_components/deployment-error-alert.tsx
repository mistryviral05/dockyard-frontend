import { TriangleAlert } from "lucide-react"

function DeploymentErrorAlert({ message }: { message: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-destructive">
          This deployment failed
        </p>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  )
}

export { DeploymentErrorAlert }

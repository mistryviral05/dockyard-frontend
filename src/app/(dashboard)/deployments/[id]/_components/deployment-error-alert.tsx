import Link from "next/link"
import { TriangleAlert } from "lucide-react"

/** The api sends this when the project has no server picked yet. */
const NO_SERVER = "no server is attached to this project"

function DeploymentErrorAlert({
  message,
  projectId,
}: {
  message: string
  /** Lets the alert point at the Server card when no server is attached. */
  projectId?: string
}) {
  const needsServer = message.toLowerCase().includes(NO_SERVER)

  return (
    <div className="flex items-start gap-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3">
      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-destructive" />
      <div className="flex flex-col gap-1">
        <p className="text-sm font-medium text-destructive">
          This deployment failed
        </p>
        <p className="text-sm text-muted-foreground">{message}</p>
        {needsServer && projectId ? (
          <p className="text-sm text-muted-foreground">
            Pick one in the Server card on the{" "}
            <Link
              href={`/apps/${projectId}`}
              className="text-primary transition-colors hover:text-primary/80"
            >
              project page
            </Link>
            , then deploy again.
          </p>
        ) : null}
      </div>
    </div>
  )
}

export { DeploymentErrorAlert }

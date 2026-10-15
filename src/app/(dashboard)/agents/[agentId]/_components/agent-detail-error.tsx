import Link from "next/link"
import { isAxiosError } from "axios"
import { ArrowLeft } from "lucide-react"

/** The API answers 404 for an agent that is missing or owned by someone else. */
function message(error: unknown) {
  if (isAxiosError(error) && error.response?.status === 404) {
    return "This agent does not exist, or it is not part of your account."
  }

  return "Could not load this agent. Please try again."
}

function AgentDetailError({ error }: { error: unknown }) {
  return (
    <div className="flex flex-col gap-6">
      <Link
        href="/agents"
        className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to agents
      </Link>

      <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
        {message(error)}
      </div>
    </div>
  )
}

export { AgentDetailError }

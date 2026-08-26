import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import type { DeploymentStatus } from "@/features/deployment/types"

const steps = [
  { key: "queued", label: "Queued" },
  { key: "building", label: "Building" },
  { key: "deploying", label: "Deploying" },
  { key: "running", label: "Live" },
] as const

/** How far the deployment got, failed and stopped land on the last step. */
function currentStepIndex(status: DeploymentStatus) {
  const index = steps.findIndex((step) => step.key === status)
  return index === -1 ? steps.length - 1 : index
}

function DeploymentTimeline({ status }: { status: DeploymentStatus }) {
  const activeIndex = currentStepIndex(status)
  const hasFailed = status === "failed"

  return (
    <ol className="flex flex-wrap items-center gap-2">
      {steps.map((step, index) => {
        const isDone = index < activeIndex
        const isActive = index === activeIndex
        const isFailedStep = isActive && hasFailed
        const isBusy =
          isActive && (status === "building" || status === "deploying")

        return (
          <li key={step.key} className="flex items-center gap-2">
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs font-medium",
                isDone && "border-transparent bg-success/10 text-success",
                isActive &&
                  !isFailedStep &&
                  "border-transparent bg-info/10 text-info",
                isFailedStep &&
                  "border-transparent bg-destructive/10 text-destructive",
                !isDone && !isActive && "text-muted-foreground"
              )}
            >
              {isDone ? (
                <CheckIcon className="size-3" />
              ) : isFailedStep ? (
                <XIcon className="size-3" />
              ) : (
                <span
                  className={cn(
                    "size-1.5 rounded-full bg-current",
                    isBusy && "animate-pulse"
                  )}
                />
              )}
              {isFailedStep ? "Failed" : step.label}
            </div>

            {index < steps.length - 1 ? (
              <span
                className={cn(
                  "h-px w-6",
                  index < activeIndex ? "bg-success" : "bg-border"
                )}
              />
            ) : null}
          </li>
        )
      })}
    </ol>
  )
}

export { DeploymentTimeline }

"use client"

import { usePathname } from "next/navigation"
import { Check } from "lucide-react"

import { cn } from "@/shared/lib/utils"

/** The flow is two screens, pick a repository then describe the project. */
const steps = [
  { path: "/apps/new", label: "Repository" },
  { path: "/apps/new/import", label: "Configure" },
]

function NewProjectSteps() {
  const pathname = usePathname()
  const current = Math.max(
    steps.findIndex((step) => step.path === pathname),
    0
  )

  return (
    <ol className="flex items-center gap-2 text-xs">
      {steps.map((step, index) => {
        const isDone = index < current
        const isActive = index === current

        return (
          <li key={step.path} className="flex items-center gap-2">
            {index > 0 ? (
              <span
                aria-hidden
                className={cn(
                  "h-px w-6 sm:w-10",
                  isDone || isActive ? "bg-primary/50" : "bg-border"
                )}
              />
            ) : null}

            <span
              className={cn(
                "flex items-center gap-2 rounded-full py-1 pr-3 pl-1 transition-colors",
                isActive && "bg-muted"
              )}
              aria-current={isActive ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex size-5 items-center justify-center rounded-full border text-[11px] font-medium",
                  isDone && "border-primary/40 bg-primary/15 text-primary",
                  isActive && "border-primary bg-primary text-primary-foreground",
                  !isDone && !isActive && "border-border text-muted-foreground"
                )}
              >
                {isDone ? <Check className="size-3" /> : index + 1}
              </span>

              <span
                className={cn(
                  "font-medium",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.label}
              </span>
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export { NewProjectSteps }

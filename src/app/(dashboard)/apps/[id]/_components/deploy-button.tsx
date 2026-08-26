"use client"

import { Rocket } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"

const noAgentMessage =
  "this project has no server connected, connect an agent before deploying"

function DeployButton({ hasAgent }: { hasAgent: boolean }) {
  const button = (
    <Button size="sm" disabled={!hasAgent}>
      <Rocket data-icon="inline-start" />
      Deploy
    </Button>
  )

  // A project without an agent cannot deploy, so the reason lives in a tooltip.
  if (hasAgent) {
    return button
  }

  return (
    <Tooltip>
      <TooltipTrigger render={<span className="inline-flex" />}>
        {button}
      </TooltipTrigger>
      <TooltipContent>{noAgentMessage}</TooltipContent>
    </Tooltip>
  )
}

export { DeployButton }

"use client"

import { useRouter } from "next/navigation"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useSnackbar } from "notistack"
import { Rocket } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/shared/components/ui/tooltip"
import { projectQueries } from "@/features/project/useProjectQueries"
import type { ProjectErrorResponse } from "@/features/project/types"

const noAgentMessage =
  "this project has no server connected, connect an agent before deploying"

function DeployButton({
  projectId,
  hasAgent,
}: {
  projectId: string
  hasAgent: boolean
}) {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate: deploy, isPending } =
    projectQueries.useDeployProject(projectId)

  const startDeployment = () => {
    deploy(undefined, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({ queryKey: ["project", projectId] })
        queryClient.invalidateQueries({
          queryKey: ["project-deployments", projectId],
        })
        router.push(`/deployments/${response.data.deployment_id}`)
      },
      onError: (error) => {
        const message = isAxiosError<ProjectErrorResponse>(error)
          ? error.response?.data?.error
          : undefined
        enqueueSnackbar(
          message ?? "Failed to start the deployment, please try again",
          { variant: "error", autoHideDuration: 3000 }
        )
      },
    })
  }

  const button = (
    <Button size="sm" disabled={!hasAgent || isPending} onClick={startDeployment}>
      {isPending ? (
        <CircularSpinner size="xs" data-icon="inline-start" />
      ) : (
        <Rocket data-icon="inline-start" />
      )}
      {isPending ? "Starting" : "Deploy"}
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

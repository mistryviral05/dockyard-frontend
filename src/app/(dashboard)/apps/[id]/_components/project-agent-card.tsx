"use client"

import { useState } from "react"
import Link from "next/link"
import { useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useSnackbar } from "notistack"
import { Server } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { AgentStatusBadge } from "@/shared/components/myui/agent-status-badge"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import { projectQueries } from "@/features/project/useProjectQueries"
import type { Agent } from "@/features/agent/types"
import type { ProjectAgent, ProjectErrorResponse } from "@/features/project/types"

function ProjectAgentCard({
  projectId,
  agent,
  agents,
}: {
  projectId: string
  agent: ProjectAgent | null
  agents: Agent[]
}) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    agent?.id ?? null
  )
  const queryClient = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate: setAgent, isPending } =
    projectQueries.useSetProjectAgent(projectId)

  const connectAgent = () => {
    if (!selectedAgentId) {
      return
    }

    setAgent(selectedAgentId, {
      // The api answers with the whole project, so the cache can take it as is.
      onSuccess: (response) => {
        queryClient.setQueryData(["project", projectId], response)
        enqueueSnackbar("Server connected to this project", {
          variant: "success",
          autoHideDuration: 3000,
        })
      },
      onError: (error) => {
        const message = isAxiosError<ProjectErrorResponse>(error)
          ? error.response?.data?.error
          : undefined
        enqueueSnackbar(message ?? "Failed to set the agent, please try again", {
          variant: "error",
          autoHideDuration: 3000,
        })
      },
    })
  }

  const nameById = (value: string | null) =>
    agents.find((item) => item.id === value)?.name ?? "Select agent"

  return (
    <Card size="sm" className="h-full">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <Server className="size-4 text-muted-foreground" />
          Server
        </CardTitle>
        {agent ? <AgentStatusBadge status={agent.status} /> : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {agent ? (
          <div className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-2.5">
            <span className="truncate text-sm font-medium">{agent.name}</span>
            <span className="font-mono text-xs text-muted-foreground">
              port {agent.port}
            </span>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            Pick the server this project should run on.
          </p>
        )}

        {agents.length === 0 ? (
          <Button
            variant="outline"
            size="sm"
            nativeButton={false}
            render={<Link href="/agents" />}
          >
            Create agent
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={selectedAgentId}
              onValueChange={(value) => setSelectedAgentId(value as string)}
            >
              <SelectTrigger className="min-w-48 flex-1">
                <SelectValue placeholder="Select agent">
                  {(value: string | null) => nameById(value)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {agents.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              size="sm"
              disabled={
                !selectedAgentId || selectedAgentId === agent?.id || isPending
              }
              onClick={connectAgent}
            >
              {isPending ? (
                <CircularSpinner size="xs" data-icon="inline-start" />
              ) : null}
              {agent ? "Change" : "Connect"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ProjectAgentCard }

"use client"

import { useState } from "react"
import Link from "next/link"
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
import type { Agent } from "@/features/agent/types"
import type { ProjectAgent } from "@/features/project/types"

function ProjectAgentCard({
  agent,
  agents,
}: {
  agent: ProjectAgent | null
  agents: Agent[]
}) {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(
    agent?.id ?? null
  )

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
              disabled={!selectedAgentId || selectedAgentId === agent?.id}
            >
              {agent ? "Change" : "Connect"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export { ProjectAgentCard }

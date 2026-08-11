"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { TriangleAlert } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
  createAgentSchema,
  DEFAULT_AGENT_PORT,
  type CreateAgentPayload,
  type CreateAgentValues,
} from "@/features/agent/schema"
import type { CreatedAgent } from "@/features/agent/types"
import { AgentRunCommand } from "./agent-run-command"

/**
 * Stand-in for the POST /v1/agents response so the install step can be built
 * before the feature layer exists. Replace with the real mutation result.
 */
function buildPlaceholderAgent(values: CreateAgentPayload): CreatedAgent {
  const now = Date.now()
  const token = "agt_9Kx2Lm4vQpR7sT1uW3yZ5aB8cD0eF6gH2jK4nP6qS8u"

  return {
    id: "agent_tz4k91xw0q8n2mv7bd3ls6yh",
    name: values.name,
    status: "pending",
    port: values.port,
    created_at: new Date(now).toISOString(),
    token,
    token_expires_at: new Date(now + 900 * 1000).toISOString(),
    token_expires_in: 900,
    run_command: `curl -fsSL http://localhost:8080/api/v1/agents/install.sh | bash -s -- --token ${token} --server http://localhost:8080 --port ${values.port}`,
  }
}

function CreateAgentDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Set once the agent is created — swaps the dialog to the install step.
  const [created, setCreated] = useState<CreatedAgent | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAgentValues, unknown, CreateAgentPayload>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: { name: "", port: "" },
  })

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      reset()
      setCreated(null)
    }
    onOpenChange(next)
  }

  const onSubmit = (values: CreateAgentPayload) => {
    // TODO: wire up POST /v1/agents once the feature layer exists — the
    // response replaces this placeholder and feeds the install step below.
    console.log(values)
    setCreated(buildPlaceholderAgent(values))
  }

  if (created) {
    return (
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Install {created.name}</DialogTitle>
            <DialogDescription>
              Run this command on the server that should host the agent.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-start gap-2 rounded-2xl bg-destructive/10 p-3 text-xs text-destructive">
            <TriangleAlert className="mt-px size-4 shrink-0" />
            <p>
              This command is shown only once. If it expires or you lose it,
              you will have to create a new agent to get a new one.
            </p>
          </div>

          <AgentRunCommand
            command={created.run_command}
            expiresAt={created.token_expires_at}
          />

          <DialogFooter>
            <DialogClose render={<Button type="button" />}>Done</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create agent</DialogTitle>
          <DialogDescription>
            Agents run on your server and take care of builds and deployments.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="agent-name">Name</Label>
            <Input
              id="agent-name"
              placeholder="Build Agent"
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-xs text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="agent-port">
              Port
              <span className="text-xs font-normal text-muted-foreground">
                Optional
              </span>
            </Label>
            <Input
              id="agent-port"
              inputMode="numeric"
              placeholder={DEFAULT_AGENT_PORT}
              aria-invalid={!!errors.port}
              {...register("port")}
            />
            {errors.port ? (
              <p className="text-xs text-destructive">{errors.port.message}</p>
            ) : (
              <p className="text-xs text-muted-foreground">
                Leave empty to use the default port {DEFAULT_AGENT_PORT}.
              </p>
            )}
          </div>

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit">Create agent</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateAgentDialog }

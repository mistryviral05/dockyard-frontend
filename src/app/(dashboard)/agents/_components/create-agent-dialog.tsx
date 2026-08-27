"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "notistack"
import { isAxiosError } from "axios"
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
import { agentQueries } from "@/features/agent/useAgentQueries"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import { AgentRunCommand } from "./agent-run-command"

function CreateAgentDialog({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  // Set once the agent is created — swaps the dialog to the install step.
  const [created, setCreated] = useState<CreatedAgent | null>(null)
  const qc = useQueryClient()
  const { enqueueSnackbar } = useSnackbar()
  const { mutate: create, isPending } = agentQueries.useCreateAgent()

  const {
    register,
    handleSubmit,
    reset,
    setError,
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
    create(values, {
      onSuccess: (response) => {
        qc.invalidateQueries({ queryKey: ["agents"] })
        setCreated(response.data)
      },
      onError: (err) => {
        // The API answers 409 when the name is already taken.
        if (isAxiosError(err) && err.response?.status === 409) {
          setError("name", {
            message: "An agent with this name already exists",
          })
          return
        }
        enqueueSnackbar("Failed to create agent", {
          variant: "error",
          autoHideDuration: 3000,
        })
      },
    })
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

          <div className="flex items-start gap-2 rounded-xl bg-destructive/10 p-3 text-xs text-destructive">
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
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <CircularSpinner size={"xs"} /> Creating...
                </>
              ) : (
                "Create agent"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export { CreateAgentDialog }

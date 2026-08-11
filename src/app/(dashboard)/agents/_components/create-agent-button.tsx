"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { CreateAgentDialog } from "./create-agent-dialog"

function CreateAgentButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button className="gap-1.5" onClick={() => setOpen(true)}>
        <Plus className="size-4" />
        Create Agent
      </Button>
      <CreateAgentDialog open={open} onOpenChange={setOpen} />
    </>
  )
}

export { CreateAgentButton }

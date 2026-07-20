import { Plus } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

function CreateAgentButton() {
  return (
    <Button className="gap-1.5">
      <Plus className="size-4" />
      Create Agent
    </Button>
  )
}

export { CreateAgentButton }

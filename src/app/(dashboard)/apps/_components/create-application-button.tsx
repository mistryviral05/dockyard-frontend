import Link from "next/link"
import { Plus } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

function CreateApplicationButton() {
  return (
    <Button nativeButton={false} render={<Link href="/apps/new" />}>
      <Plus data-icon="inline-start" />
      Create application
    </Button>
  )
}

export { CreateApplicationButton }

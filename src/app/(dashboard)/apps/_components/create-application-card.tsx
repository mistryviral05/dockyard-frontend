import { Plus } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import Link from "next/link"

function CreateApplicationCard({ className }: { className?: string }) {
  return (
    <Link href="/apps/new" >
      <button
        type="button"
        className={cn(
          "group flex min-h-50 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-border/20 text-muted-foreground transition-colors outline-none hover:border-primary/30 hover:bg-muted/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
          className
        )}
      >
        <span className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-primary group-hover:text-background">
          <Plus className="size-5" />
        </span>
        <span className="text-sm font-medium">Create application</span>
      </button>
    </Link>
  )
}

export { CreateApplicationCard }

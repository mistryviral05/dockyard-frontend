import { Plus } from "lucide-react"

import { cn } from "@/shared/lib/utils"

function CreateApplicationCard({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={cn(
        "group flex min-h-50 w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-transparent text-muted-foreground transition-colors outline-none hover:border-foreground/30 hover:bg-muted/40 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background cursor-pointer",
        className
      )}
    >
      <span className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors group-hover:bg-foreground group-hover:text-background">
        <Plus className="size-5" />
      </span>
      <span className="text-sm font-medium">Create application</span>
    </button>
  )
}

export { CreateApplicationCard }

import Link from "next/link"
import { Plus } from "lucide-react"

import { cn } from "@/shared/lib/utils"

function CreateApplicationCard({ className }: { className?: string }) {
  return (
    // The same top padding as an application card so both line up in the grid.
    <Link
      href="/apps/new"
      className={cn("group relative block pt-8 outline-none", className)}
    >
      <div className="flex h-full min-h-46 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-foreground/2 text-muted-foreground transition-colors duration-300 group-hover:border-primary/40 group-hover:bg-foreground/4 group-hover:text-foreground group-focus-visible:ring-3 group-focus-visible:ring-ring/40">
        <span className="flex size-11 items-center justify-center rounded-2xl border border-white/10 bg-secondary bg-linear-to-b from-white/14 to-transparent text-primary shadow-raised transition-transform duration-300 ease-out group-hover:-translate-y-0.5">
          <Plus className="size-5" />
        </span>

        <span className="text-sm font-medium">Create application</span>
      </div>
    </Link>
  )
}

export { CreateApplicationCard }

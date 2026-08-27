import Link from "next/link"
import { Container } from "lucide-react"

function SidebarBrand() {
  return (
    <Link
      href="/apps"
      className="flex items-center gap-3 rounded-lg px-2 py-1.5 outline-none transition-colors hover:bg-sidebar-accent/60 focus-visible:bg-sidebar-accent/60"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
        <Container className="size-5" />
      </span>

      <span className="flex min-w-0 flex-col">
        <span className="truncate font-heading text-sm font-semibold tracking-tight">
          Dockyard
        </span>
        <span className="text-[11px] text-muted-foreground">early access</span>
      </span>
    </Link>
  )
}

export { SidebarBrand }

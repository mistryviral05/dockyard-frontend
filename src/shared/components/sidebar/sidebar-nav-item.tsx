"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

export type SidebarNavEntry = {
  label: string
  href: string
  icon: LucideIcon
}

function SidebarNavItem({
  item,
  onNavigate,
}: {
  item: SidebarNavEntry
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isActive =
    pathname === item.href || pathname.startsWith(`${item.href}/`)

  const Icon = item.icon

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      data-active={isActive}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors",
        "hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
        "focus-visible:bg-sidebar-accent/70 focus-visible:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground"
      )}
    >
      {/* A short bar on the edge marks the current section without shouting. */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1/2 -left-2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-opacity",
          "group-data-[active=true]:opacity-100"
        )}
      />
      <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-data-[active=true]:text-primary group-hover:text-foreground" />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export { SidebarNavItem }

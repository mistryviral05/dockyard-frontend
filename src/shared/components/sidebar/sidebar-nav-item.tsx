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
        // The current item is marked with colour alone. Only hover and focus
        // paint a background, so the rail stays quiet while you read it.
        "group relative flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground outline-none transition-colors",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:bg-muted focus-visible:text-foreground",
        "data-[active=true]:text-primary"
      )}
    >
      <Icon className="size-4 shrink-0 text-muted-foreground transition-colors group-data-[active=true]:text-primary group-hover:text-foreground" />
      <span className="truncate">{item.label}</span>
    </Link>
  )
}

export { SidebarNavItem }

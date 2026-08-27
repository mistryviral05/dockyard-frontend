"use client"

import { LayoutGrid, Server } from "lucide-react"

import { SidebarBrand } from "./sidebar-brand"
import { SidebarNavItem, type SidebarNavEntry } from "./sidebar-nav-item"
import { SidebarUserCard } from "./sidebar-user-card"
import { SidebarWorkspaceSwitcher } from "./sidebar-workspace-switcher"

const entries: SidebarNavEntry[] = [
  { label: "Applications", href: "/apps", icon: LayoutGrid },
  { label: "Agents", href: "/agents", icon: Server },
]

/**
 * The panel body. It is shared by the fixed desktop rail and the mobile
 * overlay, so neither copy of the navigation can drift from the other.
 */
function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6 px-3 py-4">
      <SidebarBrand />

      <SidebarWorkspaceSwitcher />

      <nav className="flex flex-col gap-1">
        <span className="px-3 pb-1 text-[11px] tracking-wide text-muted-foreground">
          menu
        </span>

        {entries.map((entry) => (
          <SidebarNavItem
            key={entry.href}
            item={entry}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      {/* A rule separates the account block from the navigation above it. */}
      <div className="mt-auto border-t border-sidebar-border pt-4">
        <SidebarUserCard />
      </div>
    </div>
  )
}

export { SidebarContent }

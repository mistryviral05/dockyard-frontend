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
    <div className="flex h-full flex-col gap-6  py-4">
      <div className="px-3">
        <SidebarBrand />

      </div>

      <div className="px-3">

        <SidebarWorkspaceSwitcher />
      </div>

      <nav className="flex flex-col gap-1">
        <div className="px-4.5 ">

          <span className="px-2 py-1.5 text-[11px] tracking-wide  bg-secondary  rounded-md w-fit text-muted-foreground font-semibold">
            Menu
          </span>
        </div>

        {entries.map((entry) => (
          <SidebarNavItem
            key={entry.href}
            item={entry}
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div className="px-3 mt-auto">

      {/* A rule separates the account block from the navigation above it. */}
      <div className=" pt-4">
        <SidebarUserCard />
      </div>
      </div>
    </div>
  )
}

export { SidebarContent }

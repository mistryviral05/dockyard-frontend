"use client"

import { useState } from "react"

import { AppSidebar } from "@/shared/components/sidebar/app-sidebar"

import { DashboardTopbar } from "./dashboard-topbar"

/**
 * Owns the one piece of state the rail and the top bar share: whether the
 * mobile menu is open.
 */
function DashboardShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex min-h-dvh w-full bg-background">
      <AppSidebar open={menuOpen} onOpenChange={setMenuOpen} />

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar onOpenMenu={() => setMenuOpen(true)} />

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}

export { DashboardShell }

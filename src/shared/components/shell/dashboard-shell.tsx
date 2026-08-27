"use client"

import { useState } from "react"

import { PanelPattern } from "@/shared/components/myui/panel-pattern"
import { AppSidebar } from "@/shared/components/sidebar/app-sidebar"

import { DashboardTopbar } from "./dashboard-topbar"

/**
 * The rail sits on the black canvas and the content lives in a rounded panel
 * inset from the edges, so the two surfaces stay visually separate. Only the
 * panel scrolls, which keeps the rail and the breadcrumb in place.
 */
function DashboardShell({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background">
      <AppSidebar open={menuOpen} onOpenChange={setMenuOpen} />

      <div className="flex min-w-0 flex-1 p-2 lg:py-3 lg:pr-3 lg:pl-0">
        <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl  bg-panel">
          {/* Sits behind the content and only adds line work, never a colour. */}
          <PanelPattern />

          <DashboardTopbar onOpenMenu={() => setMenuOpen(true)} />

          <main className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-15">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

export { DashboardShell }

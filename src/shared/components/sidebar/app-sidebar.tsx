"use client"

import { X } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"

import { SidebarContent } from "./sidebar-content"

/**
 * Below the large breakpoint the rail slides in over the page instead of
 * taking a column, so narrow screens keep their full width for content.
 */
function AppSidebar({
  open,
  onOpenChange,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  return (
    <>
      <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
        <div className="sticky top-0 h-dvh">
          <SidebarContent />
        </div>
      </aside>

      <div
        aria-hidden={!open}
        className={cn(
          "fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden",
          open ? "block" : "hidden"
        )}
        onClick={() => onOpenChange(false)}
      />

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 border-r border-sidebar-border bg-sidebar transition-transform lg:hidden",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Close menu"
          className="absolute top-4 right-3"
          onClick={() => onOpenChange(false)}
        >
          <X />
        </Button>

        <SidebarContent onNavigate={() => onOpenChange(false)} />
      </aside>
    </>
  )
}

export { AppSidebar }

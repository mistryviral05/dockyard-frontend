"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"

import { Button } from "@/shared/components/ui/button"

const sectionTitles: Record<string, string> = {
  apps: "Applications",
  agents: "Agents",
  deployments: "Deployments",
}

function DashboardTopbar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname()

  // The first segment is the section, anything after it is a single record.
  const [section, detail] = pathname.split("/").filter(Boolean)
  const title = sectionTitles[section] ?? "Dashboard"

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur sm:px-6">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Open menu"
        className="lg:hidden"
        onClick={onOpenMenu}
      >
        <Menu />
      </Button>

      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <span className={detail ? "text-muted-foreground" : "font-medium"}>
          {title}
        </span>

        {detail ? (
          <>
            <span className="text-muted-foreground">/</span>
            <span className="max-w-40 truncate font-medium sm:max-w-xs">
              {detail}
            </span>
          </>
        ) : null}
      </nav>
    </header>
  )
}

export { DashboardTopbar }

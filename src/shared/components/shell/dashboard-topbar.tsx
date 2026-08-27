"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight, Menu } from "lucide-react"

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
    <header className="flex h-18 shrink-0 items-center gap-3 px-4 sm:px-15">
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label="Open menu"
        className="lg:hidden"
        onClick={onOpenMenu}
      >
        <Menu />
      </Button>

      {/* The trail always starts at the dashboard, so the current section
          reads as a place inside it rather than the whole app. */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
        <Link
          href="/apps"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Dashboard
        </Link>

        <ChevronRight className="size-3.5 text-muted-foreground" />

        <span className={detail ? "text-muted-foreground" : "font-medium"}>
          {title}
        </span>

        {detail ? (
          <>
            <ChevronRight className="size-3.5 text-muted-foreground" />
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

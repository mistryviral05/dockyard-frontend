"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/shared/lib/utils"

export type NavTabItem = {
  label: string
  href: string
}

function NavTabs({
  items,
  className,
}: {
  items: NavTabItem[]
  className?: string
}) {
  const pathname = usePathname()

  return (
    <nav
      data-slot="nav-tabs"
      className={cn("flex items-center gap-6", className)}
    >
      {items.map((item) => {
        const isActive =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`)

        return (
          <Link
            key={item.href}
            href={item.href}
            data-active={isActive}
            className={cn(
              "relative -mb-px inline-flex items-center border-b-2 border-transparent py-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground",
              "data-[active=true]:border-foreground data-[active=true]:text-foreground"
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}

export { NavTabs }

"use client"

import { UserAvatar, useUser } from "@clerk/nextjs"

import { Skeleton } from "@/shared/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { UserMenuItems } from "@/shared/components/user/user-menu-items"

function SidebarUserCard() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return <Skeleton className="h-14 w-full rounded-md" />
  }

  if (!user) return null

  return (
    // Same raised face as the buttons, so the account block reads as pressable.
    <DropdownMenu>
      <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-xl border border-sidebar-border/80 bg-secondary/80 bg-linear-to-b from-white/1 to-transparent px-3 py-2 text-left shadow-raised outline-none transition-colors hover:bg-[color-mix(in_oklch,var(--secondary),white_2%)] focus-visible:ring-3 focus-visible:ring-ring/30 aria-expanded:bg-accent">


        <UserAvatar />

        <div className="flex min-w-0 flex-col">
          <span className="truncate text-sm font-medium">
            {user.fullName ?? user.username ?? "Your account"}
          </span>
          <span className="truncate text-xs text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </span>
        </div>

      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-64">
        <UserMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SidebarUserCard }

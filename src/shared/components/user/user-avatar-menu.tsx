"use client"

import { UserAvatar, useUser } from "@clerk/nextjs"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { UserMenuItems } from "./user-menu-items"

// Avatar-only account trigger, for headers that have no room for the full card.
function UserAvatarMenu() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return <Skeleton className="size-8 rounded-full" />
  }

  if (!user) return null

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Account"
        className="flex cursor-pointer items-center rounded-full outline-none transition-opacity hover:opacity-80 focus-visible:ring-3 focus-visible:ring-ring/30"
      >
        <UserAvatar />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-64">
        <UserMenuItems />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { UserAvatarMenu }

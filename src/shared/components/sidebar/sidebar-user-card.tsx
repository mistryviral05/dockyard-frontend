"use client"

import { UserButton, useUser } from "@clerk/nextjs"

import { Skeleton } from "@/shared/components/ui/skeleton"

function SidebarUserCard() {
  const { isLoaded, user } = useUser()

  if (!isLoaded) {
    return <Skeleton className="h-14 w-full rounded-md" />
  }

  if (!user) return null

  return (
    // Same raised face as the buttons, so the account block reads as pressable.
    <div className="flex items-center gap-3 rounded-md border border-sidebar-border bg-secondary bg-linear-to-b from-white/8 to-transparent px-3 py-2.5 shadow-raised">
      <UserButton signInUrl="/sign-in" />

      <div className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium">
          {user.fullName ?? user.username ?? "Your account"}
        </span>
        <span className="truncate text-xs text-muted-foreground">
          {user.primaryEmailAddress?.emailAddress}
        </span>
      </div>
    </div>
  )
}

export { SidebarUserCard }

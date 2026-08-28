"use client"

import { useClerk, UserAvatar, UserButton, useUser } from "@clerk/nextjs"

import { Skeleton } from "@/shared/components/ui/skeleton"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { ChevronRight, LogOut, Settings } from "lucide-react"

function SidebarUserCard() {
  const { isLoaded, user } = useUser()
  const { openUserProfile,signOut } = useClerk();

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
        <DropdownMenuGroup>
          <DropdownMenuLabel>Account</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => openUserProfile()} >
            <Settings className="size-4 text-muted-foreground" /> Manage Account
            <ChevronRight className="size-4 text-muted-foreground ml-auto" />
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onClick={() => signOut()} >
            <LogOut className="size-4 text-muted-foreground" /> Log Out
            <ChevronRight className="size-4 text-muted-foreground ml-auto" />
          </DropdownMenuItem>
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { SidebarUserCard }

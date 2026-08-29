"use client"

import { useClerk } from "@clerk/nextjs"
import { ChevronRight, LogOut, Settings } from "lucide-react"

import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/shared/components/ui/dropdown-menu"

function UserMenuItems() {
  const { openUserProfile, signOut } = useClerk()

  return (
    <DropdownMenuGroup>
      <DropdownMenuLabel>Account</DropdownMenuLabel>
      <DropdownMenuItem onClick={() => openUserProfile()}>
        <Settings className="size-4 text-muted-foreground" /> Manage Account
        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuItem>
      <DropdownMenuItem variant="destructive" onClick={() => signOut()}>
        <LogOut className="size-4 text-muted-foreground" /> Log Out
        <ChevronRight className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}

export { UserMenuItems }

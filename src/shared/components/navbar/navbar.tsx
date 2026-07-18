"use client"

import { UserButton } from "@clerk/nextjs"
import { ChevronsUpDown, PlusCircle } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Badge } from "@/shared/components/myui/badge"
import { NavTabs, type NavTabItem } from "@/shared/components/myui/nav-tabs"

const tabs: NavTabItem[] = [
  { label: "Applications", href: "/apps" },
  { label: "Agents", href: "/agents" },
]

function Navbar() {
  return (
    <header className="w-full border-b border-border">
      {/* Top row: workspace switcher + actions */}
      <div className="flex h-14 items-center border-b border-border justify-between px-4 sm:px-6">
        <DropdownMenu >
          <DropdownMenuTrigger
            className="-mx-3"
            render={
              <Button
                variant="ghost"
                className="gap-2 "
              />
            }
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              A
            </span>
            <span className="font-semibold">Personal workspace</span>
            <ChevronsUpDown className="text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" alignOffset={50} className="min-w-56">
            <DropdownMenuGroup >

              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              <DropdownMenuItem>   <span className="flex size-6 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                A
              </span>Personal workspace</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><PlusCircle />Create workspace</DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
          <UserButton />
        </div>
      </div>

      {/* Bottom row: navigation tabs */}
      <div className="px-4 sm:px-6">
        <NavTabs items={tabs} />
      </div>
    </header>
  )
}

export { Navbar }

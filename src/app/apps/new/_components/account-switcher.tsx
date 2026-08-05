"use client"

import { useState } from "react"
import { ChevronDown, List, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"

import { GithubIcon } from "./github-icon"

const accounts = ["mistryviral05", "viral-mistry"]

function AccountSwitcher() {
  const [account, setAccount] = useState(accounts[0])
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-9 w-full items-center gap-2 rounded-3xl border border-border bg-background ring-1 ring-border/50  px-3 text-sm outline-none transition-colors hover:bg-muted/40 cursor-pointer">
        <GithubIcon className="size-4 shrink-0" />
        <span className="truncate font-medium">{account}</span>
        <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-70">

        {accounts.map((item) => (
          <DropdownMenuItem key={item} className="pl-3">
            <GithubIcon className="size-4" />
            {item}
          </DropdownMenuItem>
        ))}


        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <Plus />
          Add GitHub Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export { AccountSwitcher }

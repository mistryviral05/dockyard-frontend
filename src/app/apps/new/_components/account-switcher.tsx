"use client"

import { useEffect, useState } from "react"
import { Check, ChevronDown, List, Plus } from "lucide-react"

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
import { GithubInstallation } from "@/features/github/types"
import { useGithubAccStore } from "@/store/useGithubInstallation"


function AccountSwitcher({ installations }: { installations: GithubInstallation[] }) {


  const { activeAccLogin, initialize, setActiveAccLogin } = useGithubAccStore()

  useEffect(() => {
    if (!installations || !installations.length) return
    if (!activeAccLogin) {
      initialize(installations)
    }
  }, [activeAccLogin, initialize, installations])



  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex h-9 w-full items-center gap-2 rounded-3xl border border-border bg-background ring-1 ring-border/50  px-3 text-sm outline-none transition-colors hover:bg-muted/40 cursor-pointer">
        <GithubIcon className="size-4 shrink-0" />
        <span className="truncate font-medium">{activeAccLogin?.account_login || "Select Account"}</span>
        <ChevronDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" className="min-w-70">

        {installations.map((item) => (
          <DropdownMenuItem key={item.id} data-active={item.id === activeAccLogin?.id} onClick={() => setActiveAccLogin(item)} className="pl-3 data-[active=true]:bg-gray-100">
            <GithubIcon className="size-4" />
            {item.account_login}
            {
              item.id === activeAccLogin?.id && <Check className="ml-auto size-4" />
            }
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

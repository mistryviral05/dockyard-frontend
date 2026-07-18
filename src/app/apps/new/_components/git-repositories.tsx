"use client"

import { useState } from "react"
import { GitBranch, Lock, Search } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"

import { AccountSwitcher } from "./account-switcher"

type Repository = {
  id: string
  name: string
  updatedLabel: string
  isPrivate: boolean
}

const repositories: Repository[] = [
  { id: "1", name: "dockyard", updatedLabel: "Updated 2h ago", isPrivate: true },
  { id: "2", name: "portfolio", updatedLabel: "Updated 1d ago", isPrivate: false },
  { id: "3", name: "next-starter", updatedLabel: "Updated 3d ago", isPrivate: false },
  { id: "4", name: "api-server", updatedLabel: "Updated 5d ago", isPrivate: true },
  { id: "5", name: "design-system", updatedLabel: "Updated 2w ago", isPrivate: false },
]

function GitRepositories() {
  const [query, setQuery] = useState("")

  const filtered = repositories.filter((repo) =>
    repo.name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">Import Git Repository</CardTitle>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="sm:w-52">
            <AccountSwitcher />
          </div>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search repositories..."
              className="pl-9"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ul className="divide-y divide-border border-t border-border">
          {filtered.map((repo) => (
            <li
              key={repo.id}
              className="flex items-center justify-between gap-3 px-6 py-3"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                  <GitBranch className="size-4" />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-medium">{repo.name}</p>
                    {repo.isPrivate && (
                      <Lock className="size-3 shrink-0 text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {repo.updatedLabel}
                  </p>
                </div>
              </div>

              <Button size="sm">Import</Button>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="px-6 py-10 text-center text-sm text-muted-foreground">
              No repositories found.
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  )
}

export { GitRepositories }

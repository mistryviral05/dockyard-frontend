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
import { format } from 'date-fns'
import { AccountSwitcher } from "./account-switcher"
import { GithubInstallation } from "@/features/github/types"
import { githubQueries } from "@/features/github/useGithubQueries"
import { useGithubAccStore } from "@/store/useGithubInstallation"
import { ReposSkeleton } from "./git-repositories-skeleton"





function GitRepositories({ installations }: { installations: GithubInstallation[] }) {
  const [query, setQuery] = useState("")
  const activeAccLogin = useGithubAccStore((state) => state.activeAccLogin)
  const { data: repositories, isLoading } = githubQueries.useGetRepositories(activeAccLogin?.id)



  const filtered = repositories?.filter((repo) =>
    repo.repo_name.toLowerCase().includes(query.trim().toLowerCase())
  )

  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <CardTitle className="text-lg">Import Git Repository</CardTitle>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <div className="sm:w-52">
            <AccountSwitcher installations={installations} />
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
        {
          isLoading ? <ReposSkeleton /> :
            <ul className="divide-y divide-border border-t border-border max-h-100 overflow-y-auto">
              {filtered?.map((repo) => (
                <li
                  key={repo.repo_id}
                  className="flex items-center justify-between gap-3 px-6 py-3 hover:bg-gray-100 transition-all duration-200 ease-in-out "
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">
                      <GitBranch className="size-4" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="truncate text-sm font-medium">{repo.repo_name}</p>
                        {repo.is_private && (
                          <Lock className="size-3 shrink-0 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {format(repo.last_updated_at, "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>

                  <Button size="sm">Import</Button>
                </li>
              ))}

              {filtered?.length === 0 && (
                <li className="px-6 py-10 text-center text-sm text-muted-foreground">
                  No repositories found.
                </li>
              )}
            </ul>
        }

      </CardContent>
    </Card>
  )
}

export { GitRepositories }

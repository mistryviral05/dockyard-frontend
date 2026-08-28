"use client"

import { useState } from "react"
import { FolderGit2, Lock, Search } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { format } from 'date-fns'
import { AccountSwitcher } from "./account-switcher"
import { GithubIcon } from "./github-icon"
import { GithubInstallation, GithubRepository } from "@/features/github/types"
import { githubQueries } from "@/features/github/useGithubQueries"
import { useGithubAccStore } from "@/store/useGithubInstallation"
import { ReposSkeleton } from "./git-repositories-skeleton"
import { useRouter, useSearchParams } from "next/navigation"




function GitRepositories({ installations }: { installations: GithubInstallation[] }) {
  const [query, setQuery] = useState("")
  const activeAccLogin = useGithubAccStore((state) => state.activeAccLogin)
  const { data: repositories, isLoading } = githubQueries.useGetRepositories(activeAccLogin?.id)
  const searchParams = useSearchParams()
  const router = useRouter()

  const filtered = repositories?.filter((repo) =>
    repo.repo_name.toLowerCase().includes(query.trim().toLowerCase())
  )


  function handleImport(repoMeta: GithubRepository) {
    const params = new URLSearchParams(searchParams.toString())
    params.set("github_repo_id", repoMeta.repo_id.toString())
    params.set("repo_name", repoMeta.repo_name)
    params.set("repo_full_name", repoMeta.repo_full_name)
    params.set("repo_url", repoMeta.repo_url)
    params.set("repo_owner", activeAccLogin?.account_login || "")
    params.set("is_private", repoMeta.is_private.toString())
    router.push(`/apps/new/import?${params.toString()}`)
  }

  return (
    <Card className="w-full max-w-xl rounded-3xl ">
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-secondary bg-linear-to-b from-white/8 to-transparent">
              <GithubIcon className="size-4" />
            </span>

            <div>
              <CardTitle className="text-base">Import a repository</CardTitle>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Pick the one you want to deploy
              </p>
            </div>
          </div>

          {/* A count makes the list feel finite while the search narrows it. */}
          {!isLoading && filtered ? (
            <span className="rounded-full border border-border/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
              {filtered.length}
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
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
            <ul className="max-h-100 divide-y divide-border/40 overflow-y-auto border-t border-border/40">
              {filtered?.map((repo) => (
                <li key={repo.repo_id}>
                  {/*
                    The whole row is the target, the label on the right just
                    fills in on hover so the intent stays obvious.
                  */}
                  <button
                    type="button"
                    onClick={() => handleImport(repo)}
                    className="group flex w-full cursor-pointer items-center justify-between gap-3 px-6 py-3 text-left outline-none transition-colors duration-200 hover:bg-muted/50 focus-visible:bg-muted/50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors group-hover:text-foreground">
                        <FolderGit2 className="size-4" />
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

                    <span className="shrink-0 rounded-md border border-border/50 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors group-hover:border-transparent group-hover:bg-foreground group-hover:text-background">
                      Import
                    </span>
                  </button>
                </li>
              ))}

              {filtered?.length === 0 && (
                <li className="flex flex-col items-center gap-2 px-6 py-12 text-center">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                    <Search className="size-4" />
                  </span>
                  <p className="text-sm text-muted-foreground">
                    No repositories match that search
                  </p>
                </li>
              )}
            </ul>
        }

      </CardContent>
    </Card>
  )
}

export { GitRepositories }

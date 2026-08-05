"use client"

import { useState } from "react"

import { GitProviderImport } from "./git-provider-import"
import { GitRepositories } from "./git-repositories"
import { githubQueries } from "@/features/github/useGithubQueries"
import { GitRepositoriesSkeleton } from "./git-repositories-skeleton"
import { useAuth } from "@clerk/nextjs"


function ImportProject() {
  const { isLoaded } = useAuth()
  const { data: installations, isLoading: isRepoLoading } = githubQueries.useGetInstallations()

  const isShowRepos = isLoaded && !isRepoLoading && installations && installations.length > 0
  if (!isLoaded || isRepoLoading) {
    return <GitRepositoriesSkeleton />
  }
  if (isShowRepos) {
    return <GitRepositories installations={installations} />
  }


  return <GitProviderImport />
}

export { ImportProject }

"use client"

import { useState } from "react"

import { GitProviderImport } from "./git-provider-import"
import { GitRepositories } from "./git-repositories"
import { githubQueries } from "@/features/github/useGithubQueries"

function ImportProject() {
  const [connected, setConnected] = useState(true)
  const { data: installations, isLoading } = githubQueries.useGetInstallations()
  console.log("installations", installations)
  if (connected) {
    return <GitRepositories />
  }

  return <GitProviderImport />
}

export { ImportProject }

"use client"

import { useState } from "react"

import { GitProviderImport } from "./git-provider-import"
import { GitRepositories } from "./git-repositories"

function ImportProject() {
  const [connected, setConnected] = useState(false)

  if (connected) {
    return <GitRepositories />
  }

  return <GitProviderImport onContinue={() => setConnected(true)} />
}

export { ImportProject }

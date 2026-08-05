"use client"

import { Button } from "@/shared/components/ui/button"

import { GithubIcon } from "./github-icon"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import { githubQueries } from "@/features/github/useGithubQueries"
import { useState } from "react"

function GitProviderImport() {
  const { mutate: install, isPending } = githubQueries.useGetGithubInstallUrl()
  const [redirecting, setRedirecting] = useState(false)
  function handleContinue() {
    install(undefined, {
      onSuccess: ({ data }) => {
        setRedirecting(true)
        window.location.href = data.link
      },
      onError: (err) => {
        setRedirecting(false)
      }
    })
  }

  return (
    <div className="w-full max-w-sm text-center">
      <h1 className="font-heading text-4xl font-semibold tracking-tight">
        Import a project
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Select your Git provider to import project.
      </p>

      <Button
        variant="outline"
        size="lg"
        onClick={handleContinue}
        className="mt-6 w-full gap-2 h-12"
        disabled={isPending || redirecting}
      >
        {(isPending || redirecting) ? <CircularSpinner size={'xs'} /> : <GithubIcon className="size-4" />}
        Continue with GitHub
      </Button>
    </div>
  )
}

export { GitProviderImport }

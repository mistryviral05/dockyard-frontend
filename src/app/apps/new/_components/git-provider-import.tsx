"use client"

import { useState } from "react"

import { Button } from "@/shared/components/ui/button"
import { CircularSpinner } from "@/shared/components/myui/circular-spinner"
import { githubQueries } from "@/features/github/useGithubQueries"

import { GithubIcon } from "./github-icon"

/** What the flow does once the account is connected, in order. */
const steps = [
  "Pick a repository from your account",
  "Name the project and choose its stack",
  "Deploy it to an agent you own",
]

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

  const isBusy = isPending || redirecting

  return (
    <div className="w-full max-w-md text-center">
      {/* The provider mark gets the same raised tile as a project card. */}
      <span className="mx-auto flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-secondary bg-linear-to-b from-white/8 to-transparent shadow-raised">
        <GithubIcon className="size-6" />
      </span>

      <h1 className="mt-6 font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
        Import a project
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Connect the account that holds your code, we read the repository list
        and nothing else.
      </p>

      <Button
        size="lg"
        onClick={handleContinue}
        className="mt-7 h-12 w-full gap-2"
        disabled={isBusy}
      >
        {isBusy ? <CircularSpinner size={"xs"} /> : <GithubIcon className="size-4" />}
        {redirecting ? "Opening GitHub" : "Continue with GitHub"}
      </Button>

      <ol className="mt-8 flex flex-col gap-2.5 rounded-2xl border border-border/40 bg-sidebar p-4 text-left">
        {steps.map((step, index) => (
          <li key={step} className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-border text-[11px] font-medium">
              {index + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  )
}

export { GitProviderImport }

import { Button } from "@/shared/components/ui/button"

import { GithubIcon } from "./github-icon"

function GitProviderImport() {
  return (
    <div className="w-full max-w-sm text-center">
      <h1 className="font-heading text-xl font-semibold tracking-tight">
        Import a project
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Select your Git provider to import project.
      </p>

      <Button variant="outline" size="lg" className="mt-6 w-full gap-2">
        <GithubIcon className="size-4" />
        Continue with GitHub
      </Button>
    </div>
  )
}

export { GitProviderImport }

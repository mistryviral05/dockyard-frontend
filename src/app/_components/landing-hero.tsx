import { GitBranch } from "lucide-react"

import { LandingAuthButton } from "./landing-auth-button"
import { LandingPreview } from "./landing-preview"

function LandingHero() {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
            <GitBranch className="size-3.5 text-primary" />
            Push to deploy, on your own servers
          </span>

          <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            Shipping to production should not need a DevOps team
          </h1>

          <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Dockyard connects your GitHub repository to any machine you own.
            Every push builds, deploys, and streams its logs back to you in real
            time, with no scripts to babysit.
          </p>

          <div className="mt-8">
            <LandingAuthButton size="lg" withIcon />
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Free while we are in early access
          </p>
        </div>

        <div className="mt-14">
          <LandingPreview />
        </div>
      </div>
    </section>
  )
}

export { LandingHero }

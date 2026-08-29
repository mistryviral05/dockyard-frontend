import { GitBranch } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { LandingAuthButton } from "./landing-auth-button"
import { LandingPreview } from "./landing-preview"
import { LandingReveal } from "./landing-reveal"

function LandingHero() {
  return (
    <section>
      <div className="mx-auto w-full max-w-6xl px-4 pt-14 pb-12 sm:px-6 sm:pt-20">
        {/* The fold plays as a short staircase, one step every 80ms. */}
        <div className="flex flex-col items-center text-center">
          <LandingReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent px-3 py-1 text-xs font-medium text-muted-foreground shadow-raised">
              <GitBranch className="size-3.5 text-primary" />
              Push to deploy, on your own servers
            </span>
          </LandingReveal>

          <LandingReveal delay={0.08}>
            <h1 className="mt-6 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              Shipping to production should not need a DevOps team
            </h1>
          </LandingReveal>

          <LandingReveal delay={0.16}>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              Dockyard connects your GitHub repository to any machine you own.
              Every push builds, deploys, and streams its logs back to you in
              real time, with no scripts to babysit.
            </p>
          </LandingReveal>

          <LandingReveal delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <LandingAuthButton size="lg" withIcon />
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<a href="#how-it-works" />}
              >
                See how it works
              </Button>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">
              Free while we are in early access
            </p>
          </LandingReveal>
        </div>

        <LandingReveal delay={0.32} className="mt-14">
          <LandingPreview />
        </LandingReveal>
      </div>
    </section>
  )
}

export { LandingHero }

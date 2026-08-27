import { Sparkles } from "lucide-react"

import { LandingAuthButton } from "./landing-auth-button"

function LandingFreeAccess() {
  return (
    <section id="pricing" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center gap-6 rounded-xl border border-border bg-card px-6 py-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="size-3.5" />
            Early access
          </span>

          <h2 className="max-w-2xl font-heading text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
            Free while we are in early access
          </h2>

          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            There are no plans and no limits to read through yet. Connect as
            many servers and applications as you need, and deploy as often as
            you like. We will tell you well ahead of time if that changes.
          </p>

          <LandingAuthButton size="lg" withIcon />
        </div>
      </div>
    </section>
  )
}

export { LandingFreeAccess }

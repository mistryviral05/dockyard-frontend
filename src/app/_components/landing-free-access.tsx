import { Sparkles } from "lucide-react"

import { LandingAuthButton } from "./landing-auth-button"
import { LandingReveal } from "./landing-reveal"

function LandingFreeAccess() {
  return (
    <section id="pricing" className="border-b border-border/50">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal className="flex flex-col items-center gap-6 rounded-3xl border border-border/50 bg-panel bg-linear-to-b from-white/4 to-transparent px-6 py-12 text-center shadow-float">
          <span className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-secondary bg-linear-to-b from-white/8 to-transparent px-3 py-1 text-xs font-medium text-primary shadow-raised">
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
        </LandingReveal>
      </div>
    </section>
  )
}

export { LandingFreeAccess }

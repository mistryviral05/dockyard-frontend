import { LandingNav } from "./landing-nav"
import { LandingHero } from "./landing-hero"
import { LandingStats } from "./landing-stats"
import { LandingFeatures } from "./landing-features"
import { LandingWorkflow } from "./landing-workflow"
import { LandingFreeAccess } from "./landing-free-access"
import { LandingFaq } from "./landing-faq"
import { LandingCta } from "./landing-cta"
import { LandingFooter } from "./landing-footer"

function LandingPage() {
  return (
    <div className="flex min-h-full flex-col bg-background">
      <main className="flex-1">
        {/* The bar and the hero share one background, so the bar floats over it. */}
        <div className="relative isolate overflow-hidden border-b border-border/50">
          {/* A still wash of brand colour behind the fold, no motion involved. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128"
            style={{
              background:
                "radial-gradient(ellipse 70% 60% at 50% -10%, color-mix(in oklch, var(--primary) 22%, transparent), transparent 70%)",
            }}
          />

          <LandingNav />
          <LandingHero />
        </div>

        <LandingStats />
        <LandingFeatures />
        <LandingWorkflow />
        <LandingFreeAccess />
        <LandingFaq />
        <LandingCta />
      </main>

      <LandingFooter />
    </div>
  )
}

export { LandingPage }

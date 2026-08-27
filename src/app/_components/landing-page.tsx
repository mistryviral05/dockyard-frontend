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
        <div className="border-b border-border bg-muted/30">
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

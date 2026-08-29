import { LandingReveal } from "./landing-reveal"

const stats = [
  { value: "40 sec", label: "Median time from push to live" },
  { value: "Unlimited", label: "Deployments, with nothing to pay" },
  { value: "Your servers", label: "Nothing leaves the machines you own" },
]

function LandingStats() {
  return (
    <section className="border-b border-border/50">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 divide-y divide-border/50 px-4 sm:px-6 md:grid-cols-3 md:divide-x md:divide-y-0">
        {stats.map((stat, index) => (
          <LandingReveal key={stat.label} delay={index * 0.08}>
            <div className="flex flex-col items-center gap-1 px-4 py-8 text-center">
              <span className="font-heading text-2xl font-semibold sm:text-3xl">
                {stat.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
            </div>
          </LandingReveal>
        ))}
      </div>
    </section>
  )
}

export { LandingStats }

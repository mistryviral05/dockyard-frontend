import { LandingSectionHeading } from "./landing-section-heading"
import { LandingWorkflowStep } from "./landing-workflow-step"
import { LandingReveal } from "./landing-reveal"

const steps = [
  {
    title: "Connect a server",
    description:
      "Run one command on the machine you want to deploy to. The agent registers itself and stays online.",
  },
  {
    title: "Import a repository",
    description:
      "Authorise GitHub once, then pick the repository and the branch you want Dockyard to watch.",
  },
  {
    title: "Deploy and watch",
    description:
      "Hit deploy. The build runs, the logs stream in, and the status turns live when the container is up.",
  },
]

function LandingWorkflow() {
  return (
    <section
      id="how-it-works"
      className="border-y border-border/50 bg-panel"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <LandingReveal>
          <LandingSectionHeading
            eyebrow="How it works"
            title="Three steps between an empty server and a running app"
          />
        </LandingReveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <LandingReveal
              key={step.title}
              delay={index * 0.1}
              className="h-full"
            >
              <LandingWorkflowStep
                step={index + 1}
                title={step.title}
                description={step.description}
              />
            </LandingReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export { LandingWorkflow }

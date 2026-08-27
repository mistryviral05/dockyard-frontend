import { LandingSectionHeading } from "./landing-section-heading"
import { LandingWorkflowStep } from "./landing-workflow-step"

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
    <section id="how-it-works" className="border-b border-border bg-muted/30">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <LandingSectionHeading
          eyebrow="How it works"
          title="Three steps between an empty server and a running app"
        />

        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <LandingWorkflowStep
              key={step.title}
              step={index + 1}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { LandingWorkflow }

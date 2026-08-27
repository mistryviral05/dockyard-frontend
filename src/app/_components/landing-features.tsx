import {
  FolderGit2,
  History,
  Layers,
  ScrollText,
  Server,
  ShieldCheck,
} from "lucide-react"

import { LandingSectionHeading } from "./landing-section-heading"
import { LandingFeatureCard } from "./landing-feature-card"

const features = [
  {
    icon: FolderGit2,
    title: "Import from GitHub",
    description:
      "Pick a repository, choose a branch, and Dockyard reads the rest. No pipeline file to write by hand.",
  },
  {
    icon: Server,
    title: "Run on your own machines",
    description:
      "Install a lightweight agent on any server you control. Your code and your data never sit on someone else's hardware.",
  },
  {
    icon: ScrollText,
    title: "Live build logs",
    description:
      "Watch every build step as it happens. Warnings and errors are highlighted so a failure is easy to spot.",
  },
  {
    icon: History,
    title: "Full deployment history",
    description:
      "Every deployment keeps its commit, its status, and its logs, so you can always tell what changed and when.",
  },
  {
    icon: Layers,
    title: "Workspaces for teams",
    description:
      "Group projects by team or by client, and give each workspace its own set of applications and agents.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description:
      "Agents connect outward with a scoped token, so there is no inbound port to open on your servers.",
  },
]

function LandingFeatures() {
  return (
    <section id="features" className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <LandingSectionHeading
          eyebrow="What you get"
          title="Everything a deploy needs, and nothing you have to maintain"
          description="Dockyard handles the build, the registry, and the rollout. You keep the servers."
        />

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <LandingFeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { LandingFeatures }

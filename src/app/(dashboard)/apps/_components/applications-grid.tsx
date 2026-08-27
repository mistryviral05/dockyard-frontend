import type { Project } from "@/features/project/types"
import { ApplicationCard } from "./application-card"
import { CreateApplicationCard } from "./create-application-card"

const gridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"

function ApplicationsGrid({ projects }: { projects: Project[] }) {
  // An empty workspace gets the card, otherwise the header carries the action.
  if (!projects.length) {
    return (
      <div className={gridClassName}>
        <CreateApplicationCard />
      </div>
    )
  }

  return (
    <div className={gridClassName}>
      {projects.map((project) => (
        <ApplicationCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export { ApplicationsGrid }

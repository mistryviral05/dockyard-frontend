import { ApplicationCard, type Application } from "./application-card"
import { CreateApplicationCard } from "./create-application-card"

const applications: Application[] = [
  {
    id: "dockyard",
    name: "Dockyard",
    domain: "www.viralmistry.dev",
    hasProduction: false,
    updatedLabel: "7d ago",
  },
]

function ApplicationsGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <CreateApplicationCard />
      {applications.map((application) => (
        <ApplicationCard key={application.id} application={application} />
      ))}
    </div>
  )
}

export { ApplicationsGrid }

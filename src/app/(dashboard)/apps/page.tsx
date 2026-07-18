import { ApplicationsGrid } from "./_components/applications-grid"

export default function ApplicationsPage() {
  return (
    <div className="mx-auto w-full max-w-7xl">
      <h1 className="font-heading text-2xl font-semibold tracking-tight">
        Applications
      </h1>
      <div className="mt-8">
        <ApplicationsGrid />
      </div>
    </div>
  )
}

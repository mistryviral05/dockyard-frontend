import { auth } from "@clerk/nextjs/server"
import { ApplicationsGrid } from "./_components/applications-grid"

export default async function ApplicationsPage() {
  await auth.protect()
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

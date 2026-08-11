"use client"

import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { projectQueries } from "@/features/project/useProjectQueries"
import { ApplicationCard } from "./application-card"
import { ApplicationCardSkeleton } from "./application-card-skeleton"
import { CreateApplicationCard } from "./create-application-card"

const gridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"

function ApplicationsGrid() {
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace)
  const hasHydrated = useWorkspaceStore((state) => state.hasHydrated)
  const {
    data: projects,
    isLoading,
    isError,
  } = projectQueries.useGetProjects(activeWorkspace?.id)

  // The workspace comes out of localStorage, so the query cannot start before it hydrates.
  if (!hasHydrated || isLoading) {
    return (
      <div className={gridClassName}>
        <CreateApplicationCard />
        {Array.from({ length: 3 }).map((_, index) => (
          <ApplicationCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="rounded-2xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
        Could not load your projects. Please try again.
      </div>
    )
  }

  return (
    <div className={gridClassName}>
      <CreateApplicationCard />
      {projects?.map((project) => (
        <ApplicationCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export { ApplicationsGrid }

"use client"

import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { projectQueries } from "@/features/project/useProjectQueries"
import { ApplicationCardSkeleton } from "./application-card-skeleton"
import { ApplicationsGrid } from "./applications-grid"
import { CreateApplicationButton } from "./create-application-button"
import { CreateApplicationCard } from "./create-application-card"

const gridClassName = "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"

function ApplicationsPage() {
  const activeWorkspace = useWorkspaceStore((state) => state.activeWorkspace)
  const hasHydrated = useWorkspaceStore((state) => state.hasHydrated)
  const {
    data: projects,
    isLoading,
    isError,
  } = projectQueries.useGetProjects(activeWorkspace?.id)

  // The workspace comes out of localStorage, so the query cannot start before it hydrates.
  const isBusy = !hasHydrated || isLoading
  const hasProjects = !isBusy && !isError && (projects?.length ?? 0) > 0

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-semibold tracking-tight">
          Applications
        </h1>

        {/* With a workspace already in use the action belongs in the header,
            so the grid stays a list of what exists. */}
        {hasProjects ? <CreateApplicationButton /> : null}
      </div>

      <div className="mt-8">
        {isBusy ? (
          <div className={gridClassName}>
            <CreateApplicationCard />
            {Array.from({ length: 3 }).map((_, index) => (
              <ApplicationCardSkeleton key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="rounded-xl border border-border bg-background px-6 py-16 text-center text-sm text-muted-foreground">
            Could not load your projects. Please try again.
          </div>
        ) : (
          <ApplicationsGrid projects={projects ?? []} />
        )}
      </div>
    </div>
  )
}

export { ApplicationsPage }

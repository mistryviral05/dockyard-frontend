"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { Check, ChevronsUpDown, FolderKanban, PlusCircle } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { CreateWorkspaceDialog } from "@/shared/components/navbar/create-workspace-dialog"
import { workspaceQueries } from "@/features/workspace/useWorkspaceQueries"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"

function SidebarWorkspaceSwitcher() {
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)
  const { isLoaded } = useAuth()
  const { data: workspaces, isLoading } = workspaceQueries.useGetWorkspaces()
  const { activeWorkspace, initialize, setWorkspace } = useWorkspaceStore()

  useEffect(() => {
    if (!workspaces || isLoading) return
    if (workspaces.length) {
      initialize(
        workspaces.map((w) => ({
          id: w.id,
          name: w.wsp_name,
          slug: w.wsp_slug,
        }))
      )
    }
  }, [workspaces, isLoading, initialize])

  if (isLoading || !isLoaded) {
    return <Skeleton className="h-11 w-full rounded-md" />
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-md border border-sidebar-border bg-sidebar-accent/50 px-3 py-2 text-left outline-none transition-colors hover:bg-sidebar-accent focus-visible:ring-3 focus-visible:ring-ring/30 aria-expanded:bg-sidebar-accent">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-background text-muted-foreground">
            <FolderKanban className="size-4" />
          </span>

          <span className="flex min-w-0 flex-col">
            <span className="text-[11px] text-muted-foreground">workspace</span>
            <span className="truncate text-sm font-medium">
              {activeWorkspace?.name ?? "No workspace yet"}
            </span>
          </span>

          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="min-w-64">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>

            {workspaces?.map((workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                onClick={() =>
                  setWorkspace({
                    id: workspace.id,
                    name: workspace.wsp_name,
                    slug: workspace.wsp_slug,
                  })
                }
              >
                <FolderKanban className="size-4 text-muted-foreground" />
                <span className="truncate">{workspace.wsp_name}</span>
                {activeWorkspace?.id === workspace.id ? (
                  <Check className="ml-auto size-4 text-primary" />
                ) : null}
              </DropdownMenuItem>
            ))}

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => setCreateWorkspaceOpen(true)}>
              <PlusCircle className="size-4 text-muted-foreground" />
              Create workspace
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <CreateWorkspaceDialog
        open={createWorkspaceOpen}
        onOpenChange={setCreateWorkspaceOpen}
      />
    </>
  )
}

export { SidebarWorkspaceSwitcher }

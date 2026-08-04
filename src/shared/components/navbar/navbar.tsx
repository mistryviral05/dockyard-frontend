"use client"

import { useEffect, useState } from "react"
import { useAuth, UserButton } from "@clerk/nextjs"
import { ChevronsUpDown, FolderKanban, LayoutGrid, PlusCircle } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { NavTabs, type NavTabItem } from "@/shared/components/myui/nav-tabs"
import { CreateWorkspaceDialog } from "@/shared/components/navbar/create-workspace-dialog"
import { workspaceQueries } from "@/features/workspace/useWorkspaceQueries"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import { Skeleton } from "../ui/skeleton"

const tabs: NavTabItem[] = [
  { label: "Applications", href: "/apps" },
  { label: "Agents", href: "/agents" },
]

function Navbar() {
  const [createWorkspaceOpen, setCreateWorkspaceOpen] = useState(false)
  const { isLoaded } = useAuth()
  const { data: workspaces, isLoading } = workspaceQueries.useGetWorkspaces()
  const { activeWorkspace, initialize, setWorkspace } =
    useWorkspaceStore();
  useEffect(() => {
    if (!workspaces || isLoading) return;
    if (workspaces.length) {
      initialize(
        workspaces.map((w) => ({
          id: w.id,
          name: w.wsp_name,
          slug: w.wsp_slug,
        }))
      );
    }
  }, [workspaces, initialize]);

  return (
    <header className="w-full border-b border-border bg-gray-50">
      {/* Top row: workspace switcher + actions */}
      <div className="flex h-14 items-center border-b border-border justify-between px-4 sm:px-6">
        <DropdownMenu >
          {(isLoading || !isLoaded) && <Skeleton className="h-9 w-65" />}
          {
            workspaces && <DropdownMenuTrigger
              className="-mx-3"
              render={
                <Button
                  variant="ghost"
                  className="gap-2 "
                />
              }
            >
              <span className="flex size-6 items-center justify-center ">
                <FolderKanban className="size-6" />
              </span>
              <span className="font-semibold">
                {activeWorkspace?.name || <Skeleton />}
              </span>

              <ChevronsUpDown className="text-muted-foreground" />
            </DropdownMenuTrigger>
          }

          <DropdownMenuContent align="end" alignOffset={50} className="min-w-80">
            <DropdownMenuGroup >

              <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
              {
                workspaces?.map((workspace) => (


                  <DropdownMenuItem key={workspace.id} onClick={() =>
                    setWorkspace({
                      id: workspace.id,
                      name: workspace.wsp_name,
                      slug: workspace.wsp_slug,
                    })
                  }>   <span className="flex size-6 items-center justify-center    text-sm font-semibold ">
                      <FolderKanban className="size-6" />
                    </span>{workspace.wsp_name}</DropdownMenuItem>

                ))
              }
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setCreateWorkspaceOpen(true)}>
                <PlusCircle />
                Create workspace
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
          <UserButton signInUrl="/sign-in" />
        </div>
      </div>

      {/* Bottom row: navigation tabs */}
      <div className="px-4 sm:px-6">
        <NavTabs items={tabs} />
      </div>

      <CreateWorkspaceDialog
        open={createWorkspaceOpen}
        onOpenChange={setCreateWorkspaceOpen}
      />
    </header>
  )
}

export { Navbar }

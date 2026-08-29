import { UserAvatarMenu } from "@/shared/components/user/user-avatar-menu"

import { BackButton } from "./back-button"
import { NewProjectSteps } from "./new-project-steps"

function NewProjectNavbar() {
  return (
    // No border, the panel edge already separates this from the canvas.
    <header className="relative w-full shrink-0">
      <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-8">
        <BackButton />

        <div className="flex justify-center">
          <span className="text-sm font-medium sm:hidden">New project</span>
          <div className="hidden sm:block">
            <NewProjectSteps />
          </div>
        </div>

        <div className="flex justify-end">
          <UserAvatarMenu />
        </div>
      </div>
    </header>
  )
}

export { NewProjectNavbar }

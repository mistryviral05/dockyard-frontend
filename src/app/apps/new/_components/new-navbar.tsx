import { UserButton } from "@clerk/nextjs"

import { BackButton } from "./back-button"

function NewProjectNavbar() {
  return (
    <header className="w-full border-b border-border bg-gray-50">
      <div className="grid h-14 grid-cols-3 items-center px-4 sm:px-6">
        <div className="flex justify-start">
          <BackButton />
        </div>

        <div className="flex justify-center">
          <span className="text-sm font-semibold">New project</span>
        </div>

        <div className="flex justify-end">
          <UserButton />
        </div>
      </div>
    </header>
  )
}

export { NewProjectNavbar }

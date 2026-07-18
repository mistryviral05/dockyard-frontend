import { NewProjectNavbar } from "./_components/new-navbar"
import { ImportProject } from "./_components/import-project"
import { auth } from "@clerk/nextjs/server"

export default async function NewProjectPage() {
  await auth.protect()
  return (
    <div className="flex flex-1 flex-col">
      <NewProjectNavbar />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <ImportProject />
      </main>
    </div>
  )
}

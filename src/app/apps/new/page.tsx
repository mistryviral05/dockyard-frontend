import { NewProjectNavbar } from "./_components/new-navbar"
import { GitProviderImport } from "./_components/git-provider-import"

export default function NewProjectPage() {
  return (
    <div className="flex flex-1 flex-col">
      <NewProjectNavbar />
      <main className="flex flex-1 items-center justify-center px-4 py-10">
        <GitProviderImport />
      </main>
    </div>
  )
}

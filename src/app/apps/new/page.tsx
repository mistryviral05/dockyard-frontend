import { NewProjectNavbar } from "./_components/new-navbar"
import { ImportProject } from "./_components/import-project"
import { auth } from "@clerk/nextjs/server"

export default async function NewProjectPage() {
  await auth.protect()
  return (
    <ImportProject />
  )
}

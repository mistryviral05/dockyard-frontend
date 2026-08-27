import { auth } from "@clerk/nextjs/server"
import { ApplicationsPage } from "./_components/applications-page"

export default async function Page() {
  await auth.protect()
  return <ApplicationsPage />
}

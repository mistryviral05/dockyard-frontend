import { DashboardShell } from "@/shared/components/shell/dashboard-shell"
import { HydrateWorkspace } from "@/providers/hydrate-workspace"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // await auth.protect()
    return (
        <>
            <HydrateWorkspace />
            <DashboardShell>{children}</DashboardShell>
        </>
    )
}

import { Navbar } from "@/shared/components/navbar/navbar"
import { auth } from "@clerk/nextjs/server"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    // await auth.protect()
    return (
        <section className="flex min-h-full flex-col">
            <Navbar />
            <main className="flex-1 px-4 py-6 sm:px-6">{children}</main>
        </section>
    )
}




import React from 'react'
import { NewProjectNavbar } from './_components/new-navbar'
import { HydrateWorkspace } from '@/providers/hydrate-workspace'

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-1 flex-col">
            <HydrateWorkspace />
            <NewProjectNavbar />
            <main className="flex flex-1 items-center justify-center px-4 py-10">
                {children}
            </main>
        </div>
    )
}

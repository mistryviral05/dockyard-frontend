import React from 'react'

import { HydrateWorkspace } from '@/providers/hydrate-workspace'
import { PanelPattern } from '@/shared/components/myui/panel-pattern'

import { NewProjectNavbar } from './_components/new-navbar'

export default function NewProjectLayout({ children }: { children: React.ReactNode }) {
    return (
        // The flow sits in the same inset panel as the dashboard, so leaving the
        // app to add a project does not feel like landing in a different product.
        <div className="flex min-h-dvh flex-1 flex-col bg-background p-2 lg:p-3">
            <HydrateWorkspace />

            <div className="relative flex flex-1 flex-col overflow-hidden rounded-3xl bg-panel">
                <PanelPattern />

                <NewProjectNavbar />

                <main className="relative flex flex-1 items-center justify-center px-4 py-10">
                    {children}
                </main>
            </div>
        </div>
    )
}

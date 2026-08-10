// components/hydrate-workspace.tsx
'use client'

import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import { useEffect } from 'react'

export function HydrateWorkspace() {
    useEffect(() => {
        useWorkspaceStore.persist.rehydrate()
    }, [])

    return null
}
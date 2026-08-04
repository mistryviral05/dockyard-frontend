'use client'


import { useApiStore } from '@/store/useApiStore'
import { useAuth } from '@clerk/nextjs'
import React, { useEffect } from 'react'

export default function ClerkZustandSyncer({
    children
}: {
    children: React.ReactNode
}) {
    const { getToken, isLoaded } = useAuth()
    const setClerkGetToken = useApiStore((state) => state.setClerkGetToken)

    useEffect(() => {
        if (isLoaded) {
            setClerkGetToken(getToken)
        }
    }, [getToken, isLoaded, setClerkGetToken])

    return <>{children}</>
}

'use client'


import { useApiStore } from '@/store/useApiStore'
import { useAuth } from '@clerk/nextjs'
import React, { useEffect } from 'react'

export default function ClerkZustandSyncer({
    children
}: {
    children: React.ReactNode
}) {
    // console.log("Syncer rendered");
    const { getToken, isLoaded,isSignedIn } = useAuth()
    const setClerkGetToken = useApiStore((state) => state.setClerkGetToken)
    useEffect(() => {
        // console.log("Syncer useEffect called");
        if (isLoaded && isSignedIn && getToken) {
            // console.log("Syncer isLoaded and signed in, setting getToken in store");
            setClerkGetToken(() => getToken())
        }
    }, [getToken, isLoaded, isSignedIn, setClerkGetToken])

    return <>{children}</>
}

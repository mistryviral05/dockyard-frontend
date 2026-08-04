'use client'
import React from 'react'
import {
    QueryClient,
    QueryClientProvider,
    QueryCache,
    MutationCache
} from '@tanstack/react-query'
import { AxiosError } from 'axios'

const queryClient = new QueryClient()
const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default QueryProvider


'use client'
import { githubQueries } from '@/features/github/useGithubQueries'
import { CircularSpinner } from '@/shared/components/myui/circular-spinner'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useApiStore } from '@/store/useApiStore'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function CallbackPage() {

    const searchParams = useSearchParams()
    const router = useRouter()
    const installationId = searchParams.get('installation_id')
    const state = searchParams.get('state')
    const isApiReady = useApiStore((state) => state.isApiReady);
    const { mutate: install } = githubQueries.useInstallGithubApp()


    if (!installationId || !state) {
        redirect('/apps/new')
    }


    useEffect(() => {

        if (!installationId || !state) {
            router.replace('/apps/new')
        }
        if (isApiReady) {
            install({ installationId, state }, {
                onSuccess: (data) => {
                    if (data.status === 'success') {
                        router.replace('/apps/new')
                    }
                }
            })
        }
    }, [state, installationId, isApiReady])


    return (
        <div className="min-h-screen h-full flex items-center justify-center">
            <Card className="!shadow-card">
                <CardContent className="max-w-sm">
                    <div className="flex flex-col items-center justify-center gap-4 mt-10">
                        <CircularSpinner variant={'primary'} size={'xl'} />
                        {/* <Spinner size={'xl'} variant={'primary'}/> */}
                    </div>

                    <div className="flex flex-col items-center justify-center gap-2 mt-4">
                        <h2 className="mt-8 text-xl font-medium">Install Github App...</h2>
                        <p className="text-muted-foreground text-center">
                            Please wait while we complete the installation and redirect you.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

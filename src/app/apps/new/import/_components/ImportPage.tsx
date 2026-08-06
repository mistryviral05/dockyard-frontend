
'use client'



import { Card, CardContent, CardHeader } from '@/shared/components/ui/card'
import React from 'react'
import { GithubIcon } from '../../_components/github-icon'
import { useSearchParams } from 'next/navigation'
import { GitBranch } from 'lucide-react'
import Link from 'next/link'

export default function ImportPage() {

    const searchParams = useSearchParams()
    const fullName = searchParams.get("repo_full_name")
    const repoUrl = searchParams.get("repo_url")
    return (
        <Card className="w-full max-w-2xl min-h-150">
            <CardHeader>
                <h1 className="text-2xl font-semibold">New Project</h1>
            </CardHeader>
            <CardContent>
                <div className="bg-gray-100 p-3 rounded-2xl flex flex-col gap-2 border-2 border-gray-200">
                    <p className="text-gray-500 text-xs">Import your project from GitHub</p>
                    <div className="flex items-center gap-5">
                        <Link href={repoUrl || "#"} className="flex items-center gap-2" target="_blank">
                            <GithubIcon className="size-4" />
                            <span className="text-sm font-medium">{fullName}</span>
                        </Link>

                        <div className="flex items-center gap-1 text-gray-500">
                            <GitBranch className="size-4" />
                            <p>main</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

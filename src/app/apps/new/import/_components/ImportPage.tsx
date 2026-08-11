
'use client'

import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSnackbar } from 'notistack'
import { isAxiosError } from 'axios'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { GithubIcon } from '../../_components/github-icon'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, GitBranch, Plus } from 'lucide-react'
import Link from 'next/link'
import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { CircularSpinner } from '@/shared/components/myui/circular-spinner'
import {
    createProjectSchema,
    projectFormSchema,
    PROJECT_STACKS,
    PROJECT_STACK_LABELS,
    type ProjectFormValues,
    type ProjectStack,
} from '@/features/project/schema'
import { projectQueries } from '@/features/project/useProjectQueries'
import type { ProjectErrorResponse } from '@/features/project/types'

export default function ImportPage() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const { enqueueSnackbar } = useSnackbar()
    const { activeWorkspace, hasHydrated } = useWorkspaceStore()
    const { mutate: createProject, isPending } = projectQueries.useCreateProject()

    // Everything about the repository is handed over through the url by the repo list.
    const githubRepoId = searchParams.get("github_repo_id") ?? ""
    const repoName = searchParams.get("repo_name") ?? ""
    const fullName = searchParams.get("repo_full_name") ?? ""
    const repoUrl = searchParams.get("repo_url") ?? ""
    const repoOwner = searchParams.get("repo_owner") ?? ""
    const isPrivate = searchParams.get("is_private") === "true"

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<ProjectFormValues>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            project_name: repoName,
            project_stack: undefined,
        },
    })

    const onSubmit = (values: ProjectFormValues) => {
        if (!activeWorkspace) {
            enqueueSnackbar("Pick a workspace before creating a project", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return
        }

        // The url and the store carry the rest of the body, so validate the whole thing here.
        const parsed = createProjectSchema.safeParse({
            ...values,
            workspace_id: activeWorkspace.id,
            github_repo_id: githubRepoId,
            repo_name: repoName,
            repo_full_name: fullName,
            repo_url: repoUrl,
            repo_owner: repoOwner,
            is_private: isPrivate,
        })

        if (!parsed.success) {
            enqueueSnackbar(parsed.error.issues[0]?.message ?? "Invalid repository details", {
                variant: "error",
                autoHideDuration: 3000,
            })
            return
        }

        createProject(parsed.data, {
            onSuccess: (response) => {
                enqueueSnackbar(response.message, {
                    variant: "success",
                    autoHideDuration: 3000,
                })
                router.push("/apps")
            },
            onError: (error) => {
                // The API reports every failure as { status: "error", error: "..." }.
                const message = isAxiosError<ProjectErrorResponse>(error)
                    ? error.response?.data?.error
                    : undefined
                enqueueSnackbar(message ?? "Failed to create project, please try again", {
                    variant: "error",
                    autoHideDuration: 3000,
                })
            },
        })
    }

    return (
        <Card className="w-full max-w-2xl ">
            <CardHeader>
                <h1 className="text-2xl font-semibold">New Project</h1>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

                    <div className="mt-6 flex flex-col gap-3 ">
                        <label htmlFor="project-name" className="text-sm font-medium">
                            Project Name
                        </label>
                        <Input
                            id="project-name"
                            placeholder="My project"
                            aria-invalid={!!errors.project_name}
                            {...register("project_name")}
                        />
                        {errors.project_name && (
                            <p className="text-xs text-destructive">{errors.project_name.message}</p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-3 ">
                        <label htmlFor="project-stack" className="text-sm font-medium">
                            Select Stack
                        </label>

                        <Controller
                            control={control}
                            name="project_stack"
                            render={({ field }) => (
                                <Select
                                    value={field.value ?? null}
                                    onValueChange={(value) => field.onChange(value as ProjectStack)}
                                >
                                    <SelectTrigger
                                        id="project-stack"
                                        className="w-full"
                                        aria-invalid={!!errors.project_stack}
                                    >
                                        <SelectValue placeholder="Select Stack" className='max-w-full'>
                                            {(value: ProjectStack | null) =>
                                                value ? PROJECT_STACK_LABELS[value] : "Select Stack"
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent alignItemWithTrigger={false} >
                                        <SelectGroup>
                                            {PROJECT_STACKS.map((stack) => (
                                                <SelectItem key={stack} value={stack}>
                                                    {PROJECT_STACK_LABELS[stack]}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.project_stack && (
                            <p className="text-xs text-destructive">{errors.project_stack.message}</p>
                        )}
                    </div>
                </CardContent>

                <CardFooter className="mt-6 flex items-center justify-between gap-3">
                    <Button type="button" variant="secondary" onClick={() => router.back()}>
                        <ArrowLeft />  Back
                    </Button>
                    <Button type="submit" disabled={isPending || !hasHydrated}>
                        {isPending ? (
                            <>
                                <CircularSpinner size={"xs"} /> Creating...
                            </>
                        ) : (
                            <>
                                <Plus />  Create Project
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

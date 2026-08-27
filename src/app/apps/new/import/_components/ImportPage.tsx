
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
import { ArrowLeft, ExternalLink, GitBranch, Lock, Plus } from 'lucide-react'
import Link from 'next/link'
import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { CircularSpinner } from '@/shared/components/myui/circular-spinner'
import { StackIcon } from '@/shared/components/myui/stack-icon'
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
    const defaultBranch = searchParams.get("default_branch") ?? undefined

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
            default_branch: defaultBranch,
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
                enqueueSnackbar("Project is created successfully", {
                    variant: "success",
                    autoHideDuration: 3000,
                })
                // Replace, so going back does not open the import form again.
                router.replace(`/apps/${response.data.id}`)
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
        <Card className="w-full max-w-2xl rounded-3xl shadow-float">
            <CardHeader>
                <div className="flex items-center gap-3">
                    {/* The same raised tile the project cards use, one step earlier. */}
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-secondary bg-linear-to-b from-white/8 to-transparent shadow-raised">
                        <GithubIcon className="size-4.5" />
                    </span>

                    <div>
                        <h1 className="font-heading text-lg font-semibold tracking-tight">
                            Configure your project
                        </h1>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                            Two details and the repository is ready to deploy
                        </p>
                    </div>
                </div>
            </CardHeader>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <CardContent>
                    {/* The repository is already decided, so it reads as a fact, not a field. */}
                    <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/40 bg-muted/30 p-4">
                        <Link
                            href={repoUrl || "#"}
                            target="_blank"
                            className="group flex min-w-0 items-center gap-2.5"
                        >
                            <GithubIcon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                            <span className="truncate text-sm font-medium">{fullName}</span>
                            <ExternalLink className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>

                        <div className="flex items-center gap-2">
                            {isPrivate ? (
                                <span className="flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 text-xs text-muted-foreground">
                                    <Lock className="size-3" />
                                    Private
                                </span>
                            ) : null}

                            <span className="flex items-center gap-1.5 rounded-full border border-border/60 px-2.5 py-1 font-mono text-xs text-muted-foreground">
                                <GitBranch className="size-3" />
                                {defaultBranch ?? "main"}
                            </span>
                        </div>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                        <label htmlFor="project-name" className="text-sm font-medium">
                            Project name
                        </label>
                        <p className="text-xs text-muted-foreground">
                            This is the name you will see across the dashboard
                        </p>
                        <Input
                            id="project-name"
                            placeholder="My project"
                            className="mt-1"
                            aria-invalid={!!errors.project_name}
                            {...register("project_name")}
                        />
                        {errors.project_name && (
                            <p className="text-xs text-destructive">{errors.project_name.message}</p>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                        <label htmlFor="project-stack" className="text-sm font-medium">
                            Stack
                        </label>
                        <p className="text-xs text-muted-foreground">
                            It decides how the build runs and which mark the project carries
                        </p>

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
                                        className="mt-1 w-full"
                                        aria-invalid={!!errors.project_stack}
                                    >
                                        <SelectValue placeholder="Pick a stack" className='max-w-full'>
                                            {(value: ProjectStack | null) =>
                                                value ? (
                                                    <span className="flex items-center gap-2">
                                                        <StackIcon stack={value} className="size-4 text-primary" />
                                                        {PROJECT_STACK_LABELS[value]}
                                                    </span>
                                                ) : (
                                                    "Pick a stack"
                                                )
                                            }
                                        </SelectValue>
                                    </SelectTrigger>
                                    <SelectContent alignItemWithTrigger={false} >
                                        <SelectGroup>
                                            {PROJECT_STACKS.map((stack) => (
                                                <SelectItem key={stack} value={stack}>
                                                    <StackIcon stack={stack} className="size-4 text-muted-foreground" />
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

                <CardFooter className="mt-6 flex items-center justify-between gap-3 border-t border-border/40 pt-6">
                    <Button type="button" variant="ghost" onClick={() => router.back()}>
                        <ArrowLeft />  Back
                    </Button>
                    <Button type="submit" disabled={isPending || !hasHydrated}>
                        {isPending ? (
                            <>
                                <CircularSpinner size={"xs"} /> Creating...
                            </>
                        ) : (
                            <>
                                <Plus />  Create project
                            </>
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}

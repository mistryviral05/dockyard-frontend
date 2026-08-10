
'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/shared/components/ui/card'
import { Collapsible, CollapsibleTrigger } from '@/shared/components/ui/collapsible'
import { Input } from '@/shared/components/ui/input'
import { GithubIcon } from '../../_components/github-icon'
import { useSearchParams } from 'next/navigation'
import { ArrowLeft, ChevronRight, GitBranch, Plus } from 'lucide-react'
import Link from 'next/link'
import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'

export default function ImportPage() {
    const searchParams = useSearchParams()
    const fullName = searchParams.get("repo_full_name")
    const repoUrl = searchParams.get("repo_url")
    const repoName = searchParams.get("repo_name")
    const [environmentVariablesOpen, setEnvironmentVariablesOpen] = useState(true)
    const [environmentVariables, setEnvironmentVariables] = useState([{ key: '', value: '' }])
    const { activeWorkspace, hasHydrated } = useWorkspaceStore()

    if(hasHydrated) {
        console.log("Active Workspace:", activeWorkspace)
    }

    const addEnvironmentVariable = () => {
        setEnvironmentVariables((variables) => [...variables, { key: '', value: '' }])
    }

    const updateEnvironmentVariable = (
        index: number,
        field: 'key' | 'value',
        value: string
    ) => {
        setEnvironmentVariables((variables) =>
            variables.map((variable, variableIndex) =>
                variableIndex === index ? { ...variable, [field]: value } : variable
            )
        )
    }

    return (
        <Card className="w-full max-w-2xl ">
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

                <div className="mt-6 flex flex-col gap-3 ">
                    <label htmlFor="project-name" className="text-sm font-medium">
                        Project Name
                    </label>
                    <Input
                        id="project-name"
                        placeholder="My project"
                        defaultValue={`${repoName}`}
                    />
                </div>

                <div className="mt-6 flex flex-col gap-3 ">
                    <label htmlFor="Select Stack" className="text-sm font-medium">
                        Select Stack
                    </label>

                    <Select  >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Stack" className='max-w-full' />
                        </SelectTrigger>
                        <SelectContent alignItemWithTrigger={false} >
                            <SelectGroup>
                                <SelectItem value="Next.js">Next.js</SelectItem>
                                <SelectItem value="React">React</SelectItem>
                                <SelectItem value="Express.js">Express.js</SelectItem>
                                <SelectItem value="Fastify.js">Fastify.js</SelectItem>
                                <SelectItem value="FastAPI">FastAPI</SelectItem>
                                <SelectItem value="Golang">Golang</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="mt-6 rounded-xl border bg-card">
                    <Collapsible
                        open={environmentVariablesOpen}

                        onOpenChange={setEnvironmentVariablesOpen}
                    >
                        <CollapsibleTrigger className="flex w-full cursor-pointer hover:bg-gray-100 items-center justify-between gap-4 px-4 py-3 text-left">
                            <div>
                                <p className="text-sm font-medium">Environment Variables</p>
                                <p className="text-xs text-muted-foreground">
                                    Add environment variables for your project.
                                </p>
                            </div>
                            <motion.span
                                animate={{ rotate: environmentVariablesOpen ? 90 : 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="inline-flex"
                            >
                                <ChevronRight className="size-4 text-muted-foreground" />
                            </motion.span>
                        </CollapsibleTrigger>

                        <AnimatePresence initial={false}>
                            {environmentVariablesOpen && (
                                <motion.div
                                    key="environment-variables"
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{
                                        height: 'auto',
                                        opacity: 1,
                                        transition: {
                                            duration: 0.3,
                                            ease: [0.04, 0.62, 0.23, 0.98],
                                            staggerChildren: 0.07,
                                            delayChildren: 0.1,
                                        },
                                    }}
                                    exit={{
                                        height: 0,
                                        opacity: 0,
                                        transition: { duration: 0.25, ease: 'easeInOut' },
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="border-t px-4 py-4">
                                        <div className="space-y-3">
                                            {environmentVariables.map((variable, index) => (
                                                <motion.div
                                                    key={index}
                                                    initial={{ opacity: 0, y: -6 }}
                                                    animate={{
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: { duration: 0.22, ease: 'easeOut' },
                                                    }}
                                                    className="flex flex-col gap-2 border-b pb-2 "
                                                >
                                                    <Input
                                                        aria-label={`Environment variable ${index + 1} key`}
                                                        placeholder="KEY"
                                                        value={variable.key}
                                                        onChange={(event) =>
                                                            updateEnvironmentVariable(index, 'key', event.target.value)
                                                        }
                                                    />
                                                    <Input
                                                        aria-label={`Environment variable ${index + 1} value`}
                                                        placeholder="Value"
                                                        value={variable.value}
                                                        onChange={(event) =>
                                                            updateEnvironmentVariable(index, 'value', event.target.value)
                                                        }
                                                    />
                                                </motion.div>
                                            ))}
                                        </div>

                                        <motion.div
                                            initial={{ opacity: 0, y: -6 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: { duration: 0.22, ease: 'easeOut' },
                                            }}
                                            className="mt-5 flex items-center justify-between"
                                        >
                                            <Button variant={'outline'}>
                                                Import .env
                                            </Button>
                                            <Button type="button" variant="outline" size="sm" onClick={addEnvironmentVariable}>
                                                <Plus />
                                                Add
                                            </Button>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Collapsible>
                </div>
            </CardContent>

            <CardFooter className="flex items-center justify-between gap-3">
                <Button variant="secondary" className="">
                    <ArrowLeft />  Back
                </Button>
                <Button className="">
                    <Plus />  Create Project
                </Button>
            </CardFooter>
        </Card>
    )
}

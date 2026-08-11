import { z } from "zod"

/** Stacks the API accepts for `project_stack`. */
export const PROJECT_STACKS = [
  "nextjs",
  "nodejs",
  "react",
  "go",
  "fastapi",
  "python",
  "django",
  "express",
] as const

export type ProjectStack = (typeof PROJECT_STACKS)[number]

/** Labels shown in the stack select. */
export const PROJECT_STACK_LABELS: Record<ProjectStack, string> = {
  nextjs: "Next.js",
  nodejs: "Node.js",
  react: "React",
  go: "Golang",
  fastapi: "FastAPI",
  python: "Python",
  django: "Django",
  express: "Express.js",
}

/** Full POST /v1/projects body. */
export const createProjectSchema = z.object({
  project_name: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(255, "Project name must be at most 255 characters"),
  project_stack: z.enum(PROJECT_STACKS, "Select a stack"),
  workspace_id: z
    .string()
    .trim()
    .min(1, "Workspace is required")
    .max(64, "Workspace id must be at most 64 characters"),
  github_repo_id: z
    .string()
    .trim()
    .regex(/^\d+$/, "Repository id must be numeric"),
  repo_name: z
    .string()
    .trim()
    .min(1, "Repository name is required")
    .max(255, "Repository name must be at most 255 characters"),
  repo_full_name: z
    .string()
    .trim()
    .min(1, "Repository full name is required")
    .max(255, "Repository full name must be at most 255 characters"),
  repo_url: z
    .url("Repository url is not valid")
    .max(2048, "Repository url must be at most 2048 characters"),
  repo_owner: z
    .string()
    .trim()
    .min(1, "Repository owner is required")
    .max(255, "Repository owner must be at most 255 characters"),
  is_private: z.boolean().optional().default(false),
})

/** The fields the user actually fills in — the rest come from the url and the store. */
export const projectFormSchema = createProjectSchema.pick({
  project_name: true,
  project_stack: true,
})

export type CreateProjectPayload = z.output<typeof createProjectSchema>
export type ProjectFormValues = z.output<typeof projectFormSchema>

import { cn } from "@/shared/lib/utils"
import type { ProjectStack } from "@/features/project/schema"

/**
 * One line mark per stack. They are hand drawn on a 24 grid with a single
 * stroke weight so a grid of cards stays visually even, and they inherit
 * `currentColor` so the palette keeps deciding the colour.
 */
const stackPaths: Record<ProjectStack, React.ReactNode> = {
  fastify: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M7.5 14.25h5" />
      <path d="M9.25 17V9.5a1.5 1.5 0 0 1 1.5-1.5h2.5" />
      <path d="M13.5 12.5l3.25 3.25" />
    </>
  ),
  nextjs: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.75 15.75v-7.5l7 7.5" />
      <path d="M15.25 8.25v4" />
    </>
  ),
  express: (
    <>
      <path d="M3.5 12h11" />
      <path d="M10.5 8l4 4-4 4" />
      <path d="M18 6.5a7.5 7.5 0 0 1 0 11" />
      <path d="M20.75 4a11 11 0 0 1 0 16" />
    </>
  ),
  fastapi: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12.75 6.5 8.5 12.75h3.25L11 17.5l4.5-6.5h-3.25z" />
    </>
  ),
}

function StackIcon({
  stack,
  className,
}: {
  stack: ProjectStack
  className?: string
}) {
  const mark = stackPaths[stack]

  if (!mark) return null

  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("size-6", className)}
    >
      {mark}
    </svg>
  )
}

export { StackIcon }

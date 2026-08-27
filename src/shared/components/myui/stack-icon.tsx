import { cn } from "@/shared/lib/utils"
import type { ProjectStack } from "@/features/project/schema"

/**
 * One line mark per stack. They are hand drawn on a 24 grid with a single
 * stroke weight so a grid of cards stays visually even, and they inherit
 * `currentColor` so the palette keeps deciding the colour.
 */
const stackPaths: Record<ProjectStack, React.ReactNode> = {
  nextjs: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.75 15.75v-7.5l7 7.5" />
      <path d="M15.25 8.25v4" />
    </>
  ),
  nodejs: (
    <>
      <path d="M12 2.75 20 7v10l-8 4.25L4 17V7z" />
      <path d="M9.5 14.5h1.25v-5l2.5 5H14.5" />
    </>
  ),
  react: (
    <>
      <circle cx="12" cy="12" r="2" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.75" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.75" transform="rotate(60 12 12)" />
      <ellipse
        cx="12"
        cy="12"
        rx="9.5"
        ry="3.75"
        transform="rotate(120 12 12)"
      />
    </>
  ),
  go: (
    <>
      <circle cx="14" cy="12" r="6.25" />
      <path d="M2.5 9.5h4M1.5 12.5h4.5M3.5 15.5h3" />
      <path d="M11.75 12h4.5" />
    </>
  ),
  fastapi: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12.75 6.5 8.5 12.75h3.25L11 17.5l4.5-6.5h-3.25z" />
    </>
  ),
  python: (
    <>
      <path d="M12 3.5c-3 0-3.5 1.25-3.5 2.75V9h7v1h-8C6 10 4.5 11 4.5 14s1.5 4 3.5 4h1.5v-2.5c0-1.5.75-2.5 2.5-2.5" />
      <path d="M12 20.5c3 0 3.5-1.25 3.5-2.75V15h-7v-1h8c2 0 3.5-1 3.5-4s-1.5-4-3.5-4h-1.5v2.5c0 1.5-.75 2.5-2.5 2.5" />
    </>
  ),
  django: (
    <>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <path d="M12.5 7.5v9" />
      <path d="M12.5 10.5h-1.25a2.75 2.75 0 0 0 0 5.5h1.25" />
      <path d="M16 7.5v.5" />
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

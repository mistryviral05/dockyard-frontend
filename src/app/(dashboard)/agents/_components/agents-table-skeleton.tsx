import { Skeleton } from "@/shared/components/ui/skeleton"

function AgentsTableSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-background">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0"
        >
          <Skeleton className="h-4 w-4" />
          <Skeleton className="size-9 rounded-full" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="ml-auto h-5 w-20 rounded-full" />
          <Skeleton className="h-4 w-44" />
          <Skeleton className="h-4 w-10" />
        </div>
      ))}
    </div>
  )
}

export { AgentsTableSkeleton }

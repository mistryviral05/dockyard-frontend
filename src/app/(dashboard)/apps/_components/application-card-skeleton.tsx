import { Skeleton } from "@/shared/components/ui/skeleton"

function ApplicationCardSkeleton() {
  return (
    // Mirrors the card layout, tile overhang included, so nothing jumps on load.
    <div className="relative pt-8">
      <div className="flex flex-col items-center rounded-3xl border border-border/50 bg-sidebar px-5 pt-12 pb-5">
        <Skeleton className="absolute top-1 left-1/2 size-14 -translate-x-1/2 rounded-3xl" />

        <Skeleton className="h-5 w-32" />
        <Skeleton className="mt-2 h-4 w-20" />

        <div className="mt-5 flex w-full items-center justify-between gap-3 border-t border-border/40 pt-4">
          <Skeleton className="h-3.5 w-24" />
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export { ApplicationCardSkeleton }

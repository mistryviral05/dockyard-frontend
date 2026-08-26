import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function ProjectDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Skeleton className="size-11 rounded-full" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-6 w-52" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-28 rounded-xl" />
            <Skeleton className="h-8 w-24 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} size="sm">
            <CardHeader>
              <Skeleton className="h-5 w-32" />
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/5" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <Skeleton className="h-5 w-28" />
        <div className="rounded-2xl bg-muted p-1.5">
          <div className="rounded-xl border border-border bg-background">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-border px-4 py-3 last:border-b-0"
              >
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-4 w-40" />
                <Skeleton className="ml-auto h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export { ProjectDetailSkeleton }

import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function DeploymentDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <Skeleton className="h-4 w-40" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-4 w-72" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-8 w-28 rounded-full" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
        <Card size="sm">
          <CardHeader>
            <Skeleton className="h-5 w-24" />
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-4 w-full" />
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-col gap-4">
          <Skeleton className="h-5 w-20" />
          <div className="rounded-xl bg-muted p-1.5">
            <div className="flex flex-col gap-2 rounded-xl border border-border bg-background px-4 py-3">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton key={index} className="h-3.5 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { DeploymentDetailSkeleton }

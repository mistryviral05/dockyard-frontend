import { Card, CardContent, CardHeader } from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function ApplicationCardSkeleton() {
  return (
    <Card className="h-full gap-0 py-0">
      <CardHeader className="flex items-start justify-between gap-3 pt-6">
        <Skeleton className="size-9 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </CardHeader>

      <CardContent className="pt-6 pb-6">
        <Skeleton className="h-5 w-36" />
        <Skeleton className="mt-2 h-3.5 w-28" />
        <Skeleton className="mt-4 h-5 w-20 rounded-full" />
      </CardContent>
    </Card>
  )
}

export { ApplicationCardSkeleton }

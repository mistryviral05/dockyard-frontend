import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"


function ReposSkeleton() {
  return (
    <ul className="max-h-100 divide-y divide-border/40 border-t border-border/40">
      {Array.from({ length: 7 }).map((_, index) => (
        <li
          key={index}
          className="flex items-center justify-between gap-3 px-6 py-3"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="size-9 rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
          <Skeleton className="h-7 w-16 rounded-md" />
        </li>
      ))}
    </ul>
  )
}


function GitRepositoriesSkeleton() {
  return (
    <Card className="w-full max-w-xl rounded-3xl shadow-float">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-9 sm:w-52" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ReposSkeleton />
      </CardContent>
    </Card>
  )
}

export { GitRepositoriesSkeleton, ReposSkeleton }

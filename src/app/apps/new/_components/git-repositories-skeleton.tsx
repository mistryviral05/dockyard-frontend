import {
  Card,
  CardContent,
  CardHeader,
} from "@/shared/components/ui/card"
import { Skeleton } from "@/shared/components/ui/skeleton"

function GitRepositoriesSkeleton() {
  return (
    <Card className="w-full max-w-xl">
      <CardHeader>
        <Skeleton className="h-6 w-44" />
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <Skeleton className="h-9 sm:w-52" />
          <Skeleton className="h-9 flex-1" />
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <ul className="divide-y divide-border border-t border-border">
          {Array.from({ length: 5 }).map((_, index) => (
            <li
              key={index}
              className="flex items-center justify-between gap-3 px-6 py-3"
            >
              <div className="flex items-center gap-3">
                <Skeleton className="size-8 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-28" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
              <Skeleton className="h-8 w-16" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

export { GitRepositoriesSkeleton }

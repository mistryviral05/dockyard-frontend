import Link from "next/link"
import { AppWindow, TriangleAlert } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Badge } from "@/shared/components/myui/badge"

export type Application = {
  id: string
  name: string
  domain: string
  hasProduction: boolean
  updatedLabel: string
  /** Tailwind classes for the accent bar at the top of the card. */
  accentClassName?: string
}

function ApplicationCard({ application }: { application: Application }) {
  const { id, name, domain, hasProduction, updatedLabel, accentClassName } =
    application

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/apps/${id}`}
        className="group rounded-md outline-none"
      >
        <Card className="gap-0 py-0">

          <CardHeader className="gap-3 pt-6">
            <span className="flex size-9 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <AppWindow className="size-5" />
            </span>
            <p className="truncate font-mono text-xs text-muted-foreground">
              {domain}
            </p>
          </CardHeader>

          <CardContent className="pt-6 pb-6">
            <CardTitle className="text-lg">{name}</CardTitle>
            <div className="mt-3">
              {hasProduction ? (
                <Badge variant="primary">Production</Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-muted-foreground [&_svg]:text-amber-500"
                >
                  <TriangleAlert />
                  No Production Environment
                </Badge>
              )}
            </div>
          </CardContent>

        </Card>
      </Link>


    </div>
  )
}

export { ApplicationCard }

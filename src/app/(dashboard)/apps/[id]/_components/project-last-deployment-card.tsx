import Link from "next/link"
import { formatDistanceToNowStrict } from "date-fns"
import { ExternalLink, Rocket } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { StatusBadge } from "@/shared/components/myui/status-badge"
import { hostnameOf } from "@/shared/lib/utils"
import type { ProjectLastDeployment } from "@/features/project/types"

function ProjectLastDeploymentCard({
  deployment,
  url,
}: {
  deployment: ProjectLastDeployment | null
  /** Set only while the last deployment is running. */
  url: string | null
}) {
  return (
    <Card size="sm" className="h-full">
      <CardHeader className="flex items-center justify-between gap-3">
        <CardTitle className="flex items-center gap-2">
          <Rocket className="size-4 text-muted-foreground" />
          Last deployment
        </CardTitle>
        {deployment ? <StatusBadge status={deployment.status} /> : null}
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {deployment ? (
          <>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-muted-foreground">
                {deployment.branch}
              </span>
              <span className="text-sm text-muted-foreground">
                {formatDistanceToNowStrict(new Date(deployment.created_at), {
                  addSuffix: true,
                })}
              </span>
            </div>

            {url ? (
              <a
                href={url}
                title={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary/80"
              >
                <span className="truncate">{hostnameOf(url)}</span>
                <ExternalLink className="size-3.5 shrink-0" />
              </a>
            ) : null}

            <Button
              variant="outline"
              size="sm"
              className="w-fit"
              nativeButton={false}
              render={<Link href={`/deployments/${deployment.id}`} />}
            >
              View logs
            </Button>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            This project has not been deployed yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

export { ProjectLastDeploymentCard }

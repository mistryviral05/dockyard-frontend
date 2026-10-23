import { format, formatDistanceStrict } from "date-fns"
import { ExternalLink, Info } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { DetailRow } from "@/shared/components/myui/detail-row"
import { hostnameOf } from "@/shared/lib/utils"
import type { Deployment } from "@/features/deployment/types"

/** Blank while the deployment is still running, so the row shows a dash instead. */
function duration(deployment: Deployment) {
  if (!deployment.started_at || !deployment.completed_at) {
    return null
  }

  return formatDistanceStrict(
    new Date(deployment.started_at),
    new Date(deployment.completed_at)
  )
}

/** The live address can arrive on the channel before the row is refetched. */
function DeploymentSummaryCard({
  deployment,
  url,
}: {
  deployment: Deployment
  url: string | null
}) {
  const took = duration(deployment)

  return (
    <Card size="sm" className="">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Info className="size-4 text-muted-foreground" />
          Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col">
        <DetailRow label="Branch">
          <span className="font-mono text-xs">{deployment.branch}</span>
        </DetailRow>

        <DetailRow label="Commit">
          {deployment.commit_sha ? (
            <span className="font-mono text-xs">
              {deployment.commit_sha.slice(0, 7)}
            </span>
          ) : (
            <span className="text-muted-foreground">No commit</span>
          )}
        </DetailRow>

        <DetailRow label="Message">
          {deployment.commit_message ?? (
            <span className="text-muted-foreground">No message</span>
          )}
        </DetailRow>

        <DetailRow label="Trigger">
          {deployment.trigger_source === "manual" ? "Manual" : "Webhook"}
        </DetailRow>

        <DetailRow label="Image">
          {deployment.image_tag ? (
            <span className="font-mono text-xs">{deployment.image_tag}</span>
          ) : (
            <span className="text-muted-foreground">Not built yet</span>
          )}
        </DetailRow>

        <DetailRow label="URL">
          {url ? (
            <a
              href={url}
              title={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex max-w-full items-center gap-1.5 truncate text-primary transition-colors hover:text-primary/80"
            >
              <span className="truncate">{hostnameOf(url)}</span>
              <ExternalLink className="size-3.5 shrink-0" />
            </a>
          ) : (
            <span className="text-muted-foreground">Not live yet</span>
          )}
        </DetailRow>

        <DetailRow label="Started">
          {deployment.started_at ? (
            format(new Date(deployment.started_at), "d MMM yyyy, HH:mm:ss")
          ) : (
            <span className="text-muted-foreground">Waiting</span>
          )}
        </DetailRow>

        <DetailRow label="Took">
          {took ?? <span className="text-muted-foreground">In progress</span>}
        </DetailRow>
      </CardContent>
    </Card>
  )
}

export { DeploymentSummaryCard }

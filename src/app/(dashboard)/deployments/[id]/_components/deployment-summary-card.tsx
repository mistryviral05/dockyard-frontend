import { format, formatDistanceStrict } from "date-fns"
import { Info } from "lucide-react"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card"
import { DetailRow } from "@/shared/components/myui/detail-row"
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

function DeploymentSummaryCard({ deployment }: { deployment: Deployment }) {
  const took = duration(deployment)

  return (
    <Card size="sm" className="h-full">
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

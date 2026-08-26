"use client"

import { DeploymentHeader } from "./deployment-header"
import { DeploymentTimeline } from "./deployment-timeline"
import { DeploymentSummaryCard } from "./deployment-summary-card"
import { DeploymentErrorAlert } from "./deployment-error-alert"
import { DeploymentLogs } from "./deployment-logs"
import {
  placeholderDeployment,
  placeholderLogs,
  placeholderProjectName,
} from "./placeholder-deployment"

function DeploymentDetailPage() {
  // Static sample for now, the deployment query and the live channel replace it later.
  const deployment = placeholderDeployment
  const isLive =
    deployment.status === "building" ||
    deployment.status === "deploying" ||
    deployment.status === "queued"

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
      <DeploymentHeader
        deployment={deployment}
        projectName={placeholderProjectName}
      />

      <DeploymentTimeline status={deployment.status} />

      {deployment.error_message ? (
        <DeploymentErrorAlert message={deployment.error_message} />
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[20rem_1fr]">
        <DeploymentSummaryCard deployment={deployment} />
        <DeploymentLogs logs={placeholderLogs} isLive={isLive} />
      </div>
    </div>
  )
}

export { DeploymentDetailPage }

import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { Deployment, DeploymentLogPage } from "./types"

class DeploymentService {

    private base: string = "/v1/deployments"

    getDeployment(deploymentId: string) {
        return useApiStore.getState().requestGet<GeneralData<Deployment>>(this.base + `/${deploymentId}`)
    }

    getDeploymentLogs(deploymentId: string, cursor?: string, limit: number = 200) {
        const query = new URLSearchParams({ limit: String(limit) })
        if (cursor) {
            query.set("cursor", cursor)
        }
        return useApiStore.getState().requestGet<GeneralData<DeploymentLogPage>>(this.base + `/${deploymentId}/logs?${query.toString()}`)
    }
}

export const deploymentService = new DeploymentService()

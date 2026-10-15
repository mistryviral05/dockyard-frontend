import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { Agent, AgentMetrics, AgentMetricsParams, CreatedAgent } from "./types"
import { CreateAgentPayload } from "./schema"

class AgentService {

    private base: string = "/v1/agents"

    getAgents() {
        return useApiStore.getState().requestGet<GeneralData<Agent[]>>(this.base)
    }

    createAgent(payload: CreateAgentPayload) {
        return useApiStore.getState().requestPost<GeneralData<CreatedAgent>>(this.base, payload)
    }

    /** Status, current sample and the chart series. `since` keeps the response to the new points only. */
    getAgentMetrics(agentId: string, params: AgentMetricsParams = {}) {
        const query = new URLSearchParams()
        if (params.window) {
            query.set("window", params.window)
        }
        if (params.since) {
            query.set("since", params.since)
        }
        const search = query.toString()
        return useApiStore.getState().requestGet<GeneralData<AgentMetrics>>(
            this.base + `/${agentId}/metrics` + (search ? `?${search}` : "")
        )
    }
}

export const agentService = new AgentService()

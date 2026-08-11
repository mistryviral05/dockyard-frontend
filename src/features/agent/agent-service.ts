import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { Agent, CreatedAgent } from "./types"
import { CreateAgentPayload } from "./schema"

class AgentService {

    private base: string = "/v1/agents"

    getAgents() {
        return useApiStore.getState().requestGet<GeneralData<Agent[]>>(this.base)
    }

    createAgent(payload: CreateAgentPayload) {
        return useApiStore.getState().requestPost<GeneralData<CreatedAgent>>(this.base, payload)
    }
}

export const agentService = new AgentService()

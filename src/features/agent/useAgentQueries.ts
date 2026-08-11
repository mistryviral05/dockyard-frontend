import { useMutation, useQuery } from "@tanstack/react-query"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { agentService } from "./agent-service"
import { Agent } from "./types"
import { CreateAgentPayload } from "./schema"

class AgentQueries {

    useGetAgents() {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["agents"],
            queryFn: agentService.getAgents.bind(agentService),
            enabled: isApiReady,
            select: (data: GeneralData<Agent[]>) => data?.data || [],
        })
    }

    useCreateAgent() {
        return useMutation({
            mutationFn: (payload: CreateAgentPayload) => agentService.createAgent.bind(agentService)(payload),
        })
    }

}

export const agentQueries = new AgentQueries()

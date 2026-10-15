import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { isAxiosError } from "axios"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { agentService } from "./agent-service"
import {
    Agent,
    AgentMetrics,
    AgentMetricsPoint,
    AgentMetricsWindow,
    DEFAULT_AGENT_METRICS_WINDOW,
} from "./types"
import { CreateAgentPayload } from "./schema"

/** Fallback poll used only until the first response carries its own `poll_seconds`. */
const FALLBACK_POLL_SECONDS = 15

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

    /**
     * Status cards plus the chart series for one agent.
     * The first call pulls the whole window, every later poll asks only for the
     * points newer than the last one held and merges them into the cache.
     * The interval follows the `poll_seconds` the server asks for.
     */
    useGetAgentMetrics(agentId?: string, window: AgentMetricsWindow = DEFAULT_AGENT_METRICS_WINDOW) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        const queryClient = useQueryClient()
        const queryKey = ["agent-metrics", agentId, window]

        return useQuery({
            queryKey,
            queryFn: async () => {
                const cached = queryClient.getQueryData<GeneralData<AgentMetrics>>(queryKey)
                const since = cached?.data?.series?.at(-1)?.t
                const response = await agentService.getAgentMetrics.bind(agentService)(agentId!, {
                    window,
                    since,
                })
                return this.mergeMetrics(cached, response)
            },
            enabled: isApiReady && !!agentId,
            refetchInterval: (query) => {
                // A missing agent never comes back, a network blip does, so only 404 stops the poll.
                if (isAxiosError(query.state.error) && query.state.error.response?.status === 404) {
                    return false
                }

                const seconds = query.state.data?.data?.poll_seconds || FALLBACK_POLL_SECONDS
                return seconds * 1000
            },
            placeholderData: keepPreviousData,
            select: (data: GeneralData<AgentMetrics>) => data?.data,
        })
    }

    /**
     * Keeps the response as the source of truth for the live fields and only
     * rebuilds the series, so an incremental response never shrinks the chart.
     */
    private mergeMetrics(
        cached: GeneralData<AgentMetrics> | undefined,
        response: GeneralData<AgentMetrics>,
    ): GeneralData<AgentMetrics> {
        const previous = cached?.data?.series
        if (!response?.data || !previous?.length) {
            return response
        }

        return {
            ...response,
            data: {
                ...response.data,
                series: this.trimToWindow(
                    this.dedupeByTime([...previous, ...response.data.series]),
                    response.data.window_seconds,
                ),
            },
        }
    }

    /** A bucket can be resent with a corrected value, so the newer point wins. */
    private dedupeByTime(points: AgentMetricsPoint[]): AgentMetricsPoint[] {
        const byTime = new Map<string, AgentMetricsPoint>()
        points.forEach((point) => byTime.set(point.t, point))
        return Array.from(byTime.values()).sort(
            (a, b) => Date.parse(a.t) - Date.parse(b.t),
        )
    }

    /** Drops the points that fell out of the selected window as time moved on. */
    private trimToWindow(points: AgentMetricsPoint[], windowSeconds: number): AgentMetricsPoint[] {
        const newest = points.at(-1)
        if (!newest || !windowSeconds) {
            return points
        }

        const floor = Date.parse(newest.t) - windowSeconds * 1000
        return points.filter((point) => Date.parse(point.t) >= floor)
    }

}

export const agentQueries = new AgentQueries()

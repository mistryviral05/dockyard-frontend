import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { deploymentService } from "./deployment-service"
import { Deployment, DeploymentLogPage, isTerminalStatus } from "./types"

/** How often a deployment that is still moving is refreshed. */
const LIVE_REFETCH_INTERVAL = 4000

class DeploymentQueries {

    useGetDeployment(deploymentId?: string) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["deployment", deploymentId],
            queryFn: () => deploymentService.getDeployment.bind(deploymentService)(deploymentId!),
            enabled: isApiReady && !!deploymentId,
            select: (data: GeneralData<Deployment>) => data?.data,
            refetchInterval: (query) => {
                const status = query.state.data?.data?.status
                return status && !isTerminalStatus(status) ? LIVE_REFETCH_INTERVAL : false
            },
        })
    }

    /** Logs page from oldest to newest, the cursor walks forward to the newer lines. */
    useGetDeploymentLogs(deploymentId?: string, isLive: boolean = false, limit: number = 200) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useInfiniteQuery({
            queryKey: ["deployment-logs", deploymentId, limit],
            queryFn: ({ pageParam }: { pageParam?: string }) =>
                deploymentService.getDeploymentLogs.bind(deploymentService)(deploymentId!, pageParam, limit),
            enabled: isApiReady && !!deploymentId,
            initialPageParam: undefined as string | undefined,
            getNextPageParam: (lastPage: GeneralData<DeploymentLogPage>) =>
                lastPage?.data?.next_cursor ?? undefined,
            select: (data) => data.pages.flatMap((page) => page?.data?.items || []),
            refetchInterval: isLive ? LIVE_REFETCH_INTERVAL : false,
        })
    }

}

export const deploymentQueries = new DeploymentQueries()

import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { deploymentService } from "./deployment-service"
import { Deployment, DeploymentLogPage } from "./types"

class DeploymentQueries {

    /** Status moves arrive on the centrifugo channel, so this is never polled. */
    useGetDeployment(deploymentId?: string) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["deployment", deploymentId],
            queryFn: () => deploymentService.getDeployment.bind(deploymentService)(deploymentId!),
            enabled: isApiReady && !!deploymentId,
            select: (data: GeneralData<Deployment>) => data?.data,
        })
    }

    /**
     * History only, from oldest to newest, the cursor walks forward to the newer lines.
     * Live lines come from the channel once every page is in.
     */
    useGetDeploymentLogs(deploymentId?: string, limit: number = 200) {
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
        })
    }

}

export const deploymentQueries = new DeploymentQueries()

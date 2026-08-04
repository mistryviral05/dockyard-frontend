import { useApiStore } from "@/store/useApiStore"
import { useMutation, useQuery } from "@tanstack/react-query"
import { workspaceService } from "./workspace-service"
import { CreateWorkspaceValues } from "@/shared/components/navbar/create-wsp-schema";


class WorkspaceQueries {


    useGetWorkspaces() {
        const isApiReady = useApiStore((state) => state.isApiReady);
        return useQuery({
            queryKey: ["workspaces"],
            queryFn: workspaceService.getWorkspaces.bind(workspaceService),
            enabled: isApiReady,
        })
    }

    useCreateWorkspace() {
        // const isApiReady = useApiStore((state) => state.isApiReady);
        return useMutation({
            mutationFn: (payload: CreateWorkspaceValues) => workspaceService.createWorkspace.bind(workspaceService)(payload),
        })
    }

}

export const workspaceQueries = new WorkspaceQueries()
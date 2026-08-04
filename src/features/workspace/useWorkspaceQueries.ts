import { useApiStore } from "@/store/useApiStore"
import { useQuery } from "@tanstack/react-query"
import { workspaceService } from "./workspace-service"


class WorkspaceQueries {


    useGetWorkspaces() {

        const isApiReady = useApiStore((state) => state.isApiReady);
        return useQuery({
            queryKey: ["workspaces"],
            queryFn: workspaceService.getWorkspaces.bind(workspaceService),
            enabled: isApiReady,
        })
    }

}

export const workspaceQueries = new WorkspaceQueries()
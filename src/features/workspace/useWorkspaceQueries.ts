import { useApiStore } from "@/store/useApiStore"
import { useQuery } from "@tanstack/react-query"
import { workspaceService } from "./workspace-service"


export class WorkspaceQueries {
    private isApiReady: boolean = false
    constructor() {
        this.isApiReady = useApiStore.getState().isApiReady
    }

    useGetWorkspaces() {
        return useQuery({
            queryKey: ["workspaces"],
            queryFn: workspaceService.getWorkspaces,
            enabled: this.isApiReady,
        })
    }

}
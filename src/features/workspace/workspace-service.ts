import { useApiStore } from "@/store/useApiStore";
import { Workspace } from "./types";



class WorkspaceService {

    private base = "/v1/workspaces"

    getWorkspaces() {
        return useApiStore.getState().requestGet<Workspace[]>(this.base)
    }
}

export const workspaceService = new WorkspaceService()
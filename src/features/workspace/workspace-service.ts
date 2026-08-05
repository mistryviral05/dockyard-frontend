import { useApiStore } from "@/store/useApiStore";
import { Workspace } from "./types";
import { CreateWorkspaceValues } from "@/shared/components/navbar/create-wsp-schema";
import { GeneralMessage } from "@/shared/types/responses";



class WorkspaceService {

    private base = "/v1/workspaces"

    getWorkspaces() {
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        return useApiStore.getState().requestGet<Workspace[]>(this.base)
    }

    createWorkspace(payload: CreateWorkspaceValues) {
        return useApiStore.getState().requestPost<GeneralMessage>(this.base, payload)
    }
}


export const workspaceService = new WorkspaceService()
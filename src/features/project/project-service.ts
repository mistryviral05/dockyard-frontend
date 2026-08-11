import { GeneralData, GeneralMessage } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { CreateProjectPayload } from "./schema"
import { Project } from "./types"

class ProjectService {

    private base: string = "/v1/projects"

    getProjects(workspaceId: string) {
        return useApiStore.getState().requestGet<GeneralData<Project[]>>(this.base + `?workspace_id=${workspaceId}`)
    }

    createProject(payload: CreateProjectPayload) {
        return useApiStore.getState().requestPost<GeneralMessage>(this.base, payload)
    }
}

export const projectService = new ProjectService()

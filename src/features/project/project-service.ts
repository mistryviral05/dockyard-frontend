import { GeneralMessage } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { CreateProjectPayload } from "./schema"

class ProjectService {

    private base: string = "/v1/projects"

    createProject(payload: CreateProjectPayload) {
        return useApiStore.getState().requestPost<GeneralMessage>(this.base, payload)
    }
}

export const projectService = new ProjectService()

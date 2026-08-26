import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { Deployment, StartedDeployment } from "@/features/deployment/types"
import { CreateProjectPayload } from "./schema"
import { CreatedProject, Project, ProjectDetail } from "./types"

class ProjectService {

    private base: string = "/v1/projects"

    getProjects(workspaceId: string) {
        return useApiStore.getState().requestGet<GeneralData<Project[]>>(this.base + `?workspace_id=${workspaceId}`)
    }

    getProject(projectId: string) {
        return useApiStore.getState().requestGet<GeneralData<ProjectDetail>>(this.base + `/${projectId}`)
    }

    createProject(payload: CreateProjectPayload) {
        return useApiStore.getState().requestPost<GeneralData<CreatedProject>>(this.base, payload)
    }

    setProjectAgent(projectId: string, agentId: string) {
        return useApiStore.getState().requestPut<GeneralData<ProjectDetail>>(this.base + `/${projectId}/agent`, { agent_id: agentId })
    }

    deployProject(projectId: string, branch?: string) {
        return useApiStore.getState().requestPost<GeneralData<StartedDeployment>>(this.base + `/${projectId}/deploy`, branch ? { branch } : {})
    }

    getProjectDeployments(projectId: string, cursor?: string, limit: number = 20) {
        const query = new URLSearchParams({ limit: String(limit) })
        if (cursor) {
            query.set("cursor", cursor)
        }
        return useApiStore.getState().requestGet<GeneralData<Deployment[]>>(this.base + `/${projectId}/deployments?${query.toString()}`)
    }
}

export const projectService = new ProjectService()

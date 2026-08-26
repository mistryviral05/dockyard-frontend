import { useMutation, useQuery } from "@tanstack/react-query"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { Deployment } from "@/features/deployment/types"
import { projectService } from "./project-service"
import { CreateProjectPayload } from "./schema"
import { Project, ProjectDetail } from "./types"

class ProjectQueries {

    useGetProjects(workspaceId?: string) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["projects", workspaceId],
            queryFn: () => projectService.getProjects.bind(projectService)(workspaceId!),
            enabled: isApiReady && !!workspaceId,
            select: (data: GeneralData<Project[]>) => data?.data || [],
        })
    }

    useGetProject(projectId?: string) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["project", projectId],
            queryFn: () => projectService.getProject.bind(projectService)(projectId!),
            enabled: isApiReady && !!projectId,
            select: (data: GeneralData<ProjectDetail>) => data?.data,
        })
    }

    useGetProjectDeployments(projectId?: string, limit: number = 20) {
        const isApiReady = useApiStore((state) => state.isApiReady)
        return useQuery({
            queryKey: ["project-deployments", projectId, limit],
            queryFn: () => projectService.getProjectDeployments.bind(projectService)(projectId!, undefined, limit),
            enabled: isApiReady && !!projectId,
            select: (data: GeneralData<Deployment[]>) => data?.data || [],
        })
    }

    useCreateProject() {
        return useMutation({
            mutationFn: (payload: CreateProjectPayload) => projectService.createProject.bind(projectService)(payload),
        })
    }

    useSetProjectAgent(projectId: string) {
        return useMutation({
            mutationFn: (agentId: string) => projectService.setProjectAgent.bind(projectService)(projectId, agentId),
        })
    }

    useDeployProject(projectId: string) {
        return useMutation({
            mutationFn: (branch?: string) => projectService.deployProject.bind(projectService)(projectId, branch),
        })
    }

}

export const projectQueries = new ProjectQueries()

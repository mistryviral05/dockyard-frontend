import { useMutation, useQuery } from "@tanstack/react-query"
import { useApiStore } from "@/store/useApiStore"
import { GeneralData } from "@/shared/types/responses"
import { projectService } from "./project-service"
import { CreateProjectPayload } from "./schema"
import { Project } from "./types"

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

    useCreateProject() {
        return useMutation({
            mutationFn: (payload: CreateProjectPayload) => projectService.createProject.bind(projectService)(payload),
        })
    }

}

export const projectQueries = new ProjectQueries()

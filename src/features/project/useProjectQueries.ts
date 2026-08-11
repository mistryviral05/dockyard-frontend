import { useMutation } from "@tanstack/react-query"
import { projectService } from "./project-service"
import { CreateProjectPayload } from "./schema"

class ProjectQueries {

    useCreateProject() {
        return useMutation({
            mutationFn: (payload: CreateProjectPayload) => projectService.createProject.bind(projectService)(payload),
        })
    }

}

export const projectQueries = new ProjectQueries()

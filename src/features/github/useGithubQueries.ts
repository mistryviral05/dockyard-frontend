import { useMutation } from "@tanstack/react-query";
import { githubService } from "./github-service";



class GithubQueries {


    useGetGithubInstallUrl() {
        return useMutation({
            mutationFn: githubService.getGithubInstallUrl.bind(githubService)
        })
    }

    useInstallGithubApp() {
       
        return useMutation({
            mutationFn: ({ installationId, state }: { installationId: string, state: string }) => githubService.installGithubApp.bind(githubService)(installationId, state),

        })
    }


}

export const githubQueries = new GithubQueries()
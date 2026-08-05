import { useMutation } from "@tanstack/react-query";
import { githubService } from "./github-service";



class GithubQueries {


    useGetGithubInstallUrl() {
        return useMutation({
            mutationFn: githubService.getGithubInstallUrl.bind(githubService)
        })
    }


}

export const githubQueries = new GithubQueries()
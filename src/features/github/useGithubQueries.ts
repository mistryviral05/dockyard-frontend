import { useMutation, useQuery } from "@tanstack/react-query";
import { githubService } from "./github-service";
import { useApiStore } from "@/store/useApiStore";



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
    useGetInstallations() {

        const isApiReady = useApiStore(state => state.isApiReady)
        return useQuery({
            queryKey: ["github-installations"],
            queryFn: githubService.getInstallations.bind(githubService),
            enabled: isApiReady
        })
    }

}

export const githubQueries = new GithubQueries()
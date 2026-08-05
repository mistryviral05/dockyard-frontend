import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { GithubLinkUrl } from "./types"



class GithubService {

    private base: string = "/v1/github"


    getGithubInstallUrl() {
        return useApiStore.getState().requestGet<GeneralData<{link:string}>>(this.base + "/install-url")
    }
}

export const githubService = new GithubService()
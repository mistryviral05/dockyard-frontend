import { GeneralData, GeneralMessage } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { GithubLinkUrl } from "./types"



class GithubService {

    private base: string = "/v1/github"


    getGithubInstallUrl() {
        return useApiStore.getState().requestGet<GeneralData<{ link: string }>>(this.base + "/install-url")
    }

    installGithubApp(installationId: string, state: string) {
        return useApiStore.getState().requestPost<GeneralMessage>(this.base + "/installations", {
            installation_id: installationId,
            state: state
        })
    }
}

export const githubService = new GithubService()
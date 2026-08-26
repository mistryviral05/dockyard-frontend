import { GeneralData } from "@/shared/types/responses"
import { useApiStore } from "@/store/useApiStore"
import { ConnectionInfo } from "./types"

class RealtimeService {

    private base: string = "/v1/centrifugo"

    getConnectionInfo() {
        return useApiStore.getState().requestPost<GeneralData<ConnectionInfo>>(this.base + "/token")
    }
}

export const realtimeService = new RealtimeService()

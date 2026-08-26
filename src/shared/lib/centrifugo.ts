import { Centrifuge } from "centrifuge"

import { realtimeService } from "@/features/realtime/realtime-service"

let client: Centrifuge | null = null
let connecting: Promise<Centrifuge> | null = null

/** The first call also carries the socket url, so the client is built lazily. */
async function fetchConnectionInfo() {
    const response = await realtimeService.getConnectionInfo()
    return response.data
}

/**
 * One socket per tab, shared by every subscription.
 * centrifuge asks `getToken` again when the token expires, so there is no
 * reconnect logic to write here.
 */
export function getCentrifugeClient() {
    if (client) {
        return Promise.resolve(client)
    }

    if (connecting) {
        return connecting
    }

    connecting = (async () => {
        try {
            const info = await fetchConnectionInfo()

            const instance = new Centrifuge(info.url, {
                token: info.token,
                getToken: async () => {
                    const next = await fetchConnectionInfo()
                    return next.token
                },
            })

            instance.connect()
            client = instance
            return instance
        } catch (error) {
            // Drop the failed attempt, otherwise every later call gets this same rejection.
            connecting = null
            throw error
        }
    })()

    return connecting
}

export function disconnectCentrifuge() {
    client?.disconnect()
    client = null
    connecting = null
}

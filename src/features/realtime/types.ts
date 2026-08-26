/** POST /v1/centrifugo/token — everything needed to open the socket. */
export type ConnectionInfo = {
    token: string
    url: string
    expires_in: number
}

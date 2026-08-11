import { GeneralMessage } from "@/shared/types/responses"

/** POST /v1/projects — the API answers with a plain status/message body. */
export type CreateProjectResponse = GeneralMessage

/** Shape of the error body the API returns on a failed create. */
export type ProjectErrorResponse = {
    status: "error"
    error: string
}

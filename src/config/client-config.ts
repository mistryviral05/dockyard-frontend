

const _clientAppConfig = {
    baseUrl : process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000/api",
}

export const clientAppConfig = Object.freeze(_clientAppConfig);
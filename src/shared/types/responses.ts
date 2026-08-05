


export type GeneralMessage = {
    status: 'success' | "error",
    message: string
}

export type GeneralData<T> = {
    status: 'success' | "error",
    data: T
}
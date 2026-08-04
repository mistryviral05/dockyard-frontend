'use client'
import api from '@/shared/lib/api-client';
import { create } from 'zustand';
type ClerkGetToken = () => Promise<string | null>;

type RequestOptions = {
    auth?: boolean
}

type ApiStore = {
    clerkGetToken: ClerkGetToken | null;
    isApiReady: boolean;
    setClerkGetToken: (getToken: ClerkGetToken) => void;

    requestGet: <T>(url: string, options?: RequestOptions) => Promise<T>;
    requestPost: <T>(url: string, data?: unknown, options?: RequestOptions) => Promise<T>;
}
export const useApiStore = create<ApiStore>((set, get) => ({
    clerkGetToken: null,
    isApiReady: false,

    setClerkGetToken: (clerkGetToken) => {
        set({
            clerkGetToken,
            isApiReady: true
        })
    },

    requestGet: async <T,>(url: string, options: RequestOptions = {}) => {
        const { auth = true } = options;
        const token = auth ? await get().clerkGetToken?.() : null;
        // console.log(token?.slice(-20));
        const response = await api.get<T>(url, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        return response.data
    },
    requestPost: async <T,>(url: string, data?: unknown, options: RequestOptions = {}) => {
        const { auth = true } = options;
        const token = auth ? await get().clerkGetToken?.() : null;

        const response = await api.post<T>(url, data, {
            headers: token ? { Authorization: `Bearer ${token}` } : undefined
        })
        return response.data
    },


}))
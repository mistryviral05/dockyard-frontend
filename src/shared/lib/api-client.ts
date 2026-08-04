// import { NEXT_PUBLIC_BASE_URL } from '@/constant/EnvVariables';
import { clientAppConfig } from '@/config/client-config';
import axios from 'axios';


const baseUrl = clientAppConfig.baseUrl;
const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    // withCredentials: true, // for cookie-based auth
})

api.interceptors.response.use(
    response => response,
    error => {
        return Promise.reject(error); // keep AxiosError intact
    }
)

export default api;
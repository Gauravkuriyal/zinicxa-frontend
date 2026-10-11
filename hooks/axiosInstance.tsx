import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_DOMAIN,
    timeout: 10000,
});

// Request interceptor → attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor → handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status === 401 || status === 403) {
            // toast.error("Session expired please login again")
            console.warn("Unauthorized — token removed");
        }

        return Promise.reject(error);
    }
);

export default api;

import axios from "axios";

export const NEON_FUNCTIONS_URL = import.meta.env.VITE_NEON_FUNCTIONS_URL || import.meta.env.VITE_PUBLIC_API_URL;

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL || "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use((config) => {
    // Route public product & store requests to Neon Functions if URL is configured
    if (NEON_FUNCTIONS_URL && config.url) {
        const isPublicRead =
            (!config.method || config.method.toLowerCase() === "get") &&
            (config.url.startsWith("/api/products") ||
                config.url.startsWith("/api/stores/slug/") ||
                config.url.startsWith("/api/stores/public/featured"));

        if (isPublicRead) {
            config.baseURL = NEON_FUNCTIONS_URL;
        }
    }

    const token = localStorage.getItem("storeifly_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

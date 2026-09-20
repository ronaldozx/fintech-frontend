import axios, { type AxiosError } from "axios";

type ErrorBody = string | { detail?: string; message?: string };

const DEFAULT_ERROR_MESSAGE = "Erro inesperado, tente novamente";
const LOGIN_PATH = "/auth/login";

let unauthorizedHandler: (() => void) | null = null;

export function setUnauthorizedHandler(handler: (() => void) | null) {
    unauthorizedHandler = handler;
}

function extractMessage(body: ErrorBody | undefined) {
    if (typeof body === "string" && body.trim() !== "") return body;
    if (body && typeof body === "object") return body.detail ?? body.message ?? DEFAULT_ERROR_MESSAGE;
    return DEFAULT_ERROR_MESSAGE;
}

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/",
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token && token !== "null" && token !== "undefined" && token !== "") {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorBody>) => {
        const isLoginRequest = error.config?.url?.startsWith(LOGIN_PATH) ?? false;
        if (error.response?.status === 401 && !isLoginRequest) {
            unauthorizedHandler?.();
        }
        return Promise.reject(new Error(extractMessage(error.response?.data)));
    },
);

export default apiClient;

import type { Login, Register } from "../types/Auth";
import axios from "axios";
import apiClient from "./apiClient";


export const loginAuth = async (data: Login) => {
    try {
        const response = await apiClient.post("/auth/login", {
            email: data.email,
            password: data.password,
        });
        const token = response.data.token;
        if (token && token !== "null" && token !== "undefined") {
            localStorage.setItem("token", token);
        } else {
            localStorage.removeItem("token");
        }
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data);
        }
        throw new Error("Erro inesperado, tente novamente");
    }
};

export const registerAuth = async (data: Register) => {
    try {
        const response = await apiClient.post("/auth/register", {
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            birthDate: data.birthDate,
            monthlyIncome: data.monthlyIncome,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data);
        }
        throw new Error("Erro inesperado, tente novamente");
    }
};


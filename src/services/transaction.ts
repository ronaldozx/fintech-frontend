import apiClient from "./apiClient";
import type { Dashboard, DashboardParams } from "../types/Transaction";

export const importOfx = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<string>("/transaction/import/ofx", formData);
    return response.data;
};

export const getDashboard = async (params: DashboardParams) => {
    const response = await apiClient.get<Dashboard>("/transaction/dashboard", { params });
    return response.data;
};

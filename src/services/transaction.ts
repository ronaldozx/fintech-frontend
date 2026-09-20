import apiClient from "./apiClient";
import type { Dashboard, DashboardParams } from "../types/Transaction";

export const getDashboard = async (params: DashboardParams) => {
    const response = await apiClient.get<Dashboard>("/transaction/dashboard", { params });
    return response.data;
};

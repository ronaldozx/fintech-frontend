import apiClient from "./apiClient";
import type { CategorySummary, Dashboard, DashboardParams, DateRange, MonthlySummary } from "../types/Transaction";

export const getDashboard = async (params: DashboardParams) => {
    const response = await apiClient.get<Dashboard>("/transaction/dashboard", { params });
    return response.data;
};

export const getMonthlySummary = async (range: DateRange) => {
    const response = await apiClient.get<MonthlySummary[]>("/transaction/summary/monthly", { params: range });
    return response.data;
};

export const getCategorySummary = async (range: DateRange) => {
    const response = await apiClient.get<CategorySummary[]>("/transaction/summary/categories", { params: range });
    return response.data;
};

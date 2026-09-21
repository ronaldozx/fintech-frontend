import apiClient from "./apiClient";
import type { Insights } from "../types/Insights";

export const getInsights = async (month: string) => {
    const response = await apiClient.get<Insights>("/insights", { params: { month } });
    return response.data;
};

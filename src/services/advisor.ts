import apiClient from "./apiClient";
import type { AdviceOverview } from "../types/Advisor";

export const getAdvice = async () => {
    const response = await apiClient.get<AdviceOverview>("/advisor");
    return response.data;
};

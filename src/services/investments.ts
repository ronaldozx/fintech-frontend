import apiClient from "./apiClient";
import type { InvestmentsOverview } from "../types/Investments";

export const getInvestments = async () => {
    const response = await apiClient.get<InvestmentsOverview>("/investments");
    return response.data;
};

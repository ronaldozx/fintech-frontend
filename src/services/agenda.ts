import apiClient from "./apiClient";
import type { Agenda } from "../types/Agenda";

export const getAgenda = async (days: number) => {
    const response = await apiClient.get<Agenda>("/agenda", { params: { days } });
    return response.data;
};

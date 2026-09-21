import apiClient from "./apiClient";
import type { GoalInput, GoalsOverview } from "../types/Goals";

export const getGoals = async () => {
    const response = await apiClient.get<GoalsOverview>("/goals");
    return response.data;
};

export const createGoal = async (input: GoalInput) => {
    await apiClient.post("/goals", input);
};

export const updateGoal = async (id: number, input: GoalInput) => {
    await apiClient.put(`/goals/${id}`, input);
};

export const deleteGoal = async (id: number) => {
    await apiClient.delete(`/goals/${id}`);
};

export const contributeToGoal = async (id: number, amount: number) => {
    await apiClient.post(`/goals/${id}/contributions`, { amount });
};

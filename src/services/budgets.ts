import apiClient from "./apiClient";
import type { BudgetInput, BudgetsOverview } from "../types/Budgets";

export const getBudgets = async (month: string) => {
    const response = await apiClient.get<BudgetsOverview>("/budgets", { params: { month } });
    return response.data;
};

export const getBudgetCategories = async () => {
    const response = await apiClient.get<string[]>("/budgets/categories");
    return response.data;
};

export const createBudget = async (input: BudgetInput) => {
    await apiClient.post("/budgets", input);
};

export const updateBudget = async (id: number, monthlyLimit: number) => {
    await apiClient.put(`/budgets/${id}`, { monthlyLimit });
};

export const deleteBudget = async (id: number) => {
    await apiClient.delete(`/budgets/${id}`);
};

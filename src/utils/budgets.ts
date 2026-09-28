import type { BudgetProgress } from "../types/Budgets";
import { formatMoney } from "./format";

export const OVERALL_LABEL = "Orçamento total";

export const budgetTitle = (budget: BudgetProgress) => budget.category ?? OVERALL_LABEL;

export const remainingText = (budget: BudgetProgress) =>
    budget.remaining >= 0
        ? `Restam ${formatMoney(budget.remaining)}`
        : `Estourou em ${formatMoney(-budget.remaining)}`;

export const countByStatus = (budgets: BudgetProgress[]) => ({
    exceeded: budgets.filter((budget) => budget.status === "EXCEEDED").length,
    warning: budgets.filter((budget) => budget.status === "WARNING").length,
});

export const availableCategories = (categories: string[], budgets: BudgetProgress[]) => {
    const taken = new Set(budgets.map((budget) => budget.category?.toLowerCase()));
    return categories.filter((category) => !taken.has(category.toLowerCase()));
};

export const parseLimit = (text: string) => {
    const value = Number(text.replace(",", "."));
    return Number.isFinite(value) && value > 0 ? value : null;
};

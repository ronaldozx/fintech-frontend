export type BudgetStatus = "OK" | "WARNING" | "EXCEEDED";

export type BudgetProgress = {
    id: number;
    category: string | null;
    monthlyLimit: number;
    spent: number;
    remaining: number;
    percent: number;
    status: BudgetStatus;
};

export type CategorySpend = {
    category: string;
    spent: number;
};

export type BudgetsOverview = {
    month: string;
    budgets: BudgetProgress[];
    unbudgeted: CategorySpend[];
    totalSpent: number;
};

export type BudgetInput = {
    category: string | null;
    monthlyLimit: number;
};

export type BudgetFormTarget =
    | { mode: "create"; category: string | null }
    | { mode: "edit"; budget: BudgetProgress };

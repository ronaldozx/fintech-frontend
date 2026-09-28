export type AdviceType =
    | "OVERSPENDING"
    | "CATEGORY_SPIKE"
    | "SAVINGS_RATE"
    | "RECURRING_REVIEW"
    | "UNUSUAL_EXPENSE"
    | "GOAL_PACE"
    | "EMERGENCY_FUND"
    | "CONCENTRATION"
    | "OVERDRAFT_COST";

export type AdviceSeverity = "CRITICAL" | "WARNING" | "INFO";

export type AdviceItem = {
    type: AdviceType;
    severity: AdviceSeverity;
    category: string | null;
    title: string;
    message: string;
    link: string | null;
};

export type AdviceOverview = {
    items: AdviceItem[];
    disclaimer: string;
};

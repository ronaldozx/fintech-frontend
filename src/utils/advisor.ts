import type { AdviceSeverity, AdviceType } from "../types/Advisor";

export const SEVERITY_TEXT: Record<AdviceSeverity, string> = {
    CRITICAL: "Urgente",
    WARNING: "Atenção",
    INFO: "Vale olhar",
};

export const TYPE_GROUP: Record<AdviceType, "spending" | "saving" | "investing"> = {
    OVERSPENDING: "spending",
    CATEGORY_SPIKE: "spending",
    UNUSUAL_EXPENSE: "spending",
    SAVINGS_RATE: "saving",
    RECURRING_REVIEW: "saving",
    GOAL_PACE: "saving",
    EMERGENCY_FUND: "investing",
    CONCENTRATION: "investing",
    OVERDRAFT_COST: "investing",
};

export const GROUP_TITLE: Record<"spending" | "saving" | "investing", string> = {
    spending: "Onde você está gastando mais do que deveria",
    saving: "Oportunidades de economizar",
    investing: "Sobre suas contas e investimentos",
};

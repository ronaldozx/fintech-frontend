export type GoalStatus = "ACHIEVED" | "ON_TRACK" | "BEHIND" | "OVERDUE" | "OPEN";

export type Goal = {
    id: number;
    name: string;
    targetAmount: number;
    savedAmount: number;
    remaining: number;
    percent: number;
    targetDate: string | null;
    status: GoalStatus;
    monthsLeft: number | null;
    monthlyNeeded: number | null;
    monthsAtCurrentPace: number | null;
};

export type GoalsOverview = {
    goals: Goal[];
    totalTarget: number;
    totalSaved: number;
    averageMonthlySavings: number;
};

export type GoalInput = {
    name: string;
    targetAmount: number;
    targetDate: string | null;
};

export type GoalFormTarget =
    | { mode: "create" }
    | { mode: "edit"; goal: Goal }
    | { mode: "contribute"; goal: Goal };

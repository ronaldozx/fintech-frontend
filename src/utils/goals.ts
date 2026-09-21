import type { Goal, GoalStatus } from "../types/Goals";
import { formatDate, formatMoney } from "./format";

export const STATUS_TEXT: Record<GoalStatus, string> = {
    ACHIEVED: "Meta atingida",
    ON_TRACK: "No ritmo",
    BEHIND: "Atrasada",
    OVERDUE: "Prazo vencido",
    OPEN: "Sem prazo",
};

export const monthsText = (months: number) => (months === 1 ? "1 mês" : `${months} meses`);

export const deadlineText = (goal: Goal) => {
    if (goal.targetDate === null) return "Sem data definida";
    if (goal.status === "ACHIEVED") return `Prazo era ${formatDate(goal.targetDate)}`;
    if (goal.status === "OVERDUE") return `Venceu em ${formatDate(goal.targetDate)}`;

    const left = goal.monthsLeft === null ? "" : ` · faltam ${monthsText(goal.monthsLeft)}`;
    const need = goal.monthlyNeeded === null ? "" : ` · guarde ${formatMoney(goal.monthlyNeeded)}/mês`;
    return `Até ${formatDate(goal.targetDate)}${left}${need}`;
};

export const paceText = (goal: Goal, averageMonthlySavings: number) => {
    if (goal.status === "ACHIEVED" || goal.monthsAtCurrentPace === null) return null;
    return `No seu ritmo de poupança (${formatMoney(averageMonthlySavings)}/mês) leva cerca de ${monthsText(goal.monthsAtCurrentPace)}`;
};

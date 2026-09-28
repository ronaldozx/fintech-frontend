import type { CashFlow, Insights, Projection } from "../types/Insights";
import { formatMoney } from "./format";

export const savingsHint = (cashFlow: CashFlow) => {
    if (cashFlow.savingsRate === null) return "Sem receitas neste mês para calcular";
    if (cashFlow.previousSavingsRate === null) return "Sem mês anterior para comparar";

    const delta = cashFlow.savingsRate - cashFlow.previousSavingsRate;
    if (delta === 0) return `Igual ao mês anterior (${cashFlow.previousSavingsRate}%)`;

    const direction = delta > 0 ? "acima" : "abaixo";
    return `${Math.abs(delta)} p.p. ${direction} do mês anterior (${cashFlow.previousSavingsRate}%)`;
};

export const savingsValue = (cashFlow: CashFlow) => (cashFlow.savingsRate === null ? "—" : `${cashFlow.savingsRate}%`);

export const projectionSummary = (projection: Projection) => {
    const difference = projection.projected - projection.previousMonth;
    if (projection.previousMonth <= 0) return "Sem gastos no mês anterior para comparar";
    if (difference === 0) return "Igual ao gasto total do mês anterior";

    const direction = difference > 0 ? "acima" : "abaixo";
    return `${formatMoney(Math.abs(difference))} ${direction} do gasto total do mês anterior (${formatMoney(projection.previousMonth)})`;
};

export const hasAnyInsight = (insights: Insights) =>
    insights.cashFlow.income > 0 ||
    insights.cashFlow.expense > 0 ||
    insights.recurring.charges.length > 0 ||
    insights.topMerchants.length > 0;

import type { EmergencyFund, Investment } from "../types/Investments";
import { formatDate, formatMoney } from "./format";

export const DISCLAIMER = "Dados da sua carteira e conteúdo educacional. Não é recomendação de investimento.";

export const rateText = (investment: Investment) => {
    if (investment.rate === null || investment.rateType === null) return null;
    return investment.rateType === "CDI" ? `${investment.rate}% do CDI` : `${investment.rate}% ${investment.rateType}`;
};

export const dueText = (investment: Investment) => {
    if (investment.dueDate === null || investment.daysToDue === null) return null;
    if (investment.daysToDue < 0) return `Venceu em ${formatDate(investment.dueDate)}`;
    if (investment.daysToDue === 0) return "Vence hoje";
    return `Vence em ${formatDate(investment.dueDate)}`;
};

export const profitText = (investment: Investment) => {
    if (investment.profit === null || investment.profitPercent === null) return null;
    const sign = investment.profit >= 0 ? "+" : "−";
    return `${sign}${formatMoney(Math.abs(investment.profit))} (${sign}${Math.abs(investment.profitPercent).toFixed(1).replace(".", ",")}%)`;
};

export const reserveSummary = (fund: EmergencyFund) => {
    if (fund.averageMonthlyExpenses <= 0) return "Ainda não há 3 meses de despesas fechadas para calcular a referência.";
    return `Suas despesas médias nos últimos meses fechados são ${formatMoney(fund.averageMonthlyExpenses)}. ${fund.referenceMonths} meses disso são ${formatMoney(fund.referenceAmount)}.`;
};

export const coverageText = (fund: EmergencyFund) => {
    if (fund.coveredMonths === null) return null;
    const scope = fund.includesAccounts ? "investimentos e saldo em conta" : "investimentos";
    return `Você tem ${formatMoney(fund.availableAmount)} em ${scope}, o que cobre cerca de ${String(fund.coveredMonths).replace(".", ",")} meses de despesas, sem considerar prazos de resgate.`;
};

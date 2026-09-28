import type { AccountItem, InstitutionGroup, UsageTone } from "../types/Accounts";
import { formatDate, formatMoney } from "./format";

const WARNING_PERCENT = 80;
const CRITICAL_PERCENT = 100;
const DUE_SOON_DAYS = 5;
const MILLIS_PER_DAY = 24 * 60 * 60 * 1000;

export const usagePercent = (used: number, total: number) => (total > 0 ? Math.round((used / total) * 100) : 0);

export const usageTone = (percent: number): UsageTone => {
    if (percent >= CRITICAL_PERCENT) return "critical";
    if (percent >= WARNING_PERCENT) return "warning";
    return "normal";
};

export const creditUsed = (account: AccountItem) => {
    if (account.creditLimit === null) return 0;
    return Math.max(0, account.creditLimit - (account.availableCredit ?? account.creditLimit));
};

export const groupByInstitution = (accounts: AccountItem[]): InstitutionGroup[] => {
    const groups = new Map<string, AccountItem[]>();

    accounts.forEach((account) => {
        const key = `${account.connectionId}|${account.institution}`;
        groups.set(key, [...(groups.get(key) ?? []), account]);
    });

    return [...groups.values()].map((items) => ({ institution: items[0].institution, accounts: items }));
};

export const daysUntil = (isoDate: string, today: Date) => {
    const [year, month, day] = isoDate.split("-").map(Number);
    const due = new Date(year, month - 1, day).getTime();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return Math.round((due - start) / MILLIS_PER_DAY);
};

export const buildAccountAlerts = (accounts: AccountItem[], today: Date = new Date()): string[] => {
    const alerts: string[] = [];

    accounts.forEach((account) => {
        const label = `${account.institution} · ${account.name}`;

        if (account.type === "BANK" && account.overdraftLimit !== null && account.overdraftLimit > 0) {
            const used = account.overdraftUsed ?? 0;
            const percent = usagePercent(used, account.overdraftLimit);
            if (percent >= WARNING_PERCENT) {
                alerts.push(`${label}: você está usando ${percent}% do cheque especial (${formatMoney(used)} de ${formatMoney(account.overdraftLimit)}).`);
            }
        }

        if (account.type === "CREDIT" && account.creditLimit !== null && account.creditLimit > 0) {
            const percent = usagePercent(creditUsed(account), account.creditLimit);
            if ((account.availableCredit ?? 1) <= 0) {
                alerts.push(`${label}: limite esgotado, sem valor disponível para novas compras.`);
            } else if (percent >= WARNING_PERCENT) {
                alerts.push(`${label}: ${percent}% do limite já está usado.`);
            }
        }

        if (account.type === "CREDIT" && account.dueDate && account.balance > 0) {
            const days = daysUntil(account.dueDate, today);
            if (days >= 0 && days <= DUE_SOON_DAYS) {
                const when = days === 0 ? "hoje" : days === 1 ? "amanhã" : `em ${days} dias`;
                alerts.push(`${label}: fatura de ${formatMoney(account.balance)} vence ${when} (${formatDate(account.dueDate)}).`);
            }
        }
    });

    return alerts;
};

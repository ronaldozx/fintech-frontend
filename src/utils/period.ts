import { formatIsoDate } from "./format";
import type { DateRange } from "../types/Transaction";

export type PeriodMonths = 3 | 6 | 12;

export const PERIOD_OPTIONS: { months: PeriodMonths; label: string }[] = [
    { months: 3, label: "Últimos 3 meses" },
    { months: 6, label: "Últimos 6 meses" },
    { months: 12, label: "Últimos 12 meses" },
];

export const DEFAULT_PERIOD: PeriodMonths = 12;

export const getPeriodRange = (months: PeriodMonths, now: Date = new Date()): DateRange => {
    const start = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
    return { startDate: formatIsoDate(start), endDate: formatIsoDate(now) };
};

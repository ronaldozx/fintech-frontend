import { formatIsoDate } from "./format";
import type { DateRange } from "../types/Transaction";

export type PeriodId = "this-month" | "last-month" | "3m" | "6m" | "12m";

export const PERIOD_OPTIONS: { id: PeriodId; label: string }[] = [
    { id: "this-month", label: "Este mês" },
    { id: "last-month", label: "Mês passado" },
    { id: "3m", label: "Últimos 3 meses" },
    { id: "6m", label: "Últimos 6 meses" },
    { id: "12m", label: "Últimos 12 meses" },
];

export const DEFAULT_PERIOD: PeriodId = "12m";

const ROLLING_MONTHS: Partial<Record<PeriodId, number>> = { "3m": 3, "6m": 6, "12m": 12 };

export const getPeriodRange = (id: PeriodId, now: Date = new Date()): DateRange => {
    const year = now.getFullYear();
    const month = now.getMonth();

    if (id === "this-month") {
        return { startDate: formatIsoDate(new Date(year, month, 1)), endDate: formatIsoDate(now) };
    }

    if (id === "last-month") {
        return { startDate: formatIsoDate(new Date(year, month - 1, 1)), endDate: formatIsoDate(new Date(year, month, 0)) };
    }

    const months = ROLLING_MONTHS[id] ?? 12;
    return { startDate: formatIsoDate(new Date(year, month - (months - 1), 1)), endDate: formatIsoDate(now) };
};

export const isSingleMonth = (range: DateRange) => range.startDate.slice(0, 7) === range.endDate.slice(0, 7);

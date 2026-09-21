import { useEffect, useState } from "react";
import { getCategorySummary, getDailySummary, getMonthlySummary } from "../services/transaction";
import type { DateRange, SummaryData } from "../types/Transaction";
import { isSingleMonth } from "../utils/period";

type SummaryResult = {
    key: string;
    data: SummaryData | null;
    error: string | null;
};

export function useSummary({ startDate, endDate }: DateRange, reloadKey: number) {
    const [result, setResult] = useState<SummaryResult | null>(null);
    const key = `${startDate}|${endDate}|${reloadKey}`;

    useEffect(() => {
        let active = true;
        const range = { startDate, endDate };

        Promise.all([
            getMonthlySummary(range),
            isSingleMonth(range) ? getDailySummary(range) : Promise.resolve([]),
            getCategorySummary(range),
        ])
            .then(([monthly, daily, categories]) => {
                if (active) setResult({ key, data: { monthly, daily, categories }, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar o resumo",
                }));
            });

        return () => {
            active = false;
        };
    }, [key, startDate, endDate]);

    return {
        data: result?.data ?? null,
        error: result?.key === key ? result.error : null,
        loading: result?.key !== key,
    };
}

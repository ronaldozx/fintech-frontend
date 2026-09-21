import { useEffect, useState } from "react";
import { getInsights } from "../services/insights";
import type { Insights } from "../types/Insights";

type InsightsResult = {
    month: string;
    data: Insights | null;
    error: string | null;
};

export function useInsights(month: string) {
    const [result, setResult] = useState<InsightsResult | null>(null);

    useEffect(() => {
        let active = true;

        getInsights(month)
            .then((data) => {
                if (active) setResult({ month, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    month,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar os insights",
                }));
            });

        return () => {
            active = false;
        };
    }, [month]);

    return {
        data: result?.data ?? null,
        error: result?.month === month ? result.error : null,
        loading: result?.month !== month,
    };
}

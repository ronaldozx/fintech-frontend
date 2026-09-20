import { useEffect, useState } from "react";
import { getDashboard } from "../services/transaction";
import type { Dashboard, DashboardParams } from "../types/Transaction";

type DashboardResult = {
    key: string;
    data: Dashboard | null;
    error: string | null;
};

export function useDashboard({ startDate, endDate, page, size }: DashboardParams, reloadKey = 0) {
    const [result, setResult] = useState<DashboardResult | null>(null);
    const key = `${startDate}|${endDate}|${page ?? ""}|${size ?? ""}|${reloadKey}`;

    useEffect(() => {
        let active = true;

        getDashboard({ startDate, endDate, page, size })
            .then((data) => {
                if (active) setResult({ key, data, error: null });
            })
            .catch((err) => {
                if (active) setResult({ key, data: null, error: err instanceof Error ? err.message : "Erro ao carregar dados" });
            });

        return () => {
            active = false;
        };
    }, [key, startDate, endDate, page, size]);

    const current = result?.key === key ? result : null;

    return {
        data: current?.data ?? null,
        error: current?.error ?? null,
        loading: current === null,
    };
}

import { useEffect, useState } from "react";
import { getBudgetCategories, getBudgets } from "../services/budgets";
import type { BudgetsOverview } from "../types/Budgets";

type BudgetsResult = {
    key: string;
    data: BudgetsOverview | null;
    error: string | null;
};

export function useBudgetCategories(reloadKey: number) {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        let active = true;

        getBudgetCategories()
            .then((data) => {
                if (active) setCategories(data);
            })
            .catch(() => {
                if (active) setCategories([]);
            });

        return () => {
            active = false;
        };
    }, [reloadKey]);

    return categories;
}

export function useBudgets(month: string, reloadKey: number) {
    const [result, setResult] = useState<BudgetsResult | null>(null);
    const key = `${month}|${reloadKey}`;

    useEffect(() => {
        let active = true;

        getBudgets(month)
            .then((data) => {
                if (active) setResult({ key, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar os orçamentos",
                }));
            });

        return () => {
            active = false;
        };
    }, [month, key]);

    return {
        data: result?.data ?? null,
        error: result?.key === key ? result.error : null,
        loading: result?.key !== key,
    };
}

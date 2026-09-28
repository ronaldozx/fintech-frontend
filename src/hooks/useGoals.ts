import { useEffect, useState } from "react";
import { getGoals } from "../services/goals";
import type { GoalsOverview } from "../types/Goals";

type GoalsResult = {
    key: number;
    data: GoalsOverview | null;
    error: string | null;
};

export function useGoals(reloadKey: number) {
    const [result, setResult] = useState<GoalsResult | null>(null);

    useEffect(() => {
        let active = true;

        getGoals()
            .then((data) => {
                if (active) setResult({ key: reloadKey, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key: reloadKey,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar as metas",
                }));
            });

        return () => {
            active = false;
        };
    }, [reloadKey]);

    return {
        data: result?.data ?? null,
        error: result?.key === reloadKey ? result.error : null,
        loading: result?.key !== reloadKey,
    };
}

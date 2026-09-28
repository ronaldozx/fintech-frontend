import { useEffect, useState } from "react";
import { getAdvice } from "../services/advisor";
import type { AdviceOverview } from "../types/Advisor";

type AdviceResult = {
    key: number;
    data: AdviceOverview | null;
    error: string | null;
};

export function useAdvice(reloadKey: number) {
    const [result, setResult] = useState<AdviceResult | null>(null);

    useEffect(() => {
        let active = true;

        getAdvice()
            .then((data) => {
                if (active) setResult({ key: reloadKey, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key: reloadKey,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar o assistente",
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

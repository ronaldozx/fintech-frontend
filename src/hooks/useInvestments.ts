import { useEffect, useState } from "react";
import { getInvestments } from "../services/investments";
import type { InvestmentsOverview } from "../types/Investments";

type InvestmentsResult = {
    key: number;
    data: InvestmentsOverview | null;
    error: string | null;
};

export function useInvestments(reloadKey: number) {
    const [result, setResult] = useState<InvestmentsResult | null>(null);

    useEffect(() => {
        let active = true;

        getInvestments()
            .then((data) => {
                if (active) setResult({ key: reloadKey, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key: reloadKey,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar os investimentos",
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

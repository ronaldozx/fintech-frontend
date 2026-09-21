import { useEffect, useState } from "react";
import { getAccountsOverview } from "../services/openFinance";
import type { AccountsOverview } from "../types/Accounts";

type OverviewResult = {
    key: number;
    data: AccountsOverview | null;
    error: string | null;
};

export function useAccountsOverview(reloadKey: number) {
    const [result, setResult] = useState<OverviewResult | null>(null);

    useEffect(() => {
        let active = true;

        getAccountsOverview()
            .then((data) => {
                if (active) setResult({ key: reloadKey, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key: reloadKey,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar as contas",
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

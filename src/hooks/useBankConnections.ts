import { useEffect, useState } from "react";
import { getConnections } from "../services/openFinance";
import type { BankConnection } from "../types/OpenFinance";

type ConnectionsResult = {
    key: number;
    data: BankConnection[];
    error: string | null;
};

export function useBankConnections(enabled: boolean, reloadKey: number) {
    const [result, setResult] = useState<ConnectionsResult | null>(null);

    useEffect(() => {
        if (!enabled) return;

        let active = true;

        getConnections()
            .then((data) => {
                if (active) setResult({ key: reloadKey, data, error: null });
            })
            .catch((err) => {
                if (active) setResult({ key: reloadKey, data: [], error: err instanceof Error ? err.message : "Erro ao carregar bancos" });
            });

        return () => {
            active = false;
        };
    }, [enabled, reloadKey]);

    const current = enabled && result?.key === reloadKey ? result : null;

    return {
        connections: current?.data ?? [],
        error: current?.error ?? null,
        loading: enabled && current === null,
    };
}

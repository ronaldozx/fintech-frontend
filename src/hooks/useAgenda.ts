import { useEffect, useState } from "react";
import { getAgenda } from "../services/agenda";
import type { Agenda } from "../types/Agenda";

type AgendaResult = {
    days: number;
    data: Agenda | null;
    error: string | null;
};

export function useAgenda(days: number) {
    const [result, setResult] = useState<AgendaResult | null>(null);

    useEffect(() => {
        let active = true;

        getAgenda(days)
            .then((data) => {
                if (active) setResult({ days, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    days,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao carregar a agenda",
                }));
            });

        return () => {
            active = false;
        };
    }, [days]);

    return {
        data: result?.data ?? null,
        error: result?.days === days ? result.error : null,
        loading: result?.days !== days,
    };
}

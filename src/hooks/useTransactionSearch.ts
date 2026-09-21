import { useEffect, useState } from "react";
import { getTransactionCategories, searchTransactions } from "../services/transaction";
import type { TransactionQuery, TransactionSearch } from "../types/Transaction";

type SearchResult = {
    key: string;
    data: TransactionSearch | null;
    error: string | null;
};

export function useTransactionSearch(query: TransactionQuery) {
    const [result, setResult] = useState<SearchResult | null>(null);
    const key = JSON.stringify(query);

    useEffect(() => {
        let active = true;

        searchTransactions(JSON.parse(key) as TransactionQuery)
            .then((data) => {
                if (active) setResult({ key, data, error: null });
            })
            .catch((err) => {
                if (active) setResult((previous) => ({
                    key,
                    data: previous?.data ?? null,
                    error: err instanceof Error ? err.message : "Erro ao buscar transações",
                }));
            });

        return () => {
            active = false;
        };
    }, [key]);

    return {
        data: result?.data ?? null,
        error: result?.key === key ? result.error : null,
        loading: result?.key !== key,
    };
}

export function useTransactionCategories() {
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        let active = true;

        getTransactionCategories()
            .then((data) => {
                if (active) setCategories(data);
            })
            .catch(() => {
                if (active) setCategories([]);
            });

        return () => {
            active = false;
        };
    }, []);

    return categories;
}

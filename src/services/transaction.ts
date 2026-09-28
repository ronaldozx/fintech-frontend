import apiClient from "./apiClient";
import type {
    CategorySummary,
    DailySummary,
    Dashboard,
    DashboardParams,
    DateRange,
    MonthlySummary,
    TransactionInput,
    TransactionPatch,
    TransactionQuery,
    TransactionRow,
    TransactionScope,
    TransactionSearch,
} from "../types/Transaction";

type SearchParams = DateRange & {
    q?: string;
    category?: string;
    type?: string;
    paymentMethod?: string;
    neutral?: boolean;
    page?: number;
    size?: number;
    sort: string;
};

const NEUTRAL_BY_SCOPE: Record<TransactionScope, boolean | undefined> = {
    all: undefined,
    counted: false,
    neutral: true,
};

const toSearchParams = (query: TransactionQuery, includePaging: boolean): SearchParams => {
    const { range, filters } = query;
    return {
        startDate: range.startDate,
        endDate: range.endDate,
        q: filters.q.trim() || undefined,
        category: filters.category || undefined,
        type: filters.type || undefined,
        paymentMethod: filters.paymentMethod || undefined,
        neutral: NEUTRAL_BY_SCOPE[filters.scope],
        page: includePaging ? query.page : undefined,
        size: includePaging ? query.size : undefined,
        sort: `${query.sortKey},${query.sortDir}`,
    };
};

export const searchTransactions = async (query: TransactionQuery) => {
    const response = await apiClient.get<TransactionSearch>("/transaction/search", { params: toSearchParams(query, true) });
    return response.data;
};

export const getTransactionCategories = async () => {
    const response = await apiClient.get<string[]>("/transaction/categories");
    return response.data;
};

export const downloadTransactionsCsv = async (query: TransactionQuery) => {
    const response = await apiClient.get<Blob>("/transaction/export", {
        params: toSearchParams(query, false),
        responseType: "blob",
    });

    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "transacoes.csv";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

export const getDashboard = async (params: DashboardParams) => {
    const response = await apiClient.get<Dashboard>("/transaction/dashboard", { params });
    return response.data;
};

export const getMonthlySummary = async (range: DateRange) => {
    const response = await apiClient.get<MonthlySummary[]>("/transaction/summary/monthly", { params: range });
    return response.data;
};

export const getDailySummary = async (range: DateRange) => {
    const response = await apiClient.get<DailySummary[]>("/transaction/summary/daily", { params: range });
    return response.data;
};

export const getCategorySummary = async (range: DateRange) => {
    const response = await apiClient.get<CategorySummary[]>("/transaction/summary/categories", { params: range });
    return response.data;
};

export const createTransaction = async (input: TransactionInput) => {
    const response = await apiClient.post<TransactionRow>("/transaction", input);
    return response.data;
};

export const updateTransaction = async (id: number, patch: TransactionPatch) => {
    const response = await apiClient.patch<TransactionRow>(`/transaction/${id}`, patch);
    return response.data;
};

export const deleteTransaction = async (id: number) => {
    await apiClient.delete(`/transaction/${id}`);
};

export const reconcileTransfers = async () => {
    const response = await apiClient.post<{ pairs: number }>("/transaction/reconcile-transfers");
    return response.data.pairs;
};

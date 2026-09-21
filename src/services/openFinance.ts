import apiClient from "./apiClient";
import type { BankConnection, ConnectToken, SyncResult } from "../types/OpenFinance";
import type { AccountsOverview } from "../types/Accounts";

export const createConnectToken = async () => {
    const response = await apiClient.post<ConnectToken>("/open-finance/connect-token");
    return response.data.accessToken;
};

export const registerConnection = async (itemId: string) => {
    const response = await apiClient.post<BankConnection>("/open-finance/connections", { itemId });
    return response.data;
};

export const getConnections = async () => {
    const response = await apiClient.get<BankConnection[]>("/open-finance/connections");
    return response.data;
};

export const getAccountsOverview = async () => {
    const response = await apiClient.get<AccountsOverview>("/open-finance/accounts");
    return response.data;
};

export const deleteConnection = async (id: number) => {
    await apiClient.delete(`/open-finance/connections/${id}`);
};

export const syncTransactions = async () => {
    const response = await apiClient.post<SyncResult>("/open-finance/sync");
    return response.data;
};

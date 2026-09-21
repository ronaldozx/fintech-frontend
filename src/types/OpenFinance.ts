export type BankConnection = {
    id: number;
    itemId: string;
    institutionName: string | null;
    status: string | null;
    createdAt: string;
    lastSyncedAt: string | null;
    lastSyncAttemptAt: string | null;
    lastSyncError: string | null;
};

export type ConnectToken = {
    accessToken: string;
};

export type SyncResult = {
    connections: number;
    imported: number;
    transferPairs: number;
    failed: number;
};

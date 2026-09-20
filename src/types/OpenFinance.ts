export type BankConnection = {
    id: number;
    itemId: string;
    institutionName: string | null;
    status: string | null;
    createdAt: string;
};

export type ConnectToken = {
    accessToken: string;
};

export type SyncResult = {
    connections: number;
    imported: number;
};

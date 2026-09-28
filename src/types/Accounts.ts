export type AccountType = "BANK" | "CREDIT";

export type AccountItem = {
    connectionId: number;
    institution: string;
    name: string;
    type: AccountType;
    maskedNumber: string | null;
    balance: number;
    currency: string;
    creditLimit: number | null;
    availableCredit: number | null;
    dueDate: string | null;
    overdraftLimit: number | null;
    overdraftUsed: number | null;
};

export type AccountsOverview = {
    accounts: AccountItem[];
    bankBalance: number;
    cardBalanceDue: number;
    netPosition: number;
    cardSpendingThisMonth: number;
    unavailableConnections: string[];
};

export type InstitutionGroup = {
    institution: string;
    accounts: AccountItem[];
};

export type UsageTone = "normal" | "warning" | "critical";

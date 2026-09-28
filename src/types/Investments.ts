export type Investment = {
    id: string;
    name: string;
    type: string | null;
    typeLabel: string;
    institution: string;
    issuer: string | null;
    balance: number;
    invested: number | null;
    profit: number | null;
    profitPercent: number | null;
    dueDate: string | null;
    daysToDue: number | null;
    rate: number | null;
    rateType: string | null;
};

export type Allocation = {
    label: string;
    total: number;
    percent: number;
};

export type EmergencyFund = {
    averageMonthlyExpenses: number;
    referenceMonths: number;
    referenceAmount: number;
    availableAmount: number;
    includesAccounts: boolean;
    coveredMonths: number | null;
};

export type InvestmentsOverview = {
    investments: Investment[];
    totalBalance: number;
    totalInvested: number | null;
    totalProfit: number | null;
    allocation: Allocation[];
    upcomingMaturities: Investment[];
    concentration: { name: string; percent: number } | null;
    emergencyFund: EmergencyFund;
    unavailableConnections: string[];
};

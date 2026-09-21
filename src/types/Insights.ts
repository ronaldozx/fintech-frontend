export type CashFlow = {
    income: number;
    expense: number;
    saved: number;
    savingsRate: number | null;
    previousSavingsRate: number | null;
};

export type CategoryChange = {
    category: string;
    current: number;
    previous: number;
    change: number;
};

export type RecurringCharge = {
    description: string;
    averageAmount: number;
    months: number;
    lastDate: string;
};

export type UnusualExpense = {
    description: string;
    category: string;
    date: string;
    amount: number;
    typicalAmount: number;
};

export type MerchantTotal = {
    description: string;
    total: number;
    count: number;
};

export type Projection = {
    spentSoFar: number;
    projected: number;
    previousMonth: number;
    daysElapsed: number;
    daysInMonth: number;
};

export type Insights = {
    month: string;
    cashFlow: CashFlow;
    movers: {
        increases: CategoryChange[];
        decreases: CategoryChange[];
    };
    recurring: {
        charges: RecurringCharge[];
        monthlyTotal: number;
    };
    unusual: UnusualExpense[];
    topMerchants: MerchantTotal[];
    projection: Projection | null;
};

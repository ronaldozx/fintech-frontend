export type TransactionType = "INCOME" | "EXPENSE";

export type PaymentMethod = "CREDIT" | "DEBIT";

export type Transaction = {
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
    paymentMethod: PaymentMethod;
    category: string | null;
};

export type Page<T> = {
    content: T[];
    totalElements: number;
    totalPages: number;
    number: number;
    size: number;
};

export type Dashboard = {
    totalIncome: number;
    totalExpense: number;
    netBalance: number;
    transactions: Page<Transaction>;
};

export type DateRange = {
    startDate: string;
    endDate: string;
};

export type DashboardParams = DateRange & {
    page?: number;
    size?: number;
};

export type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
};

export type CategorySummary = {
    category: string;
    total: number;
    count: number;
};

export type SummaryData = {
    monthly: MonthlySummary[];
    categories: CategorySummary[];
};

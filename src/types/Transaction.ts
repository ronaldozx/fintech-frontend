export type TransactionType = "INCOME" | "EXPENSE";

export type PaymentMethod = "CREDIT" | "DEBIT";

export type Transaction = {
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
    paymentMethod: PaymentMethod;
    category: string | null;
    neutral: boolean | null;
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

export type TransactionRow = {
    id: number;
    description: string;
    amount: number;
    date: string;
    type: TransactionType;
    paymentMethod: PaymentMethod;
    category: string | null;
    neutral: boolean;
};

export type TransactionSearch = {
    transactions: Page<TransactionRow>;
    totalIncome: number;
    totalExpense: number;
};

export type TransactionScope = "all" | "counted" | "neutral";

export type TransactionFilters = {
    q: string;
    category: string;
    type: "" | TransactionType;
    paymentMethod: "" | PaymentMethod;
    scope: TransactionScope;
};

export type TransactionSortDirection = "asc" | "desc";

export type TransactionQuery = {
    range: DateRange;
    filters: TransactionFilters;
    page: number;
    size: number;
    sortKey: string;
    sortDir: TransactionSortDirection;
};

export type MonthlySummary = {
    month: string;
    income: number;
    expense: number;
};

export type DailySummary = {
    date: string;
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
    daily: DailySummary[];
    categories: CategorySummary[];
};

export type AgendaItemType = "CARD_BILL" | "RECURRING" | "GOAL_DEADLINE";

export type AgendaItem = {
    type: AgendaItemType;
    title: string;
    subtitle: string;
    date: string;
    daysUntil: number;
    amount: number;
};

export type Agenda = {
    days: number;
    items: AgendaItem[];
    billsTotal: number;
    recurringTotal: number;
    accountsUnavailable: boolean;
};

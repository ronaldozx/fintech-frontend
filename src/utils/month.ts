const toMonthText = (year: number, monthIndex: number) => {
    const date = new Date(year, monthIndex, 1);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
};

export const currentMonth = (now: Date = new Date()) => toMonthText(now.getFullYear(), now.getMonth());

export const shiftMonth = (month: string, delta: number) => {
    const [year, monthNumber] = month.split("-").map(Number);
    return toMonthText(year, monthNumber - 1 + delta);
};

export const formatMonthLabel = (month: string) => {
    const [year, monthNumber] = month.split("-").map(Number);
    const label = new Date(year, monthNumber - 1, 1).toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
    return label.charAt(0).toUpperCase() + label.slice(1);
};

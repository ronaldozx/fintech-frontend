

export const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

export const formatMoney = (amount: number) => {
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}


export const formatDate = (date: string) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
};

export const formatMoney = (amount: number) => {
    return amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export const formatIsoDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
}
export const parseAmount = (text: string) => {
    const value = Number(text.trim().replace(",", "."));
    return Number.isFinite(value) && value > 0 ? value : null;
};

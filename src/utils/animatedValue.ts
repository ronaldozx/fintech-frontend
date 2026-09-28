const CURRENCY = /^(-?)R\$\s?([\d.]+),(\d{2})$/;
const PERCENT = /^(-?\d+)%$/;
const INTEGER = /^\d+$/;

export type Animatable = {
    target: number;
    format: (value: number) => string;
};

const brl = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const parseAnimatable = (text: string): Animatable | null => {
    const currency = CURRENCY.exec(text);
    if (currency) {
        const amount = Number(`${currency[2].replace(/\./g, "")}.${currency[3]}`);
        return { target: currency[1] === "-" ? -amount : amount, format: brl };
    }

    if (PERCENT.test(text)) {
        return { target: Number(text.slice(0, -1)), format: (value) => `${Math.round(value)}%` };
    }

    if (INTEGER.test(text)) {
        return { target: Number(text), format: (value) => String(Math.round(value)) };
    }

    return null;
};

export const easeOutCubic = (progress: number) => 1 - (1 - progress) ** 3;

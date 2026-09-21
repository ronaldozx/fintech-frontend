import type { CategorySummary, DailySummary, DateRange, MonthlySummary } from "../types/Transaction";
import { formatDate } from "./format";

export type ChartPoint = {
    key: string;
    label: string;
    title: string;
    income: number;
    expense: number;
};

export type CategoryRow = CategorySummary & {
    share: number;
};

const MONTH_LABELS = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
const MAX_VISIBLE_CATEGORIES = 7;
const OTHER_CATEGORIES_LABEL = "Demais categorias";

const compactFormatter = new Intl.NumberFormat("pt-BR", { notation: "compact", maximumFractionDigits: 1 });
const wholeMoneyFormatter = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

export const formatCompact = (value: number) => compactFormatter.format(value);

export const formatWholeMoney = (value: number) => wholeMoneyFormatter.format(value);

export const formatMonthYear = (month: string) => {
    const [year, monthNumber] = month.split("-").map(Number);
    return `${MONTH_LABELS[monthNumber - 1]}/${year}`;
};

export const buildMonthSeries = (range: DateRange, summary: MonthlySummary[]): ChartPoint[] => {
    const byMonth = new Map(summary.map((item) => [item.month, item]));
    const [startYear, startMonth] = range.startDate.split("-").map(Number);
    const [endYear, endMonth] = range.endDate.split("-").map(Number);
    const points: ChartPoint[] = [];

    let year = startYear;
    let month = startMonth;

    while (year < endYear || (year === endYear && month <= endMonth)) {
        const key = `${year}-${String(month).padStart(2, "0")}`;
        const found = byMonth.get(key);
        points.push({
            key,
            label: MONTH_LABELS[month - 1],
            title: formatMonthYear(key),
            income: found?.income ?? 0,
            expense: found?.expense ?? 0,
        });
        month += 1;
        if (month > 12) {
            month = 1;
            year += 1;
        }
    }

    return points;
};

export const buildDaySeries = (range: DateRange, summary: DailySummary[]): ChartPoint[] => {
    const byDate = new Map(summary.map((item) => [item.date, item]));
    const [year, month, firstDay] = range.startDate.split("-").map(Number);
    const lastDay = Number(range.endDate.split("-")[2]);
    const points: ChartPoint[] = [];

    for (let day = firstDay; day <= lastDay; day += 1) {
        const key = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        const found = byDate.get(key);
        points.push({
            key,
            label: String(day),
            title: formatDate(key),
            income: found?.income ?? 0,
            expense: found?.expense ?? 0,
        });
    }

    return points;
};

export const buildCategoryRows = (categories: CategorySummary[], maxVisible: number = MAX_VISIBLE_CATEGORIES): CategoryRow[] => {
    const grandTotal = categories.reduce((sum, item) => sum + item.total, 0);
    const sorted = [...categories].sort((a, b) => b.total - a.total);

    const visible = sorted.length > maxVisible + 1 ? sorted.slice(0, maxVisible) : sorted;
    const rest = sorted.slice(visible.length);

    const rows = visible.map((item) => ({ ...item, share: grandTotal === 0 ? 0 : item.total / grandTotal }));

    if (rest.length > 0) {
        const total = rest.reduce((sum, item) => sum + item.total, 0);
        const count = rest.reduce((sum, item) => sum + item.count, 0);
        rows.push({ category: OTHER_CATEGORIES_LABEL, total, count, share: grandTotal === 0 ? 0 : total / grandTotal });
    }

    return rows;
};

export const niceScale = (maxValue: number, tickCount = 4) => {
    if (maxValue <= 0) return { max: 1, ticks: [0, 1] };

    const rough = maxValue / tickCount;
    const magnitude = 10 ** Math.floor(Math.log10(rough));
    const residual = rough / magnitude;
    const factor = residual <= 1 ? 1 : residual <= 2 ? 2 : residual <= 5 ? 5 : 10;
    const step = factor * magnitude;
    const max = Math.ceil(maxValue / step) * step;

    const ticks: number[] = [];
    for (let value = 0; value <= max + step / 2; value += step) {
        ticks.push(value);
    }

    return { max, ticks };
};

export const columnPath = (x: number, y: number, width: number, height: number, radius: number) => {
    const r = Math.min(radius, width / 2, height);
    return `M${x},${y + height} V${y + r} Q${x},${y} ${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} Z`;
};

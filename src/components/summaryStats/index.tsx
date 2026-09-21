import { StatTile } from "../statTile";
import { chartColors } from "../../styles/chart";
import { formatMoney } from "../../utils/format";
import type { SummaryData } from "../../types/Transaction";
import { Stats } from "./style";

type SummaryStatsProps = {
    summary: SummaryData | null;
    loading: boolean;
};

export function SummaryStats({ summary, loading }: SummaryStatsProps) {
    const income = summary?.monthly.reduce((sum, item) => sum + item.income, 0) ?? 0;
    const expense = summary?.monthly.reduce((sum, item) => sum + item.expense, 0) ?? 0;
    const format = (value: number) => (summary ? formatMoney(value) : "—");

    return (
        <Stats $stale={loading}>
            <StatTile hero label="Saldo do período" value={format(income - expense)} hint="Receitas menos despesas, sem pagamento de fatura e transferências entre suas contas" />
            <StatTile label="Receitas" value={format(income)} accent={chartColors.income} />
            <StatTile label="Despesas" value={format(expense)} accent={chartColors.expense} />
        </Stats>
    );
}

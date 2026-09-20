import { useMemo, useState } from "react";
import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { ViewToggle, type ChartView } from "../../../../components/viewToggle";
import { ChartBody, ChartError, ChartMessage } from "../../../../styles/chart";
import { buildMonthSeries, formatMonthYear } from "../../../../utils/chart";
import { formatMoney } from "../../../../utils/format";
import type { DateRange, MonthlySummary } from "../../../../types/Transaction";
import { ColumnChart } from "../columnChart";
import { Kpi, KpiLabel, Kpis, KpiValue, TableArea } from "./style";

type CashFlowProps = {
  range: DateRange;
  summary: MonthlySummary[] | null;
  loading: boolean;
  error: string | null;
};

type MonthRow = {
  month: string;
  income: number;
  expense: number;
  balance: number;
};

const columns: Column<MonthRow>[] = [
  { key: "month", title: "Mês", render: (row) => formatMonthYear(row.month) },
  { key: "income", title: "Receitas", align: "right", render: (row) => formatMoney(row.income) },
  { key: "expense", title: "Despesas", align: "right", render: (row) => formatMoney(row.expense) },
  { key: "balance", title: "Saldo", align: "right", render: (row) => formatMoney(row.balance) },
];

export function CashFlow({ range, summary, loading, error }: CashFlowProps) {
  const [view, setView] = useState<ChartView>("chart");

  const points = useMemo(() => buildMonthSeries(range, summary ?? []), [range, summary]);
  const rows = useMemo<MonthRow[]>(
    () => points.map((point) => ({ month: point.month, income: point.income, expense: point.expense, balance: point.income - point.expense })),
    [points],
  );

  const totalIncome = points.reduce((sum, point) => sum + point.income, 0);
  const totalExpense = points.reduce((sum, point) => sum + point.expense, 0);
  const isEmpty = summary !== null && totalIncome === 0 && totalExpense === 0;

  return (
    <Frame title="CashFlow" actions={summary && !isEmpty ? <ViewToggle view={view} onChange={setView} /> : undefined}>
      {error && <ChartError>{error}</ChartError>}
      {!summary && !error && <ChartMessage>Carregando...</ChartMessage>}
      {isEmpty && <ChartMessage>Sem movimentações no período. Conecte um banco pelo botão + para importar.</ChartMessage>}

      {summary && !isEmpty && (
        <ChartBody $stale={loading}>
          <Kpis>
            <Kpi>
              <KpiLabel>Receitas</KpiLabel>
              <KpiValue>{formatMoney(totalIncome)}</KpiValue>
            </Kpi>
            <Kpi>
              <KpiLabel>Despesas</KpiLabel>
              <KpiValue>{formatMoney(totalExpense)}</KpiValue>
            </Kpi>
            <Kpi>
              <KpiLabel>Saldo</KpiLabel>
              <KpiValue>{formatMoney(totalIncome - totalExpense)}</KpiValue>
            </Kpi>
          </Kpis>

          {view === "chart" ? (
            <ColumnChart points={points} />
          ) : (
            <TableArea>
              <Table data={rows} columns={columns} pageSize={6} rowKey="month" />
            </TableArea>
          )}
        </ChartBody>
      )}
    </Frame>
  );
}

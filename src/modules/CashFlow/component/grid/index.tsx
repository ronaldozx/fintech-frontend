import { useMemo, useState } from "react";
import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { ViewToggle, type ChartView } from "../../../../components/viewToggle";
import { ChartBody, ChartError, ChartMessage } from "../../../../styles/chart";
import { buildDaySeries, buildMonthSeries } from "../../../../utils/chart";
import { formatMoney } from "../../../../utils/format";
import { isSingleMonth } from "../../../../utils/period";
import type { DateRange, SummaryData } from "../../../../types/Transaction";
import { ColumnChart } from "../columnChart";
import { TableArea } from "./style";

type CashFlowProps = {
  range: DateRange;
  summary: SummaryData | null;
  loading: boolean;
  error: string | null;
};

type PeriodRow = {
  key: string;
  title: string;
  income: number;
  expense: number;
  balance: number;
};

const columns: Column<PeriodRow>[] = [
  { key: "title", title: "Período" },
  { key: "income", title: "Receitas", align: "right", render: (row) => formatMoney(row.income) },
  { key: "expense", title: "Despesas", align: "right", render: (row) => formatMoney(row.expense) },
  { key: "balance", title: "Saldo", align: "right", render: (row) => formatMoney(row.balance) },
];

export function CashFlow({ range, summary, loading, error }: CashFlowProps) {
  const [view, setView] = useState<ChartView>("chart");
  const daily = isSingleMonth(range);

  const points = useMemo(
    () => (daily ? buildDaySeries(range, summary?.daily ?? []) : buildMonthSeries(range, summary?.monthly ?? [])),
    [daily, range, summary],
  );
  const rows = useMemo<PeriodRow[]>(
    () => points.map((point) => ({ key: point.key, title: point.title, income: point.income, expense: point.expense, balance: point.income - point.expense })),
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
          {view === "chart" ? (
            <ColumnChart points={points} ariaLabel={daily ? "Receitas e despesas por dia" : "Receitas e despesas por mês"} />
          ) : (
            <TableArea>
              <Table data={rows} columns={columns} pageSize={6} rowKey="key" />
            </TableArea>
          )}
        </ChartBody>
      )}
    </Frame>
  );
}

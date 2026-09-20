import { useMemo, useState } from "react";
import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { ViewToggle, type ChartView } from "../../../../components/viewToggle";
import { ChartBody, ChartError, ChartMessage } from "../../../../styles/chart";
import { buildCategoryRows, formatWholeMoney, type CategoryRow } from "../../../../utils/chart";
import { formatMoney } from "../../../../utils/format";
import type { CategorySummary } from "../../../../types/Transaction";
import { Bar, BarLine, Meta, Name, Row, RowHead, Rows, TableArea, Track, Value } from "./style";

type CategoryBreakdownProps = {
  summary: CategorySummary[] | null;
  loading: boolean;
  error: string | null;
};

const formatShare = (share: number) => `${Math.round(share * 100)}%`;

const columns: Column<CategoryRow>[] = [
  { key: "category", title: "Categoria" },
  { key: "count", title: "Lançamentos", align: "right" },
  { key: "total", title: "Total", align: "right", render: (row) => formatMoney(row.total) },
  { key: "share", title: "%", align: "right", render: (row) => formatShare(row.share) },
];

export function CategoryBreakdown({ summary, loading, error }: CategoryBreakdownProps) {
  const [view, setView] = useState<ChartView>("chart");

  const rows = useMemo(() => buildCategoryRows(summary ?? []), [summary]);
  const maxTotal = Math.max(0, ...rows.map((row) => row.total));
  const isEmpty = summary !== null && rows.length === 0;

  return (
    <Frame title="Despesas por categoria" actions={summary && !isEmpty ? <ViewToggle view={view} onChange={setView} /> : undefined}>
      {error && <ChartError>{error}</ChartError>}
      {!summary && !error && <ChartMessage>Carregando...</ChartMessage>}
      {isEmpty && <ChartMessage>Sem despesas no período.</ChartMessage>}

      {summary && !isEmpty && (
        <ChartBody $stale={loading}>
          {view === "chart" ? (
            <Rows>
              {rows.map((row) => (
                <Row
                  key={row.category}
                  tabIndex={0}
                  title={`${row.category}: ${formatMoney(row.total)} em ${row.count} lançamento(s), ${formatShare(row.share)} das despesas`}
                >
                  <RowHead>
                    <Name>{row.category}</Name>
                    <Meta>
                      {row.count} lanç. · {formatShare(row.share)}
                    </Meta>
                  </RowHead>
                  <BarLine>
                    <Track>
                      <Bar style={{ width: `${(row.total / maxTotal) * 100}%` }} />
                    </Track>
                    <Value>{formatWholeMoney(row.total)}</Value>
                  </BarLine>
                </Row>
              ))}
            </Rows>
          ) : (
            <TableArea>
              <Table data={rows} columns={columns} pageSize={6} rowKey="category" />
            </TableArea>
          )}
        </ChartBody>
      )}
    </Frame>
  );
}

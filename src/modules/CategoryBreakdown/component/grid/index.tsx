import { useMemo, useState } from "react";
import { useElementSize } from "../../../../hooks/useElementSize";
import { useFitViewport } from "../../../../hooks/useFitViewport";
import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { ViewToggle, type ChartView } from "../../../../components/viewToggle";
import { ChartBody, ChartError, ChartMessage } from "../../../../styles/chart";
import { buildCategoryRows, formatWholeMoney, type CategoryRow } from "../../../../utils/chart";
import { formatMoney } from "../../../../utils/format";
import type { CategorySummary } from "../../../../types/Transaction";
import { Bar, BarLine, COMPACT_ROW_GAP, COMPACT_ROW_HEIGHT, Meta, Name, Row, RowHead, Rows, TableArea, Track, Value } from "./style";

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

  const fitViewport = useFitViewport();
  const { ref: rowsRef, height: rowsHeight } = useElementSize<HTMLDivElement>();
  const capacity = Math.max(3, Math.floor((rowsHeight + COMPACT_ROW_GAP) / (COMPACT_ROW_HEIGHT + COMPACT_ROW_GAP)));
  const maxVisible = fitViewport && rowsHeight > 0 ? capacity - 1 : undefined;

  const rows = useMemo(() => buildCategoryRows(summary ?? [], maxVisible), [summary, maxVisible]);
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
            <Rows ref={rowsRef}>
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
              <Table data={rows} columns={columns} pageSize={6} fitRows rowKey="category" />
            </TableArea>
          )}
        </ChartBody>
      )}
    </Frame>
  );
}

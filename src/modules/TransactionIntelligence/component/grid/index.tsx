import { useMemo } from "react";
import { Link } from "react-router-dom";
import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { formatDate, formatMoney } from "../../../../utils/format";
import { theme } from "../../../../styles/theme";
import { useTransactionSearch } from "../../../../hooks/useTransactionSearch";
import type { DateRange, TransactionQuery, TransactionRow } from "../../../../types/Transaction";
import { NeutralTag } from "../../../../components/neutralTag";
import { SeeAll, TableArea } from "./style";

const PREVIEW_SIZE = 20;

type TransactionIntelligenceProps = {
  range: DateRange;
  reloadKey?: number;
};

const formatDescription = (description: string) => description.split(" - ")[0].trim();

const columns: Column<TransactionRow>[] = [
  { key: "date", title: "Data", width: 120, render: (row) => formatDate(row.date) },
  { key: "description", title: "Descrição", render: (row) => formatDescription(row.description) },
  {
    key: "category",
    title: "Categoria",
    width: 220,
    render: (row) => (
      <>
        {row.category ?? "Outros"}
        {row.neutral && <NeutralTag />}
      </>
    ),
  },
  {
    key: "amount",
    title: "Valor",
    width: 160,
    align: "right",
    render: (row) => (
      <span style={{ color: row.amount < 0 ? theme.colors.negative : theme.colors.positive, whiteSpace: "nowrap" }}>
        {row.amount < 0 ? "- " : "+ "}
        {formatMoney(Math.abs(row.amount))}
      </span>
    ),
  },
];

export function TransactionIntelligence({ range, reloadKey }: TransactionIntelligenceProps) {
  const query = useMemo<TransactionQuery>(
    () => ({
      range,
      filters: { q: "", category: "", type: "", paymentMethod: "", scope: "all" },
      page: 0,
      size: PREVIEW_SIZE,
      sortKey: "date",
      sortDir: "desc",
    }),
    [range],
  );
  const { data, loading } = useTransactionSearch(query, reloadKey);

  return (
    <Frame title="Transações recentes" actions={<SeeAll as={Link} to="/transacoes">Ver todas</SeeAll>}>
      <TableArea>
        <Table data={data?.transactions.content ?? []} columns={columns} pageSize={10} fitRows pager={false} loading={loading && data === null} />
      </TableArea>
    </Frame>
  );
}

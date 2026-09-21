import Table, { type Column } from "../../../../components/table";
import { Frame } from "../../../../components/frame";
import { formatDate } from "../../../../utils/format";
import { theme } from "../../../../styles/theme";
import { useDashboard } from "../../../../hooks/useDashboard";
import type { DateRange, Transaction } from "../../../../types/Transaction";
import { NeutralTag, TableArea } from "./style";

const PAGE_SIZE = 200;

type TransactionIntelligenceProps = {
  range: DateRange;
  reloadKey?: number;
};

export function TransactionIntelligence({ range, reloadKey }: TransactionIntelligenceProps) {
  const { data, loading } = useDashboard({ ...range, size: PAGE_SIZE }, reloadKey);

  const formatDescription = (desc: string) => {
    return desc.split(" - ")[0].trim();
  };

  const columns: Column<Transaction>[] = [
    { key: 'date', title: 'Data', width: 120, sortable: true, render: (value) => formatDate(value.date) },
    { key: 'description', title: 'Descrição', sortable: true, render: (value) => formatDescription(value.description) },
    { key: 'category', title: 'Categoria', sortable: true,
      render: (value) => (
        <>
          {value.category ?? 'Outros'}
          {value.neutral && <NeutralTag title="Pagamento de fatura ou transferência entre as suas contas: não entra em receitas nem despesas">fora dos totais</NeutralTag>}
        </>
      )
    },
    { key: 'amount', title: 'Valor', align: 'right', sortable: true,
      render: (row) => {
        const formatted = Math.abs(row.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        return (
          <span style={{ color: row.amount < 0 ? theme.colors.negative : theme.colors.positive, whiteSpace: 'nowrap' }}>
            {row.amount < 0 ? `- ${formatted}` : `+ ${formatted}`}
          </span>
        );
      }
    },
  ];

  return (
    <Frame title="Transações">
      <TableArea>
        <Table data={data?.transactions.content ?? []} columns={columns} pageSize={10} loading={loading} />
      </TableArea>
    </Frame>
  );
}

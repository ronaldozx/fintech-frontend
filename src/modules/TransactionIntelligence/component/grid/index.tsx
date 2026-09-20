import Table, { type Column } from "../../../../components/table";
import { Container, Header } from "./style";
import { formatDate, formatIsoDate } from "../../../../utils/format";
import { useDashboard } from "../../../../hooks/useDashboard";
import type { Transaction } from "../../../../types/Transaction";

const PERIOD_MONTHS = 12;
const PAGE_SIZE = 200;

function getPeriod() {
  const end = new Date();
  const start = new Date(end.getFullYear(), end.getMonth() - PERIOD_MONTHS, end.getDate());
  return { startDate: formatIsoDate(start), endDate: formatIsoDate(end) };
}

const period = getPeriod();

export function TransactionIntelligence() {
  const { data, loading } = useDashboard({ ...period, size: PAGE_SIZE });

  const formatDescription = (desc: string) => {
    return desc.split(" - ")[0].trim();
  };

  const columns: Column<Transaction>[] = [
    { key: 'date', title: 'Data', width: 120, sortable: true, render: (value) => formatDate(value.date) },
    { key: 'description', title: 'Descrição', sortable: true, render: (value) => formatDescription(value.description) },
    { key: 'amount', title: 'Valor', align: 'right', sortable: true,
      render: (row) => {
        const formatted = Math.abs(row.amount).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        return (
          <span style={{ color: row.amount < 0 ? '#FF6B6B' : '#0ea500', whiteSpace: 'nowrap' }}>
            {row.amount < 0 ? `- ${formatted}` : `+ ${formatted}`}
          </span>
        );
      }
    },
  ];

  return (
    <Container>
        <Header>
          TransactionIntelligence
        </Header>
        <div style={{ height: "230px"}}>
          <Table data={data?.transactions.content ?? []} columns={columns} pageSize={10} loading={loading} />
        </div>
    </Container>
  );
}

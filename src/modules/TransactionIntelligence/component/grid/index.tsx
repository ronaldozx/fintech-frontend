import { useContext, useEffect, useState } from "react";
import Table, { type Column } from "../../../../components/table";
import { Container, Header } from "./style";
import { AuthContext } from "../../../../context/auth/AuthContext";
import { formatDate } from "../../../../utils/format";
import { getAllTransactions } from "../../../../services/transaction";

type CashFlowEntry = {
  date: string;
  description: string;
  amount: number;
  category: string;
};

export function TransactionIntelligence() {
  const auth = useContext(AuthContext);
  const [data, setData] = useState<CashFlowEntry[]>([]);
  useEffect(() => {
    if (!auth?.user?.id) return;
    
    getAllTransactions(auth.user.id)
      .then((result) => setData(result || []))
      .catch((error) => {
        console.error("Erro ao carregar fluxo de caixa:", error);
        setData([]);
      });
  }, [auth?.user?.id]);

  const formatDescription = (desc: string) => {
    return desc.split(" - ")[0].trim();
  };

  const columns: Column<CashFlowEntry>[] = [
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
          <Table data={data} columns={columns} pageSize={10} /> 
        </div>
    </Container>
  );
}
import { useContext, useEffect, useState } from "react";
import { Container, Header } from "./style";
import { AuthContext } from "../../../../context/auth/AuthContext";
import { getAllTransactions } from "../../../../services/transaction";

type CashFlowEntry = {
  date: string;
  description: string;
  amount: number;
  category: string;
};

export function CashFlow() {
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

  console.log("Dados do fluxo de caixa:", data);
  return (
    <Container>
        <Header>
          CashFlow
        </Header>
        
    </Container>
  );
}
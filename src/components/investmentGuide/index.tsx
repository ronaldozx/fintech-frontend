import Modal from "../modal";
import { DISCLAIMER } from "../../utils/investments";
import { Disclaimer, Term, Terms } from "./style";

type InvestmentGuideProps = {
    isOpen: boolean;
    onClose: () => void;
};

const TERMS = [
    {
        name: "Renda fixa",
        text: "Você empresta dinheiro a um banco ou ao governo e recebe juros combinados na contratação (como CDB, LCI, LCA e Tesouro Direto). O retorno é mais previsível, mas é preciso olhar o prazo de resgate e a taxa.",
    },
    {
        name: "Fundos de investimento",
        text: "Reúnem o dinheiro de várias pessoas, aplicado por um gestor. Cobram taxas e o risco depende da estratégia do fundo.",
    },
    {
        name: "Ações",
        text: "Pequenas partes de uma empresa. O preço varia bastante no curto prazo, então o risco é maior.",
    },
    {
        name: "Liquidez",
        text: "Quão rápido você transforma o investimento em dinheiro sem perder valor. Um CDB com vencimento em anos pode não ter resgate imediato.",
    },
    {
        name: "Risco e diversificação",
        text: "Concentrar tudo em um único emissor ou tipo de ativo deixa a carteira mais exposta. Espalhar reduz o impacto de um problema isolado.",
    },
    {
        name: "Rentabilidade real",
        text: "É o ganho depois de descontar a inflação. Um rendimento menor que a inflação faz o dinheiro perder poder de compra.",
    },
    {
        name: "Custos e impostos",
        text: "Taxas de administração e o imposto de renda (na renda fixa, a alíquota diminui com o tempo aplicado) reduzem o ganho líquido.",
    },
];

export function InvestmentGuide({ isOpen, onClose }: InvestmentGuideProps) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Guia rápido de investimentos">
            <Terms>
                {TERMS.map((term) => (
                    <Term key={term.name}>
                        <strong>{term.name}</strong>
                        <p>{term.text}</p>
                    </Term>
                ))}
            </Terms>
            <Disclaimer>{DISCLAIMER} Para decidir onde investir, converse com um profissional habilitado.</Disclaimer>
        </Modal>
    );
}

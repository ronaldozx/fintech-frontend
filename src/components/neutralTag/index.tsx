import { Tag } from "./style";

const REASON_TITLES: Record<string, string> = {
    OWN_TRANSFER: "Transferência entre as suas contas: não entra em receitas nem despesas",
    USER: "Você marcou este lançamento como fora dos totais",
};

const DEFAULT_TITLE = "Pagamento de fatura ou transferência entre as suas contas: não entra em receitas nem despesas";

type NeutralTagProps = {
    reason?: string | null;
};

export function NeutralTag({ reason }: NeutralTagProps) {
    return <Tag title={(reason && REASON_TITLES[reason]) || DEFAULT_TITLE}>fora dos totais</Tag>;
}

export function ManualTag() {
    return <Tag title="Lançamento feito por você, não vem do banco">manual</Tag>;
}

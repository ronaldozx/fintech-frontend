import { useState, type FormEvent } from "react";
import { DefaultButtonStyle } from "../button/style";
import CustomInput from "../customInput";
import Modal from "../modal";
import { SelectField, type SelectOption } from "../selectField";
import { createTransaction, deleteTransaction, updateTransaction } from "../../services/transaction";
import { formatIsoDate } from "../../utils/format";
import { parseAmount } from "../../utils/money";
import type { TransactionRow, TransactionType } from "../../types/Transaction";
import { Actions, CheckRow, ErrorText, Fields, Form, Note, Spacer } from "./style";

type TransactionModalProps = {
    target: TransactionRow | "new";
    categories: string[];
    onClose: () => void;
    onSaved: () => void;
};

const TYPE_OPTIONS: SelectOption<TransactionType>[] = [
    { value: "EXPENSE", label: "Despesa" },
    { value: "INCOME", label: "Receita" },
];

const REASON_TEXT: Record<string, string> = {
    OWN_TRANSFER: "Foi identificada como transferência entre as suas contas.",
    USER: "Você marcou este lançamento como fora dos totais.",
};

const CATEGORIES_LIST_ID = "transaction-categories";

export function TransactionModal({ target, categories, onClose, onSaved }: TransactionModalProps) {
    const creating = target === "new";
    const editable = creating || target.manual;

    const [description, setDescription] = useState(creating ? "" : target.description);
    const [amount, setAmount] = useState(creating ? "" : String(Math.abs(target.amount)).replace(".", ","));
    const [type, setType] = useState<TransactionType>(creating ? "EXPENSE" : target.type);
    const [date, setDate] = useState(creating ? formatIsoDate(new Date()) : target.date);
    const [category, setCategory] = useState(creating ? "" : (target.category ?? ""));
    const [counts, setCounts] = useState(creating ? true : !target.neutral);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const value = parseAmount(amount);
        if (editable && (description.trim() === "" || value === null || date === "")) {
            setError("Preencha descrição, um valor maior que zero e a data");
            return;
        }
        if (!creating && category.trim() === "") {
            setError("Informe a categoria");
            return;
        }

        setSaving(true);
        setError(null);
        try {
            if (creating) {
                await createTransaction({
                    description: description.trim(),
                    amount: value ?? 0,
                    type,
                    date,
                    category: category.trim() === "" ? null : category.trim(),
                });
            } else {
                await updateTransaction(target.id, {
                    category: category.trim(),
                    neutral: !counts,
                    ...(editable ? { description: description.trim(), amount: value ?? undefined, type, date } : {}),
                });
            }
            onSaved();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
            setSaving(false);
        }
    }

    async function handleDelete() {
        if (creating || !window.confirm("Excluir este lançamento manual?")) return;

        setSaving(true);
        setError(null);
        try {
            await deleteTransaction(target.id);
            onSaved();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
            setSaving(false);
        }
    }

    return (
        <Modal isOpen onClose={onClose} title={creating ? "Nova transação" : "Editar transação"}>
            <Form onSubmit={handleSubmit}>
                {!creating && !target.manual && (
                    <Note>
                        Lançamento importado do banco: só a categoria e se ele conta nos totais podem ser alterados.
                        {target.neutral && target.neutralReason && ` ${REASON_TEXT[target.neutralReason] ?? ""}`}
                    </Note>
                )}

                {editable && (
                    <>
                        <CustomInput label="Descrição" value={description} onChange={(event) => setDescription(event.target.value)} maxLength={200} autoFocus />
                        <Fields>
                            <SelectField label="Tipo" value={type} options={TYPE_OPTIONS} onChange={setType} />
                            <CustomInput label="Valor (R$)" inputMode="decimal" placeholder="0,00" value={amount} onChange={(event) => setAmount(event.target.value)} />
                            <CustomInput label="Data" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                        </Fields>
                    </>
                )}

                <CustomInput
                    label="Categoria"
                    list={CATEGORIES_LIST_ID}
                    placeholder="Escolha ou digite uma nova"
                    value={category}
                    onChange={(event) => setCategory(event.target.value)}
                    maxLength={100}
                    autoFocus={!editable}
                />
                <datalist id={CATEGORIES_LIST_ID}>
                    {categories.map((item) => (
                        <option key={item} value={item} />
                    ))}
                </datalist>

                {!creating && (
                    <CheckRow>
                        <input type="checkbox" checked={counts} onChange={(event) => setCounts(event.target.checked)} />
                        Conta nos totais de receitas e despesas
                    </CheckRow>
                )}

                {error && <ErrorText role="alert">{error}</ErrorText>}

                <Actions>
                    {!creating && target.manual && (
                        <DefaultButtonStyle type="button" onClick={handleDelete} disabled={saving}>
                            Excluir
                        </DefaultButtonStyle>
                    )}
                    <Spacer />
                    <DefaultButtonStyle type="button" onClick={onClose} disabled={saving}>
                        Cancelar
                    </DefaultButtonStyle>
                    <DefaultButtonStyle type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar"}
                    </DefaultButtonStyle>
                </Actions>
            </Form>
        </Modal>
    );
}

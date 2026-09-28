import { useState, type FormEvent } from "react";
import { DefaultButtonStyle } from "../button/style";
import CustomInput from "../customInput";
import Modal from "../modal";
import { SelectField, type SelectOption } from "../selectField";
import { contributeToGoal, createGoal, updateGoal } from "../../services/goals";
import { formatMoney } from "../../utils/format";
import { parseAmount } from "../../utils/money";
import type { GoalFormTarget } from "../../types/Goals";
import { Actions, ErrorText, Form, Note } from "./style";

type GoalModalProps = {
    target: GoalFormTarget;
    onClose: () => void;
    onSaved: () => void;
};

type Movement = "deposit" | "withdrawal";

const MOVEMENT_OPTIONS: SelectOption<Movement>[] = [
    { value: "deposit", label: "Guardar (aporte)" },
    { value: "withdrawal", label: "Retirar" },
];

const TITLES = {
    create: "Nova meta",
    edit: "Editar meta",
    contribute: "Movimentar meta",
};

export function GoalModal({ target, onClose, onSaved }: GoalModalProps) {
    const goal = target.mode === "create" ? null : target.goal;

    const [name, setName] = useState(goal?.name ?? "");
    const [amount, setAmount] = useState(goal && target.mode === "edit" ? String(goal.targetAmount).replace(".", ",") : "");
    const [date, setDate] = useState(goal?.targetDate ?? "");
    const [movement, setMovement] = useState<Movement>("deposit");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const value = parseAmount(amount);
        if (value === null) {
            setError("Informe um valor maior que zero");
            return;
        }
        if (target.mode !== "contribute" && name.trim() === "") {
            setError("Dê um nome para a meta");
            return;
        }

        setSaving(true);
        setError(null);
        try {
            if (target.mode === "contribute") {
                await contributeToGoal(target.goal.id, movement === "deposit" ? value : -value);
            } else {
                const input = { name: name.trim(), targetAmount: value, targetDate: date === "" ? null : date };
                if (target.mode === "edit") await updateGoal(target.goal.id, input);
                else await createGoal(input);
            }
            onSaved();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
            setSaving(false);
        }
    }

    return (
        <Modal isOpen onClose={onClose} title={TITLES[target.mode]}>
            <Form onSubmit={handleSubmit}>
                {target.mode === "contribute" ? (
                    <>
                        <Note>
                            {target.goal.name}: você já guardou {formatMoney(target.goal.savedAmount)} de {formatMoney(target.goal.targetAmount)}.
                        </Note>
                        <SelectField label="Movimento" value={movement} options={MOVEMENT_OPTIONS} onChange={setMovement} />
                        <CustomInput label="Valor (R$)" inputMode="decimal" placeholder="0,00" value={amount} onChange={(event) => setAmount(event.target.value)} autoFocus />
                    </>
                ) : (
                    <>
                        <CustomInput label="Nome da meta" placeholder="Ex.: Reserva de emergência" value={name} onChange={(event) => setName(event.target.value)} maxLength={100} autoFocus />
                        <CustomInput label="Valor da meta (R$)" inputMode="decimal" placeholder="0,00" value={amount} onChange={(event) => setAmount(event.target.value)} />
                        <CustomInput label="Prazo (opcional)" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
                    </>
                )}

                {error && <ErrorText role="alert">{error}</ErrorText>}

                <Actions>
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

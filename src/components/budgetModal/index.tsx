import { useState, type FormEvent } from "react";
import { DefaultButtonStyle } from "../button/style";
import CustomInput from "../customInput";
import Modal from "../modal";
import { SelectField, type SelectOption } from "../selectField";
import { createBudget, updateBudget } from "../../services/budgets";
import { availableCategories, budgetTitle, OVERALL_LABEL, parseLimit } from "../../utils/budgets";
import type { BudgetFormTarget, BudgetProgress } from "../../types/Budgets";
import { Actions, ErrorText, Form, Hint } from "./style";

type BudgetModalProps = {
    target: BudgetFormTarget;
    budgets: BudgetProgress[];
    categories: string[];
    onClose: () => void;
    onSaved: () => void;
};

const OVERALL_VALUE = "";

function buildOptions(target: BudgetFormTarget, budgets: BudgetProgress[], categories: string[]): SelectOption<string>[] {
    const free = availableCategories(categories, budgets);
    const preselected = target.mode === "create" && target.category && !free.includes(target.category) ? [target.category] : [];
    const hasOverall = budgets.some((budget) => budget.category === null);

    return [
        ...(hasOverall ? [] : [{ value: OVERALL_VALUE, label: `${OVERALL_LABEL} (todas as categorias)` }]),
        ...[...preselected, ...free].map((category) => ({ value: category, label: category })),
    ];
}

export function BudgetModal({ target, budgets, categories, onClose, onSaved }: BudgetModalProps) {
    const options = buildOptions(target, budgets, categories);
    const editing = target.mode === "edit";

    const [category, setCategory] = useState(
        target.mode === "create" ? (target.category ?? options[0]?.value ?? OVERALL_VALUE) : (target.budget.category ?? OVERALL_VALUE),
    );
    const [limit, setLimit] = useState(target.mode === "edit" ? String(target.budget.monthlyLimit).replace(".", ",") : "");
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const monthlyLimit = parseLimit(limit);
        if (monthlyLimit === null) {
            setError("Informe um limite maior que zero");
            return;
        }

        setSaving(true);
        setError(null);
        try {
            if (target.mode === "edit") {
                await updateBudget(target.budget.id, monthlyLimit);
            } else {
                await createBudget({ category: category === OVERALL_VALUE ? null : category, monthlyLimit });
            }
            onSaved();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
            setSaving(false);
        }
    }

    return (
        <Modal isOpen onClose={onClose} title={editing ? "Editar orçamento" : "Novo orçamento"}>
            <Form onSubmit={handleSubmit}>
                {target.mode === "edit" ? (
                    <CustomInput label="Categoria" value={budgetTitle(target.budget)} readOnly />
                ) : options.length > 0 ? (
                    <SelectField label="Categoria" value={category} options={options} onChange={setCategory} />
                ) : (
                    <Hint>Todas as categorias já têm um orçamento. Edite um existente.</Hint>
                )}
                <CustomInput
                    label="Limite mensal (R$)"
                    inputMode="decimal"
                    placeholder="0,00"
                    value={limit}
                    onChange={(event) => setLimit(event.target.value)}
                    autoFocus
                />
                {error && <ErrorText role="alert">{error}</ErrorText>}
                <Actions>
                    <DefaultButtonStyle type="button" onClick={onClose} disabled={saving}>
                        Cancelar
                    </DefaultButtonStyle>
                    <DefaultButtonStyle type="submit" disabled={saving || (target.mode === "create" && options.length === 0)}>
                        {saving ? "Salvando..." : "Salvar"}
                    </DefaultButtonStyle>
                </Actions>
            </Form>
        </Modal>
    );
}

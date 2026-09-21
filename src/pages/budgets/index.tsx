import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BudgetModal } from "../../components/budgetModal";
import { DefaultButtonStyle } from "../../components/button/style";
import { Frame } from "../../components/frame";
import { Fill } from "../../components/pageFill/style";
import { MonthNavigator } from "../../components/monthNavigator";
import { PageHeader } from "../../components/pageHeader";
import { StatTile } from "../../components/statTile";
import { UsageBar } from "../../components/usageBar";
import { ErrorText } from "../../components/bankConnections/style";
import { useBudgetCategories, useBudgets } from "../../hooks/useBudgets";
import { deleteBudget } from "../../services/budgets";
import { chartColors } from "../../styles/chart";
import { theme } from "../../styles/theme";
import { budgetTitle, countByStatus, remainingText } from "../../utils/budgets";
import { formatMoney } from "../../utils/format";
import { currentMonth } from "../../utils/month";
import type { BudgetFormTarget, BudgetProgress } from "../../types/Budgets";
import {
    Actions,
    Card,
    CardActions,
    CardHead,
    CardTitle,
    Cards,
    IconButton,
    Message,
    Remaining,
    Stats,
    UnbudgetedInfo,
    UnbudgetedItem,
    UnbudgetedList,
} from "./style";

export function Budgets() {
    const [month, setMonth] = useState(currentMonth);
    const [reloadKey, setReloadKey] = useState(0);
    const [target, setTarget] = useState<BudgetFormTarget | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const { data, loading, error } = useBudgets(month, reloadKey);
    const categories = useBudgetCategories(reloadKey);

    const budgets = useMemo(() => data?.budgets ?? [], [data]);
    const overall = budgets.find((budget) => budget.category === null);
    const counts = useMemo(() => countByStatus(budgets), [budgets]);
    const stale = loading && data !== null;

    const reload = () => setReloadKey((key) => key + 1);

    async function handleDelete(budget: BudgetProgress) {
        if (!window.confirm(`Excluir o orçamento "${budgetTitle(budget)}"? Suas transações não são afetadas.`)) return;

        setActionError(null);
        try {
            await deleteBudget(budget.id);
            reload();
        } catch (err) {
            setActionError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
        }
    }

    function handleSaved() {
        setTarget(null);
        reload();
    }

    return (
        <>
            <PageHeader
                title="Orçamentos e metas"
                subtitle="Defina limites mensais e acompanhe o quanto já gastou"
                actions={
                    <Actions>
                        <MonthNavigator month={month} onChange={setMonth} />
                        <DefaultButtonStyle onClick={() => setTarget({ mode: "create", category: null })} disabled={data === null}>
                            <FontAwesomeIcon icon={faPlus} /> Novo orçamento
                        </DefaultButtonStyle>
                    </Actions>
                }
            />

            {error && <ErrorText>{error}</ErrorText>}
            {actionError && <ErrorText>{actionError}</ErrorText>}

            <Stats $stale={stale}>
                <StatTile
                    hero
                    label="Gasto no mês"
                    value={data ? formatMoney(data.totalSpent) : "—"}
                    hint={overall ? `${overall.percent}% do orçamento total de ${formatMoney(overall.monthlyLimit)}` : "Sem orçamento total definido"}
                />
                <StatTile label="Estourados" value={data ? String(counts.exceeded) : "—"} accent={chartColors.expense} />
                <StatTile label="Perto do limite" value={data ? String(counts.warning) : "—"} accent={theme.colors.warning} />
            </Stats>

            <Fill>
            {data && budgets.length === 0 && (
                <Message>Nenhum orçamento ainda. Use “Novo orçamento” para definir um limite mensal por categoria.</Message>
            )}

            <Cards $stale={stale}>
                {budgets.map((budget) => (
                    <Card key={budget.id}>
                        <CardHead>
                            <CardTitle>
                                <strong>{budgetTitle(budget)}</strong>
                                <span>Limite mensal {formatMoney(budget.monthlyLimit)}</span>
                            </CardTitle>
                            <CardActions>
                                <IconButton onClick={() => setTarget({ mode: "edit", budget })} aria-label={`Editar ${budgetTitle(budget)}`} title="Editar">
                                    <FontAwesomeIcon icon={faPen} />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(budget)} aria-label={`Excluir ${budgetTitle(budget)}`} title="Excluir">
                                    <FontAwesomeIcon icon={faTrash} />
                                </IconButton>
                            </CardActions>
                        </CardHead>
                        <UsageBar label="Gasto do mês" percent={budget.percent} detail={`${formatMoney(budget.spent)} de ${formatMoney(budget.monthlyLimit)}`} />
                        <Remaining $exceeded={budget.remaining < 0}>{remainingText(budget)}</Remaining>
                    </Card>
                ))}
            </Cards>

            {data && data.unbudgeted.length > 0 && (
                <Frame title="Gastos sem orçamento" fit>
                    <UnbudgetedList>
                        {data.unbudgeted.map((item) => (
                            <UnbudgetedItem key={item.category} title={item.category}>
                                <UnbudgetedInfo>
                                    <strong>{item.category}</strong>
                                    <span>{formatMoney(item.spent)}</span>
                                </UnbudgetedInfo>
                                <IconButton
                                    onClick={() => setTarget({ mode: "create", category: item.category })}
                                    aria-label={`Definir limite para ${item.category}`}
                                    title="Definir limite"
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </IconButton>
                            </UnbudgetedItem>
                        ))}
                    </UnbudgetedList>
                </Frame>
            )}
            </Fill>

            {target && (
                <BudgetModal target={target} budgets={budgets} categories={categories} onClose={() => setTarget(null)} onSaved={handleSaved} />
            )}
        </>
    );
}

import { useMemo, useState, type ReactNode } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowTrendUp,
    faCircleCheck,
    faHourglassEnd,
    faPen,
    faPlus,
    faTrash,
    faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../../components/button/style";
import { GoalModal } from "../../components/goalModal";
import { PageHeader } from "../../components/pageHeader";
import { Fill as PageFill } from "../../components/pageFill/style";
import { StatTile } from "../../components/statTile";
import { ErrorText } from "../../components/bankConnections/style";
import { useGoals } from "../../hooks/useGoals";
import { deleteGoal } from "../../services/goals";
import { chartColors } from "../../styles/chart";
import { formatMoney } from "../../utils/format";
import { deadlineText, paceText, STATUS_TEXT } from "../../utils/goals";
import type { Goal, GoalFormTarget, GoalStatus } from "../../types/Goals";
import { Actions, Card, CardActions, CardHead, Cards, IconButton, Message, Stats } from "./style";
import { Amounts, CardFooter, Fill, GoalTitle, Pace, StatusLine, Track } from "./goalsStyle";

const STATUS_ICONS: Record<GoalStatus, typeof faCircleCheck> = {
    ACHIEVED: faCircleCheck,
    ON_TRACK: faArrowTrendUp,
    BEHIND: faTriangleExclamation,
    OVERDUE: faHourglassEnd,
    OPEN: faArrowTrendUp,
};

export function GoalsView({ switcher }: { switcher: ReactNode }) {
    const [reloadKey, setReloadKey] = useState(0);
    const [target, setTarget] = useState<GoalFormTarget | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const { data, loading, error } = useGoals(reloadKey);

    const goals = useMemo(() => data?.goals ?? [], [data]);
    const achieved = goals.filter((goal) => goal.status === "ACHIEVED").length;
    const stale = loading && data !== null;

    const reload = () => setReloadKey((key) => key + 1);

    async function handleDelete(goal: Goal) {
        if (!window.confirm(`Excluir a meta "${goal.name}"? O histórico de aportes dela também será apagado.`)) return;

        setActionError(null);
        try {
            await deleteGoal(goal.id);
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
                subtitle="Junte dinheiro para o que importa e acompanhe o progresso"
                actions={
                    <Actions>
                        {switcher}
                        <DefaultButtonStyle onClick={() => setTarget({ mode: "create" })} disabled={data === null}>
                            <FontAwesomeIcon icon={faPlus} /> Nova meta
                        </DefaultButtonStyle>
                    </Actions>
                }
            />

            {error && <ErrorText>{error}</ErrorText>}
            {actionError && <ErrorText>{actionError}</ErrorText>}

            <Stats $stale={stale}>
                <StatTile
                    hero
                    label="Guardado nas metas"
                    value={data ? formatMoney(data.totalSaved) : "—"}
                    hint={data ? `de ${formatMoney(data.totalTarget)} em ${goals.length} meta(s)` : undefined}
                />
                <StatTile label="Metas atingidas" value={data ? String(achieved) : "—"} accent={chartColors.income} />
                <StatTile
                    label="Ritmo de poupança"
                    value={data ? `${formatMoney(data.averageMonthlySavings)}/mês` : "—"}
                    accent={chartColors.expense}
                    hint="Média dos 3 últimos meses fechados (receitas menos despesas)"
                />
            </Stats>

            <PageFill>
                {data && goals.length === 0 && (
                    <Message>Nenhuma meta ainda. Use “Nova meta” para definir um objetivo, como uma reserva de emergência ou uma viagem.</Message>
                )}

                <Cards $stale={stale}>
                    {goals.map((goal) => {
                        const pace = paceText(goal, data?.averageMonthlySavings ?? 0);

                        return (
                            <Card key={goal.id}>
                                <CardHead>
                                    <GoalTitle>
                                        <strong>{goal.name}</strong>
                                        <span>{deadlineText(goal)}</span>
                                    </GoalTitle>
                                    <CardActions>
                                        <IconButton onClick={() => setTarget({ mode: "edit", goal })} aria-label={`Editar ${goal.name}`} title="Editar">
                                            <FontAwesomeIcon icon={faPen} />
                                        </IconButton>
                                        <IconButton onClick={() => handleDelete(goal)} aria-label={`Excluir ${goal.name}`} title="Excluir">
                                            <FontAwesomeIcon icon={faTrash} />
                                        </IconButton>
                                    </CardActions>
                                </CardHead>

                                <Amounts>
                                    <span>
                                        <strong>{formatMoney(goal.savedAmount)}</strong> de {formatMoney(goal.targetAmount)}
                                    </span>
                                    <strong>{goal.percent}%</strong>
                                </Amounts>
                                <Track role="progressbar" aria-label={`Progresso de ${goal.name}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={goal.percent}>
                                    <Fill $status={goal.status} style={{ width: `${goal.percent}%` }} />
                                </Track>

                                <StatusLine $status={goal.status}>
                                    <FontAwesomeIcon icon={STATUS_ICONS[goal.status]} />
                                    {STATUS_TEXT[goal.status]}
                                </StatusLine>
                                {pace && <Pace>{pace}</Pace>}

                                <CardFooter>
                                    <DefaultButtonStyle onClick={() => setTarget({ mode: "contribute", goal })}>
                                        <FontAwesomeIcon icon={faPlus} /> Guardar ou retirar
                                    </DefaultButtonStyle>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </Cards>
            </PageFill>

            {target && <GoalModal target={target} onClose={() => setTarget(null)} onSaved={handleSaved} />}
        </>
    );
}

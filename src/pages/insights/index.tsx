import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Frame } from "../../components/frame";
import { Fill } from "../../components/pageFill/style";
import { MonthNavigator } from "../../components/monthNavigator";
import { PageHeader } from "../../components/pageHeader";
import { StatTile } from "../../components/statTile";
import { ErrorText } from "../../components/bankConnections/style";
import { useInsights } from "../../hooks/useInsights";
import { chartColors } from "../../styles/chart";
import { hasAnyInsight, projectionSummary, savingsHint, savingsValue } from "../../utils/insights";
import { formatDate, formatMoney } from "../../utils/format";
import { currentMonth } from "../../utils/month";
import type { CategoryChange } from "../../types/Insights";
import { FitList } from "./FitList";
import { Cell, Grid, Highlight, List, Message, Note, Row, RowAmount, RowInfo, Section, Stats, Subheading, TwoColumns } from "./style";

function ChangeRows({ changes, tone }: { changes: CategoryChange[]; tone: "up" | "down" }) {
    return (
        <List>
            {changes.map((change) => (
                <Row key={change.category}>
                    <RowInfo>
                        <strong>{change.category}</strong>
                        <span>
                            {formatMoney(change.previous)} → {formatMoney(change.current)}
                        </span>
                    </RowInfo>
                    <RowAmount $tone={tone}>
                        <FontAwesomeIcon icon={tone === "up" ? faArrowUp : faArrowDown} />
                        {tone === "up" ? "+" : "−"}
                        {formatMoney(Math.abs(change.change))}
                    </RowAmount>
                </Row>
            ))}
        </List>
    );
}

export function Insights() {
    const [month, setMonth] = useState(currentMonth);
    const { data, loading, error } = useInsights(month);
    const stale = loading && data !== null;

    const format = (value: number | undefined) => (data && value !== undefined ? formatMoney(value) : "—");
    const hasMovers = data !== null && (data.movers.increases.length > 0 || data.movers.decreases.length > 0);
    const showProjection = data !== null && data.projection !== null && data.projection.spentSoFar > 0;

    return (
        <>
            <PageHeader
                title="Insights"
                subtitle="O que mudou nos seus gastos e onde dá para economizar"
                actions={<MonthNavigator month={month} onChange={setMonth} />}
            />

            {error && <ErrorText>{error}</ErrorText>}

            <Stats $stale={stale}>
                <StatTile
                    hero
                    label="Taxa de poupança"
                    value={data ? savingsValue(data.cashFlow) : "—"}
                    hint={data ? savingsHint(data.cashFlow) : undefined}
                />
                <StatTile label="Receitas" value={format(data?.cashFlow.income)} accent={chartColors.income} />
                <StatTile label="Despesas" value={format(data?.cashFlow.expense)} accent={chartColors.expense} />
            </Stats>

            {data && !hasAnyInsight(data) && <Message>Sem movimentações neste mês para analisar.</Message>}

            <Fill>
            {data && (
                <Grid $stale={stale}>
                    {showProjection && data.projection && (
                        <Cell>
                        <Frame title="Projeção do mês">
                            <Section>
                                <Highlight>{formatMoney(data.projection.projected)}</Highlight>
                                <Note>
                                    No ritmo atual ({formatMoney(data.projection.spentSoFar)} em {data.projection.daysElapsed} de{" "}
                                    {data.projection.daysInMonth} dias), o mês fecha neste valor de despesas.{" "}
                                    {projectionSummary(data.projection)}.
                                </Note>
                                <Note>Estimativa linear: despesas concentradas, como aluguel, distorcem o resultado.</Note>
                            </Section>
                        </Frame>
                        </Cell>
                    )}

                    {hasMovers && (
                        <Cell $span={2}>
                        <Frame title="Categorias que mais mudaram">
                            <TwoColumns>
                                {data.movers.increases.length > 0 && (
                                    <Section>
                                        <Subheading>Subiram em relação ao mês anterior</Subheading>
                                        <ChangeRows changes={data.movers.increases} tone="up" />
                                    </Section>
                                )}
                                {data.movers.decreases.length > 0 && (
                                    <Section>
                                        <Subheading>Caíram em relação ao mês anterior</Subheading>
                                        <ChangeRows changes={data.movers.decreases} tone="down" />
                                    </Section>
                                )}
                            </TwoColumns>
                        </Frame>
                        </Cell>
                    )}

                    <Cell>
                    <Frame title="Cobranças recorrentes">
                        {data.recurring.charges.length === 0 ? (
                            <Message>Nenhuma cobrança mensal fixa identificada nos últimos meses.</Message>
                        ) : (
                            <Section>
                                <Note>Cobradas uma vez por mês com valor parecido: {formatMoney(data.recurring.monthlyTotal)} por mês.</Note>
                                <FitList
                                    items={data.recurring.charges}
                                    renderItem={(charge) => (
                                        <Row key={charge.description}>
                                            <RowInfo>
                                                <strong>{charge.description}</strong>
                                                <span>
                                                    Em {charge.months} meses · última em {formatDate(charge.lastDate)}
                                                </span>
                                            </RowInfo>
                                            <RowAmount>{formatMoney(charge.averageAmount)}</RowAmount>
                                        </Row>
                                    )}
                                />
                            </Section>
                        )}
                    </Frame>
                    </Cell>

                    <Cell>
                    <Frame title="Gastos fora do padrão">
                        {data.unusual.length === 0 ? (
                            <Message>Nenhum gasto muito acima do normal da categoria neste mês.</Message>
                        ) : (
                            <FitList
                                items={data.unusual}
                                renderItem={(item) => (
                                    <Row key={`${item.date}-${item.description}-${item.amount}`}>
                                        <RowInfo>
                                            <strong>{item.description}</strong>
                                            <span>
                                                {item.category} · {formatDate(item.date)} · costuma ser {formatMoney(item.typicalAmount)}
                                            </span>
                                        </RowInfo>
                                        <RowAmount $tone="up">{formatMoney(item.amount)}</RowAmount>
                                    </Row>
                                )}
                            />
                        )}
                    </Frame>
                    </Cell>

                    <Cell $span={showProjection ? 1 : 2}>
                    <Frame title="Maiores destinos do mês">
                        {data.topMerchants.length === 0 ? (
                            <Message>Sem despesas neste mês.</Message>
                        ) : (
                            <FitList
                                items={data.topMerchants}
                                renderItem={(merchant) => (
                                    <Row key={merchant.description}>
                                        <RowInfo>
                                            <strong>{merchant.description}</strong>
                                            <span>{merchant.count === 1 ? "1 compra" : `${merchant.count} compras`}</span>
                                        </RowInfo>
                                        <RowAmount>{formatMoney(merchant.total)}</RowAmount>
                                    </Row>
                                )}
                            />
                        )}
                    </Frame>
                    </Cell>
                </Grid>
            )}
            </Fill>
        </>
    );
}

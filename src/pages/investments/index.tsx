import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../../components/button/style";
import { FitList } from "../../components/fitList";
import { Frame } from "../../components/frame";
import { InvestmentGuide } from "../../components/investmentGuide";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { StatTile } from "../../components/statTile";
import { ErrorText } from "../../components/bankConnections/style";
import { useInvestments } from "../../hooks/useInvestments";
import { chartColors } from "../../styles/chart";
import { formatMoney } from "../../utils/format";
import { coverageText, dueText, profitText, rateText, reserveSummary } from "../../utils/investments";
import type { Investment } from "../../types/Investments";
import {
    AllocationHead,
    AllocationRow,
    Cell,
    Column,
    Fill as Bar,
    Info,
    Layout,
    List,
    Message,
    Money,
    Note,
    ROW_GAP,
    ROW_HEIGHT,
    Row,
    Small,
    Stats,
    Track,
} from "./style";

function InvestmentRow({ investment }: { investment: Investment }) {
    const details = [investment.typeLabel, investment.issuer ?? investment.institution, rateText(investment), dueText(investment)].filter(Boolean);
    const profit = profitText(investment);

    return (
        <Row>
            <Info>
                <strong title={investment.name}>{investment.name}</strong>
                <span>{details.join(" · ")}</span>
            </Info>
            <Money $tone={investment.profit === null ? undefined : investment.profit >= 0 ? "up" : "down"}>
                <strong>{formatMoney(investment.balance)}</strong>
                {profit && <span>{profit}</span>}
            </Money>
        </Row>
    );
}

export function Investments() {
    const { data, loading, error } = useInvestments(0);
    const [guideOpen, setGuideOpen] = useState(false);
    const stale = loading && data !== null;

    const format = (value: number | null | undefined) => (data && value !== null && value !== undefined ? formatMoney(value) : "—");
    const fund = data?.emergencyFund;
    const coverage = fund && fund.referenceAmount > 0 ? Math.min(100, Math.round((fund.availableAmount / fund.referenceAmount) * 100)) : 0;

    return (
        <>
            <PageHeader
                title="Investimentos"
                subtitle="Sua carteira, lida direto dos bancos. Não é recomendação de investimento."
                actions={
                    <DefaultButtonStyle onClick={() => setGuideOpen(true)}>
                        <FontAwesomeIcon icon={faBookOpen} /> Guia rápido
                    </DefaultButtonStyle>
                }
            />

            {error && <ErrorText>{error}</ErrorText>}
            {data && data.unavailableConnections.length > 0 && (
                <ErrorText>Não consegui ler os investimentos de: {data.unavailableConnections.join(", ")}.</ErrorText>
            )}

            <Stats $stale={stale}>
                <StatTile
                    hero
                    label="Total investido"
                    value={format(data?.totalBalance)}
                    hint={data && data.totalInvested !== null ? `Aplicado: ${formatMoney(data.totalInvested)}` : "Valor atual da carteira"}
                />
                <StatTile label="Ganho" value={format(data?.totalProfit)} accent={chartColors.income} hint="Saldo atual menos o valor aplicado" />
                <StatTile
                    label="Cobertura da reserva"
                    value={fund && fund.coveredMonths !== null ? `${String(fund.coveredMonths).replace(".", ",")} meses` : "—"}
                    accent={chartColors.expense}
                    hint="Referência: 6 meses de despesas"
                />
            </Stats>

            <Fill>
                {data && data.investments.length === 0 ? (
                    <Message>Nenhum investimento com saldo foi encontrado nas suas conexões. Se você tem aplicações, conecte a instituição pelo MeuPluggy.</Message>
                ) : (
                    <Layout>
                        <Cell>
                            <Frame title="Carteira">
                                <FitList
                                    items={data?.investments ?? []}
                                    rowHeight={ROW_HEIGHT}
                                    gap={ROW_GAP}
                                    renderItem={(investment) => <InvestmentRow key={investment.id} investment={investment} />}
                                />
                            </Frame>
                        </Cell>

                        <Column>
                            <Cell $content>
                                <Frame title="Alocação por tipo">
                                    <List>
                                        {(data?.allocation ?? []).map((item) => (
                                            <AllocationRow key={item.label}>
                                                <AllocationHead>
                                                    {item.label}
                                                    <span>
                                                        {item.percent}% · {formatMoney(item.total)}
                                                    </span>
                                                </AllocationHead>
                                                <Track role="progressbar" aria-label={item.label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.percent}>
                                                    <Bar style={{ width: `${item.percent}%` }} />
                                                </Track>
                                            </AllocationRow>
                                        ))}
                                    </List>
                                    {data?.concentration && (
                                        <Note>
                                            {data.concentration.percent}% da carteira está em {data.concentration.name}.
                                        </Note>
                                    )}
                                </Frame>
                            </Cell>

                            <Cell $content>
                                <Frame title="Reserva de emergência (referência)">
                                    {fund && (
                                        <>
                                            <Note>{reserveSummary(fund)}</Note>
                                            {coverageText(fund) && <Note>{coverageText(fund)}</Note>}
                                            {fund.referenceAmount > 0 && (
                                                <Track role="progressbar" aria-label="Cobertura da reserva de referência" aria-valuemin={0} aria-valuemax={100} aria-valuenow={coverage}>
                                                    <Bar style={{ width: `${coverage}%` }} />
                                                </Track>
                                            )}
                                            <Small>Referência comum de planejamento financeiro, não uma recomendação para você.</Small>
                                        </>
                                    )}
                                </Frame>
                            </Cell>
                        </Column>
                    </Layout>
                )}
            </Fill>

            <InvestmentGuide isOpen={guideOpen} onClose={() => setGuideOpen(false)} />
        </>
    );
}

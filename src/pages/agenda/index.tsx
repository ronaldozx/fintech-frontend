import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullseye, faCreditCard, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { FitList } from "../../components/fitList";
import { Frame } from "../../components/frame";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { SegmentedControl, type SegmentedOption } from "../../components/segmentedControl";
import { StatTile } from "../../components/statTile";
import { ErrorText } from "../../components/bankConnections/style";
import { useAgenda } from "../../hooks/useAgenda";
import { chartColors } from "../../styles/chart";
import { formatDate, formatMoney } from "../../utils/format";
import type { AgendaItem, AgendaItemType } from "../../types/Agenda";
import { Amount, DateBlock, Icon, Info, Message, ROW_GAP, ROW_HEIGHT, Row, Stats } from "./style";

type Horizon = "15" | "30" | "60" | "90";

const OPTIONS: SegmentedOption<Horizon>[] = [
    { value: "15", label: "15 dias" },
    { value: "30", label: "30 dias" },
    { value: "60", label: "60 dias" },
    { value: "90", label: "90 dias" },
];

const ICONS: Record<AgendaItemType, typeof faCreditCard> = {
    CARD_BILL: faCreditCard,
    RECURRING: faRepeat,
    GOAL_DEADLINE: faBullseye,
};

const TONES: Record<AgendaItemType, "bill" | "recurring" | "goal"> = {
    CARD_BILL: "bill",
    RECURRING: "recurring",
    GOAL_DEADLINE: "goal",
};

const LABELS: Record<AgendaItemType, string> = {
    CARD_BILL: "Fatura do cartão",
    RECURRING: "Cobrança fixa",
    GOAL_DEADLINE: "Prazo de meta",
};

const untilText = (days: number) => (days === 0 ? "hoje" : days === 1 ? "amanhã" : `em ${days} dias`);

const shortDate = (date: string) => formatDate(date).slice(0, 5);

function AgendaRow({ item }: { item: AgendaItem }) {
    return (
        <Row key={`${item.type}-${item.title}-${item.date}`}>
            <DateBlock>
                <strong>{shortDate(item.date)}</strong>
                <span>{untilText(item.daysUntil)}</span>
            </DateBlock>
            <Icon $tone={TONES[item.type]} title={LABELS[item.type]}>
                <FontAwesomeIcon icon={ICONS[item.type]} />
            </Icon>
            <Info>
                <strong>{item.title}</strong>
                <span>
                    {LABELS[item.type]} · {item.subtitle}
                </span>
            </Info>
            <Amount>{formatMoney(item.amount)}</Amount>
        </Row>
    );
}

export function AgendaPage() {
    const [horizon, setHorizon] = useState<Horizon>("30");
    const days = Number(horizon);
    const { data, loading, error } = useAgenda(days);
    const stale = loading && data !== null;

    const total = data ? data.billsTotal + data.recurringTotal : 0;
    const format = (value: number | undefined) => (data && value !== undefined ? formatMoney(value) : "—");

    return (
        <>
            <PageHeader
                title="Agenda"
                subtitle="O que vai vencer nos próximos dias, calculado com os seus próprios dados"
                actions={<SegmentedControl label="Período da agenda" value={horizon} options={OPTIONS} onChange={setHorizon} />}
            />

            {error && <ErrorText>{error}</ErrorText>}
            {data?.accountsUnavailable && <ErrorText>Não consegui ler todos os bancos agora, então algumas faturas podem estar faltando.</ErrorText>}

            <Stats $stale={stale}>
                <StatTile hero label={`A pagar em ${days} dias`} value={format(total)} hint="Faturas de cartão mais cobranças fixas previstas" />
                <StatTile label="Faturas" value={format(data?.billsTotal)} accent={chartColors.expense} />
                <StatTile label="Cobranças fixas" value={format(data?.recurringTotal)} accent={chartColors.income} />
            </Stats>

            <Fill>
                <Frame title="Próximos vencimentos">
                    {data && data.items.length === 0 ? (
                        <Message>Nada previsto nos próximos {days} dias. Faturas aparecem quando um cartão está conectado; cobranças fixas, depois de 3 meses de histórico.</Message>
                    ) : (
                        <FitList items={data?.items ?? []} rowHeight={ROW_HEIGHT} gap={ROW_GAP} renderItem={(item) => <AgendaRow key={`${item.type}-${item.title}-${item.date}`} item={item} />} />
                    )}
                </Frame>
            </Fill>
        </>
    );
}

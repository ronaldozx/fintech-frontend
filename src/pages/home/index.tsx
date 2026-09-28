import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButtonStyle } from "../../components/button/style";
import { ConnectBank } from "../../components/connectBank";
import { BankConnectionsModal } from "../../components/bankConnections";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { PeriodFilter } from "../../components/periodFilter";
import { SummaryStats } from "../../components/summaryStats";
import { ChartCell, ChartsRow, TransactionsCell } from "./style";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { CashFlow } from "../../modules/CashFlow/component/grid";
import { CategoryBreakdown } from "../../modules/CategoryBreakdown/component/grid";
import { TransactionIntelligence } from "../../modules/TransactionIntelligence/component/grid/index";
import { useSummary } from "../../hooks/useSummary";
import { formatDate } from "../../utils/format";
import { DEFAULT_PERIOD, getPeriodRange, type PeriodId } from "../../utils/period";


export function Home() {
    const [banksOpen, setBanksOpen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);
    const [period, setPeriod] = useState<PeriodId>(DEFAULT_PERIOD);

    const range = useMemo(() => getPeriodRange(period), [period]);
    const { data, loading, error } = useSummary(range, reloadKey);

    function reload() {
        setReloadKey((key) => key + 1);
    }

    return (
        <>
            <PageHeader
                title="Visão geral"
                subtitle={`${formatDate(range.startDate)} → ${formatDate(range.endDate)}`}
                actions={
                    <>
                        <ConnectBank onConnected={reload} />
                        <DefaultButtonStyle onClick={() => setBanksOpen(true)} title="Bancos conectados">
                            <FontAwesomeIcon icon={faBuildingColumns}></FontAwesomeIcon> Bancos
                        </DefaultButtonStyle>
                        <PeriodFilter value={period} onChange={setPeriod} />
                    </>
                }
            />

            <SummaryStats summary={data} loading={loading} />

            <Fill>
                <ChartsRow>
                    <ChartCell>
                        <CashFlow range={range} summary={data} loading={loading} error={error} />
                    </ChartCell>
                    <ChartCell>
                        <CategoryBreakdown summary={data?.categories ?? null} loading={loading} error={error} />
                    </ChartCell>
                </ChartsRow>

                <TransactionsCell>
                    <TransactionIntelligence range={range} reloadKey={reloadKey} />
                </TransactionsCell>
            </Fill>

            <BankConnectionsModal
                isOpen={banksOpen}
                onClose={() => setBanksOpen(false)}
                onChanged={reload}
            />
        </>
    )
}

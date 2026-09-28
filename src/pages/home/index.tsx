import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButtonStyle } from "../../components/button/style";
import { NavBar } from "../../components/navBar";
import { Sidebar } from "../../components/sidebar";
import { ConnectBank } from "../../components/connectBank";
import { BankConnectionsModal } from "../../components/bankConnections";
import { PeriodFilter } from "../../components/periodFilter";
import { SummaryStats } from "../../components/summaryStats";
import { ChartCell, ChartsRow, Content, Heading, PageHeader, Toolbar, TransactionsCell } from "./style";
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
            <NavBar/>
            <Sidebar/>
            <Content>
                <PageHeader>
                    <Heading>
                        <h1>Visão geral</h1>
                        <p>{formatDate(range.startDate)} → {formatDate(range.endDate)}</p>
                    </Heading>
                    <Toolbar>
                        <ConnectBank onConnected={reload} />
                        <DefaultButtonStyle onClick={() => setBanksOpen(true)} title="Bancos conectados">
                            <FontAwesomeIcon icon={faBuildingColumns}></FontAwesomeIcon> Bancos
                        </DefaultButtonStyle>
                        <PeriodFilter value={period} onChange={setPeriod} />
                    </Toolbar>
                </PageHeader>

                <SummaryStats summary={data} loading={loading} />

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

                <BankConnectionsModal
                    isOpen={banksOpen}
                    onClose={() => setBanksOpen(false)}
                    onChanged={reload}
                />
            </Content>

        </>
    )
}

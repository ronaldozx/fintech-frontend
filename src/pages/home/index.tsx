import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButtonStyle } from "../../components/button/style";
import { NavBar } from "../../components/navBar";
import { Sidebar } from "../../components/sidebar";
import { ConnectBank } from "../../components/connectBank";
import { BankConnectionsModal } from "../../components/bankConnections";
import { PeriodFilter } from "../../components/periodFilter";
import { CashFlowCell, CategoryCell, Content, ContentModules, Header, TransactionsCell } from "./style";
import { faBuildingColumns } from "@fortawesome/free-solid-svg-icons";
import { useMemo, useState } from "react";
import { CashFlow } from "../../modules/CashFlow/component/grid";
import { CategoryBreakdown } from "../../modules/CategoryBreakdown/component/grid";
import { TransactionIntelligence } from "../../modules/TransactionIntelligence/component/grid/index";
import { useSummary } from "../../hooks/useSummary";
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
                <Header>
                    <ConnectBank onConnected={reload} />
                    <DefaultButtonStyle onClick={() => setBanksOpen(true)} title="Bancos conectados">
                        <FontAwesomeIcon icon={faBuildingColumns}></FontAwesomeIcon>
                    </DefaultButtonStyle>
                    <PeriodFilter value={period} onChange={setPeriod} />
                </Header>
                <ContentModules>
                    <CashFlowCell>
                        <CashFlow range={range} summary={data} loading={loading} error={error} />
                    </CashFlowCell>
                    <CategoryCell>
                        <CategoryBreakdown summary={data?.categories ?? null} loading={loading} error={error} />
                    </CategoryCell>
                    <TransactionsCell>
                        <TransactionIntelligence range={range} reloadKey={reloadKey} />
                    </TransactionsCell>
                </ContentModules>

                <BankConnectionsModal
                    isOpen={banksOpen}
                    onClose={() => setBanksOpen(false)}
                    onChanged={reload}
                />
            </Content>

        </>
    )
}

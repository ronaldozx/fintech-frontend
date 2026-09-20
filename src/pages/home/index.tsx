import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DefaultButtonStyle } from "../../components/button/style";
import { NavBar } from "../../components/navBar";
import { Sidebar } from "../../components/sidebar";
import { ConnectBank } from "../../components/connectBank";
import { BankConnectionsModal } from "../../components/bankConnections";
import { Content, Header, ContentModules } from "./style";
import { faBuildingColumns, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { CashFlow } from "../../modules/CashFlow/component/grid";
import { TransactionIntelligence } from "../../modules/TransactionIntelligence/component/grid/index";


export function Home() {
    const [banksOpen, setBanksOpen] = useState(false);
    const [reloadKey, setReloadKey] = useState(0);

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
                    <DefaultButtonStyle><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon></DefaultButtonStyle>
                </Header>
                <ContentModules>
                    <CashFlow/>
                    <TransactionIntelligence reloadKey={reloadKey} />
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

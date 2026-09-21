import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuildingColumns, faDownload, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BankConnectionsModal } from "../../components/bankConnections";
import { DefaultButtonStyle } from "../../components/button/style";
import { DeleteAccountModal } from "../../components/deleteAccountModal";
import { Frame } from "../../components/frame";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { useAuth } from "../../hooks/useAuth";
import { downloadMyData } from "../../services/account";
import { Actions, Bullets, Cell, DangerButton, Failure, Layout, Note } from "./style";
import { PasswordForm } from "./PasswordForm";
import { ProfileForm } from "./ProfileForm";

export function Settings() {
    const { logout } = useAuth();
    const [banksOpen, setBanksOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [exporting, setExporting] = useState(false);
    const [exportError, setExportError] = useState<string | null>(null);

    async function handleExport() {
        setExporting(true);
        setExportError(null);
        try {
            await downloadMyData();
        } catch (err) {
            setExportError(err instanceof Error ? err.message : "Erro ao exportar");
        } finally {
            setExporting(false);
        }
    }

    function handleDeleted(providerItemsNotRemoved: number) {
        if (providerItemsNotRemoved > 0) {
            window.alert(
                `Sua conta foi apagada, mas ${providerItemsNotRemoved} conexão(ões) não puderam ser removidas do Pluggy. Você pode removê-las no painel do MeuPluggy.`,
            );
        }
        logout();
    }

    return (
        <>
            <PageHeader title="Configurações" subtitle="Seu perfil, sua segurança e os seus dados" />

            <Fill>
                <Layout>
                    <Cell $span={2}>
                        <ProfileForm />
                    </Cell>
                    <Cell>
                        <PasswordForm />
                    </Cell>

                    <Cell>
                        <Frame title="Bancos conectados">
                            <Note>Veja quando cada banco foi sincronizado pela última vez, sincronize agora ou desconecte um banco.</Note>
                            <Actions>
                                <DefaultButtonStyle onClick={() => setBanksOpen(true)}>
                                    <FontAwesomeIcon icon={faBuildingColumns} /> Gerenciar bancos
                                </DefaultButtonStyle>
                            </Actions>
                        </Frame>
                    </Cell>

                    <Cell>
                        <Frame title="Meus dados">
                            <Note>Baixe uma cópia em JSON do seu perfil, transações, orçamentos e metas. Sua senha e os identificadores do Pluggy não vão no arquivo.</Note>
                            <Actions>
                                <DefaultButtonStyle onClick={handleExport} disabled={exporting}>
                                    <FontAwesomeIcon icon={faDownload} /> {exporting ? "Preparando..." : "Exportar meus dados"}
                                </DefaultButtonStyle>
                                {exportError && <Failure role="alert">{exportError}</Failure>}
                            </Actions>
                        </Frame>
                    </Cell>

                    <Cell>
                        <Frame title="Zona de perigo">
                            <Bullets>
                                <li>Apaga sua conta, seus dados e as conexões com os bancos.</li>
                                <li>Não dá para desfazer.</li>
                            </Bullets>
                            <Actions>
                                <DangerButton type="button" onClick={() => setDeleteOpen(true)}>
                                    <FontAwesomeIcon icon={faTrash} /> Apagar minha conta
                                </DangerButton>
                            </Actions>
                        </Frame>
                    </Cell>
                </Layout>
            </Fill>

            <BankConnectionsModal isOpen={banksOpen} onClose={() => setBanksOpen(false)} onChanged={() => undefined} />
            {deleteOpen && <DeleteAccountModal onClose={() => setDeleteOpen(false)} onDeleted={handleDeleted} />}
        </>
    );
}

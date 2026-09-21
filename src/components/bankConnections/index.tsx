import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTrash } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../button/style";
import Modal from "../modal";
import { useBankConnections } from "../../hooks/useBankConnections";
import { deleteConnection, syncTransactions } from "../../services/openFinance";
import { formatRelative } from "../../utils/time";
import type { BankConnection } from "../../types/OpenFinance";
import { ErrorText, Info, List, Message, Meta, Name, Row, Success, Toolbar } from "./style";

type BankConnectionsModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onChanged: () => void;
};

const STATUS_LABELS: Record<string, string> = {
    UPDATED: "Atualizado",
    UPDATING: "Atualizando",
};

function describe(connection: BankConnection) {
    const status = connection.status ? (STATUS_LABELS[connection.status] ?? connection.status) : "Sem status";
    const since = new Date(connection.createdAt).toLocaleDateString("pt-BR");
    return `${status} · conectado em ${since}`;
}

function syncLine(connection: BankConnection) {
    if (connection.lastSyncError && connection.lastSyncAttemptAt) {
        return { failed: true, text: `Falha ao sincronizar ${formatRelative(connection.lastSyncAttemptAt)}: ${connection.lastSyncError}` };
    }
    if (connection.lastSyncedAt) {
        return { failed: false, text: `Sincronizado ${formatRelative(connection.lastSyncedAt)}` };
    }
    return { failed: false, text: "Ainda não sincronizado" };
}

export function BankConnectionsModal({ isOpen, onClose, onChanged }: BankConnectionsModalProps) {
    const [reloadKey, setReloadKey] = useState(0);
    const [busy, setBusy] = useState(false);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [actionError, setActionError] = useState<string | null>(null);
    const { connections, error, loading } = useBankConnections(isOpen, reloadKey);

    async function run(action: () => Promise<string>) {
        setBusy(true);
        setFeedback(null);
        setActionError(null);
        try {
            setFeedback(await action());
            setReloadKey((key) => key + 1);
            onChanged();
        } catch (err) {
            setActionError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
        } finally {
            setBusy(false);
        }
    }

    function handleSync() {
        run(async () => {
            const result = await syncTransactions();
            const pairs = result.transferPairs > 0 ? `; ${result.transferPairs} transferência(s) entre suas contas tirada(s) dos totais` : "";
            const failed = result.failed > 0 ? `; ${result.failed} banco(s) falharam` : "";
            return `${result.imported} nova(s) transação(ões) importada(s)${pairs}${failed}`;
        });
    }

    function handleDelete(connection: BankConnection) {
        const name = connection.institutionName ?? "este banco";
        if (!window.confirm(`Desconectar ${name}? Suas transações já importadas continuam salvas.`)) return;

        run(async () => {
            await deleteConnection(connection.id);
            return `${name} desconectado`;
        });
    }

    function handleClose() {
        setFeedback(null);
        setActionError(null);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={handleClose} title="Bancos conectados">
            <Toolbar>
                <Message>{connections.length} conexão(ões)</Message>
                <DefaultButtonStyle onClick={handleSync} disabled={busy || connections.length === 0}>
                    <FontAwesomeIcon icon={faRotate} /> Sincronizar
                </DefaultButtonStyle>
            </Toolbar>

            {loading && <Message>Carregando...</Message>}
            {error && <ErrorText>{error}</ErrorText>}
            {!loading && !error && connections.length === 0 && (
                <Message>Nenhum banco conectado. Use o botão + para conectar o primeiro.</Message>
            )}

            <List>
                {connections.map((connection) => (
                    <Row key={connection.id}>
                        <Info>
                            <Name>{connection.institutionName ?? "Banco"}</Name>
                            <Meta>{describe(connection)}</Meta>
                            {(() => {
                                const line = syncLine(connection);
                                return line.failed ? <ErrorText>{line.text}</ErrorText> : <Meta>{line.text}</Meta>;
                            })()}
                        </Info>
                        <DefaultButtonStyle onClick={() => handleDelete(connection)} disabled={busy} title="Desconectar">
                            <FontAwesomeIcon icon={faTrash} />
                        </DefaultButtonStyle>
                    </Row>
                ))}
            </List>

            {feedback && <Success>{feedback}</Success>}
            {actionError && <ErrorText>{actionError}</ErrorText>}
        </Modal>
    );
}

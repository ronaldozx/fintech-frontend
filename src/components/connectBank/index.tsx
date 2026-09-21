import { useState } from "react";
import { PluggyConnect } from "react-pluggy-connect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../button/style";
import Modal from "../modal";
import { createConnectToken, registerConnection, syncTransactions } from "../../services/openFinance";
import { ErrorText } from "../bankConnections/style";

type ConnectBankProps = {
    onConnected: () => void;
};

export function ConnectBank({ onConnected }: ConnectBankProps) {
    const [connectToken, setConnectToken] = useState<string | null>(null);
    const [starting, setStarting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function start() {
        setStarting(true);
        setError(null);
        try {
            setConnectToken(await createConnectToken());
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao iniciar a conexão");
        } finally {
            setStarting(false);
        }
    }

    async function handleSuccess(itemId: string) {
        setConnectToken(null);
        try {
            await registerConnection(itemId);
            await syncTransactions();
            onConnected();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao salvar a conexão");
        }
    }

    return (
        <>
            <DefaultButtonStyle onClick={start} disabled={starting} title="Conectar banco">
                <FontAwesomeIcon icon={faPlus} /> Conectar banco
            </DefaultButtonStyle>

            {connectToken && (
                <PluggyConnect
                    connectToken={connectToken}
                    includeSandbox={import.meta.env.DEV}
                    theme="dark"
                    language="pt"
                    onSuccess={({ item }) => handleSuccess(item.id)}
                    onError={(pluggyError) => {
                        setConnectToken(null);
                        setError(pluggyError.message);
                    }}
                    onClose={() => setConnectToken(null)}
                />
            )}

            <Modal isOpen={error !== null} onClose={() => setError(null)} title="Conectar banco">
                <ErrorText>{error}</ErrorText>
            </Modal>
        </>
    );
}

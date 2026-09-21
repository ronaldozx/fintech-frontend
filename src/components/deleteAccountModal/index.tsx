import { useState, type FormEvent } from "react";
import CustomInput from "../customInput";
import { DefaultButtonStyle } from "../button/style";
import Modal from "../modal";
import { deleteAccount } from "../../services/account";
import { Actions, ErrorText, Form, List, Note } from "./style";

const CONFIRMATION_WORD = "APAGAR";

type DeleteAccountModalProps = {
    onClose: () => void;
    onDeleted: (providerItemsNotRemoved: number) => void;
};

export function DeleteAccountModal({ onClose, onDeleted }: DeleteAccountModalProps) {
    const [password, setPassword] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const confirmed = confirmation.trim().toUpperCase() === CONFIRMATION_WORD && password !== "";

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (!confirmed) return;

        setDeleting(true);
        setError(null);
        try {
            const result = await deleteAccount(password);
            onDeleted(result.providerItemsNotRemoved);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro inesperado, tente novamente");
            setDeleting(false);
        }
    }

    return (
        <Modal isOpen onClose={onClose} title="Apagar minha conta" closeOnOverlayClick={!deleting}>
            <Form onSubmit={handleSubmit}>
                <Note>Isto apaga de forma definitiva, e não dá para desfazer:</Note>
                <List>
                    <li>seu perfil e sua senha;</li>
                    <li>todas as transações, orçamentos, metas e avisos;</li>
                    <li>as conexões com os bancos (também removidas do Pluggy).</li>
                </List>
                <Note>Baixe uma cópia dos seus dados antes, se quiser guardá-los.</Note>

                <CustomInput label="Sua senha" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus />
                <CustomInput label={`Digite ${CONFIRMATION_WORD} para confirmar`} value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />

                {error && <ErrorText role="alert">{error}</ErrorText>}

                <Actions>
                    <DefaultButtonStyle type="button" onClick={onClose} disabled={deleting}>
                        Cancelar
                    </DefaultButtonStyle>
                    <DefaultButtonStyle type="submit" disabled={!confirmed || deleting}>
                        {deleting ? "Apagando..." : "Apagar tudo"}
                    </DefaultButtonStyle>
                </Actions>
            </Form>
        </Modal>
    );
}

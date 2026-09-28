import { useState, type FormEvent } from "react";
import { DefaultButtonStyle } from "../../components/button/style";
import CustomInput from "../../components/customInput";
import { Frame } from "../../components/frame";
import { changePassword } from "../../services/account";
import { Actions, Failure, Form, Success } from "./style";

const MIN_LENGTH = 8;

export function PasswordForm() {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirmation, setConfirmation] = useState("");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        if (next.length < MIN_LENGTH) {
            setMessage({ ok: false, text: `A nova senha precisa ter pelo menos ${MIN_LENGTH} caracteres` });
            return;
        }
        if (next !== confirmation) {
            setMessage({ ok: false, text: "A confirmação é diferente da nova senha" });
            return;
        }

        setSaving(true);
        setMessage(null);
        try {
            await changePassword(current, next);
            setCurrent("");
            setNext("");
            setConfirmation("");
            setMessage({ ok: true, text: "Senha alterada" });
        } catch (err) {
            setMessage({ ok: false, text: err instanceof Error ? err.message : "Erro inesperado, tente novamente" });
        } finally {
            setSaving(false);
        }
    }

    return (
        <Frame title="Senha">
            <Form onSubmit={handleSubmit}>
                <CustomInput label="Senha atual" type="password" autoComplete="current-password" value={current} onChange={(event) => setCurrent(event.target.value)} />
                <CustomInput label="Nova senha" type="password" autoComplete="new-password" value={next} onChange={(event) => setNext(event.target.value)} />
                <CustomInput label="Confirmar nova senha" type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} />
                <Actions>
                    <DefaultButtonStyle type="submit" disabled={saving || current === "" || next === ""}>
                        {saving ? "Salvando..." : "Alterar senha"}
                    </DefaultButtonStyle>
                    {message && (message.ok ? <Success role="status">{message.text}</Success> : <Failure role="alert">{message.text}</Failure>)}
                </Actions>
            </Form>
        </Frame>
    );
}

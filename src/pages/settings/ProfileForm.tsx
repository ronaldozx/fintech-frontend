import { useState, type FormEvent } from "react";
import { DefaultButtonStyle } from "../../components/button/style";
import CustomInput from "../../components/customInput";
import { Frame } from "../../components/frame";
import { useAuth } from "../../hooks/useAuth";
import { getCurrentUser, updateProfile } from "../../services/account";
import { Actions, Failure, Fields, Form, Success } from "./style";

const parseIncome = (text: string) => {
    if (text.trim() === "") return null;
    const value = Number(text.trim().replace(",", "."));
    return Number.isFinite(value) && value >= 0 ? value : undefined;
};

export function ProfileForm() {
    const { user, login } = useAuth();
    const [fullName, setFullName] = useState(user?.fullName ?? "");
    const [email, setEmail] = useState(user?.email ?? "");
    const [birthDate, setBirthDate] = useState(user?.birthDate ?? "");
    const [income, setIncome] = useState(user?.monthlyIncome === undefined ? "" : String(user.monthlyIncome).replace(".", ","));
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const monthlyIncome = parseIncome(income);
        if (monthlyIncome === undefined) {
            setMessage({ ok: false, text: "A renda mensal deve ser um número igual ou maior que zero" });
            return;
        }

        setSaving(true);
        setMessage(null);
        try {
            await updateProfile({ fullName, email, birthDate: birthDate === "" ? null : birthDate, monthlyIncome });
            login(await getCurrentUser());
            setMessage({ ok: true, text: "Perfil atualizado" });
        } catch (err) {
            setMessage({ ok: false, text: err instanceof Error ? err.message : "Erro inesperado, tente novamente" });
        } finally {
            setSaving(false);
        }
    }

    return (
        <Frame title="Perfil">
            <Form onSubmit={handleSubmit}>
                <Fields $columns={2}>
                    <CustomInput label="Nome" value={fullName} onChange={(event) => setFullName(event.target.value)} maxLength={150} />
                    <CustomInput label="E-mail" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <CustomInput label="Nascimento" type="date" value={birthDate} onChange={(event) => setBirthDate(event.target.value)} />
                    <CustomInput label="Renda mensal (R$)" inputMode="decimal" value={income} onChange={(event) => setIncome(event.target.value)} />
                </Fields>
                <Actions>
                    <DefaultButtonStyle type="submit" disabled={saving}>
                        {saving ? "Salvando..." : "Salvar perfil"}
                    </DefaultButtonStyle>
                    {message && (message.ok ? <Success role="status">{message.text}</Success> : <Failure role="alert">{message.text}</Failure>)}
                </Actions>
            </Form>
        </Frame>
    );
}

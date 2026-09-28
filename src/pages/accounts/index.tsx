import { useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotate, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../../components/button/style";
import { Frame } from "../../components/frame";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { StatTile } from "../../components/statTile";
import { UsageBar } from "../../components/usageBar";
import { ErrorText } from "../../components/bankConnections/style";
import { useAccountsOverview } from "../../hooks/useAccountsOverview";
import { chartColors } from "../../styles/chart";
import { buildAccountAlerts, creditUsed, groupByInstitution, usagePercent } from "../../utils/accounts";
import { formatDate, formatMoney } from "../../utils/format";
import type { AccountItem } from "../../types/Accounts";
import { AccountName, AccountRow, AlertItem, AlertList, Amount, Groups, Message, RowHead, Rows, Stats } from "./style";

function BankAccountRow({ account }: { account: AccountItem }) {
    const limit = account.overdraftLimit ?? 0;
    const used = account.overdraftUsed ?? 0;

    return (
        <AccountRow>
            <RowHead>
                <AccountName>
                    <strong>{account.name}</strong>
                    {account.maskedNumber && <span>{account.maskedNumber}</span>}
                </AccountName>
                <Amount $negative={account.balance < 0}>
                    <strong>{formatMoney(account.balance)}</strong>
                    <span>{account.balance < 0 ? "Saldo negativo" : "Saldo disponível"}</span>
                </Amount>
            </RowHead>
            {limit > 0 && (
                <UsageBar label="Cheque especial" percent={usagePercent(used, limit)} detail={`${formatMoney(used)} de ${formatMoney(limit)}`} />
            )}
        </AccountRow>
    );
}

function CardRow({ account }: { account: AccountItem }) {
    const limit = account.creditLimit ?? 0;

    return (
        <AccountRow>
            <RowHead>
                <AccountName>
                    <strong>{account.name}</strong>
                    {account.maskedNumber && <span>{account.maskedNumber}</span>}
                </AccountName>
                <Amount $negative={false}>
                    <strong>{formatMoney(account.balance)}</strong>
                    <span>{account.dueDate ? `Fatura · vencimento ${formatDate(account.dueDate)}` : "Fatura em aberto"}</span>
                </Amount>
            </RowHead>
            {limit > 0 && (
                <UsageBar label="Limite do cartão" percent={usagePercent(creditUsed(account), limit)} detail={`${formatMoney(creditUsed(account))} de ${formatMoney(limit)}`} />
            )}
        </AccountRow>
    );
}

export function Accounts() {
    const [reloadKey, setReloadKey] = useState(0);
    const { data, loading, error } = useAccountsOverview(reloadKey);

    const accounts = useMemo(() => data?.accounts ?? [], [data]);
    const groups = useMemo(() => groupByInstitution(accounts), [accounts]);
    const alerts = useMemo(() => buildAccountAlerts(accounts), [accounts]);

    const format = (value: number | undefined) => (data && value !== undefined ? formatMoney(value) : "—");

    return (
        <>
            <PageHeader
                title="Contas e cartões"
                subtitle="Saldos e limites atuais, direto dos bancos"
                actions={
                    <DefaultButtonStyle onClick={() => setReloadKey((key) => key + 1)} disabled={loading} title="Buscar os saldos de novo">
                        <FontAwesomeIcon icon={faRotate} /> {loading ? "Atualizando..." : "Atualizar"}
                    </DefaultButtonStyle>
                }
            />

            {error && <ErrorText>{error}</ErrorText>}

            {data && data.unavailableConnections.length > 0 && (
                <ErrorText>Não consegui ler estas conexões agora: {data.unavailableConnections.join(", ")}.</ErrorText>
            )}

            <Stats $stale={loading && data !== null}>
                <StatTile
                    hero
                    label="Posição líquida"
                    value={format(data?.netPosition)}
                    hint="Saldo nas contas menos as faturas em aberto"
                />
                <StatTile label="Saldo nas contas" value={format(data?.bankBalance)} accent={chartColors.income} />
                <StatTile
                    label="Faturas a pagar"
                    value={format(data?.cardBalanceDue)}
                    accent={chartColors.expense}
                    hint={data ? `Gasto no cartão neste mês: ${formatMoney(data.cardSpendingThisMonth)}` : undefined}
                />
            </Stats>

            <Fill>
            {alerts.length > 0 && (
                <Frame title="Atenção" fit>
                    <AlertList>
                        {alerts.map((alert) => (
                            <AlertItem key={alert}>
                                <FontAwesomeIcon icon={faTriangleExclamation} />
                                <span>{alert}</span>
                            </AlertItem>
                        ))}
                    </AlertList>
                </Frame>
            )}

            {data && accounts.length === 0 && (
                <Message>Nenhuma conta encontrada. Conecte um banco na Visão geral pelo botão “Conectar banco”.</Message>
            )}

            <Groups>
                {groups.map((group) => (
                    <Frame key={`${group.accounts[0].connectionId}-${group.institution}`} title={group.institution}>
                        <Rows>
                            {group.accounts.map((account) =>
                                account.type === "CREDIT" ? (
                                    <CardRow key={`${account.name}-${account.maskedNumber}`} account={account} />
                                ) : (
                                    <BankAccountRow key={`${account.name}-${account.maskedNumber}`} account={account} />
                                ),
                            )}
                        </Rows>
                    </Frame>
                ))}
            </Groups>
            </Fill>
        </>
    );
}

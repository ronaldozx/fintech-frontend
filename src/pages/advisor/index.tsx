import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleInfo, faRotate, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { DefaultButtonStyle } from "../../components/button/style";
import { Fill } from "../../components/pageFill/style";
import { PageHeader } from "../../components/pageHeader";
import { ErrorText } from "../../components/bankConnections/style";
import { useAdvice } from "../../hooks/useAdvice";
import { GROUP_TITLE, SEVERITY_TEXT, TYPE_GROUP } from "../../utils/advisor";
import type { AdviceItem, AdviceSeverity } from "../../types/Advisor";
import { Card, CardHead, CardLink, CardList, CardMessage, CardTitle, Column, ColumnTitle, Disclaimer, Empty, Layout, Message } from "./style";

const SEVERITY_ICON: Record<AdviceSeverity, typeof faCircleInfo> = {
    CRITICAL: faCircleExclamation,
    WARNING: faTriangleExclamation,
    INFO: faCircleInfo,
};

const GROUPS: Array<"spending" | "saving" | "investing"> = ["spending", "saving", "investing"];

function AdviceCard({ item }: { item: AdviceItem }) {
    return (
        <Card $severity={item.severity}>
            <CardHead $severity={item.severity}>
                <FontAwesomeIcon icon={SEVERITY_ICON[item.severity]} />
                {SEVERITY_TEXT[item.severity]}
            </CardHead>
            <CardTitle>{item.title}</CardTitle>
            <CardMessage>{item.message}</CardMessage>
            {item.link && <CardLink as={Link} to={item.link}>Ver mais</CardLink>}
        </Card>
    );
}

export function Advisor() {
    const [reloadKey, setReloadKey] = useState(0);
    const { data, loading, error } = useAdvice(reloadKey);

    const byGroup = useMemo(() => {
        const groups: Record<"spending" | "saving" | "investing", AdviceItem[]> = { spending: [], saving: [], investing: [] };
        data?.items.forEach((item) => groups[TYPE_GROUP[item.type]].push(item));
        return groups;
    }, [data]);

    return (
        <>
            <PageHeader
                title="Assistente"
                subtitle="Sugestões geradas por regras a partir dos seus próprios dados"
                actions={
                    <DefaultButtonStyle onClick={() => setReloadKey((key) => key + 1)} disabled={loading} title="Recalcular as sugestões">
                        <FontAwesomeIcon icon={faRotate} /> {loading ? "Atualizando..." : "Atualizar"}
                    </DefaultButtonStyle>
                }
            />

            {error && <ErrorText>{error}</ErrorText>}

            {data && data.items.length === 0 && (
                <Message>Nada para avisar agora. Volte aqui depois de um tempo de uso, ou quando algo mudar nos seus gastos.</Message>
            )}

            <Fill>
                <Layout>
                    {GROUPS.map((group) => (
                        <Column key={group}>
                            <ColumnTitle>{GROUP_TITLE[group]}</ColumnTitle>
                            <CardList>
                                {byGroup[group].length === 0 ? (
                                    <Empty>Nada aqui por enquanto.</Empty>
                                ) : (
                                    byGroup[group].map((item, index) => <AdviceCard key={`${item.type}-${index}`} item={item} />)
                                )}
                            </CardList>
                        </Column>
                    ))}
                </Layout>
            </Fill>

            {data && <Disclaimer>{data.disclaimer}</Disclaimer>}
        </>
    );
}

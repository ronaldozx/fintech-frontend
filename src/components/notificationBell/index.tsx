import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faCircleExclamation, faCircleInfo, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { useNotifications } from "../../hooks/useNotifications";
import { formatRelative } from "../../utils/time";
import type { AppNotification, NotificationSeverity } from "../../types/Notifications";
import { Count, Empty, Item, ItemBody, List, Panel, PanelHeader, TextButton, Trigger, Wrapper } from "./style";

const ICONS = {
    INFO: faCircleInfo,
    WARNING: faTriangleExclamation,
    CRITICAL: faCircleExclamation,
};

const SEVERITY_TEXT: Record<NotificationSeverity, string> = {
    INFO: "Informação",
    WARNING: "Atenção",
    CRITICAL: "Urgente",
};

export function NotificationBell() {
    const navigate = useNavigate();
    const { unread, items, loading, markRead, markAllRead } = useNotifications();
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!open) return;

        function handlePointer(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) setOpen(false);
        }
        function handleKey(event: KeyboardEvent) {
            if (event.key === "Escape") setOpen(false);
        }

        document.addEventListener("mousedown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [open]);

    const hasCritical = items.some((item) => item.severity === "CRITICAL" && !item.read);

    function handleOpen(item: AppNotification) {
        if (!item.read) markRead(item.id);
        setOpen(false);
        if (item.link) navigate(item.link);
    }

    return (
        <Wrapper ref={wrapperRef}>
            <Trigger
                onClick={() => setOpen((current) => !current)}
                aria-label={unread > 0 ? `Avisos: ${unread} não lido(s)` : "Avisos"}
                aria-expanded={open}
                aria-haspopup="dialog"
            >
                <FontAwesomeIcon icon={faBell} />
                {unread > 0 && <Count $critical={hasCritical}>{unread > 9 ? "9+" : unread}</Count>}
            </Trigger>

            {open && (
                <Panel role="dialog" aria-label="Avisos">
                    <PanelHeader>
                        <strong>Avisos</strong>
                        <TextButton onClick={markAllRead} disabled={unread === 0}>
                            Marcar todos como lidos
                        </TextButton>
                    </PanelHeader>

                    {items.length === 0 ? (
                        <Empty>{loading ? "Carregando..." : "Tudo em dia. Você será avisado sobre orçamentos, faturas e sincronizações."}</Empty>
                    ) : (
                        <List>
                            {items.map((item) => (
                                <Item key={item.id} $severity={item.severity} $read={item.read}>
                                    <button onClick={() => handleOpen(item)}>
                                        <FontAwesomeIcon icon={ICONS[item.severity]} title={SEVERITY_TEXT[item.severity]} />
                                        <ItemBody $read={item.read}>
                                            <strong>{item.title}</strong>
                                            <span>{item.message}</span>
                                            <small>
                                                {SEVERITY_TEXT[item.severity]} · {formatRelative(item.createdAt)}
                                                {item.read ? "" : " · não lido"}
                                            </small>
                                        </ItemBody>
                                    </button>
                                </Item>
                            ))}
                        </List>
                    )}
                </Panel>
            )}
        </Wrapper>
    );
}

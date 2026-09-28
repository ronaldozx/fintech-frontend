import { useCallback, useEffect, useState } from "react";
import { markAllNotificationsRead, markNotificationRead, refreshNotifications } from "../services/notifications";
import type { NotificationsState } from "../types/Notifications";

const REFRESH_INTERVAL_MS = 5 * 60 * 1000;

export function useNotifications() {
    const [state, setState] = useState<NotificationsState>({ unread: 0, items: [] });
    const [loading, setLoading] = useState(true);

    const refresh = useCallback(async () => {
        try {
            setState(await refreshNotifications());
        } catch {
            setState((current) => current);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        let active = true;

        refreshNotifications()
            .then((next) => {
                if (active) setState(next);
            })
            .catch(() => undefined)
            .finally(() => {
                if (active) setLoading(false);
            });

        const timer = window.setInterval(() => {
            if (document.visibilityState === "visible") refresh();
        }, REFRESH_INTERVAL_MS);

        return () => {
            active = false;
            window.clearInterval(timer);
        };
    }, [refresh]);

    const markRead = useCallback(async (id: number) => {
        try {
            setState(await markNotificationRead(id));
        } catch {
            setState((current) => current);
        }
    }, []);

    const markAllRead = useCallback(async () => {
        try {
            setState(await markAllNotificationsRead());
        } catch {
            setState((current) => current);
        }
    }, []);

    return { ...state, loading, refresh, markRead, markAllRead };
}

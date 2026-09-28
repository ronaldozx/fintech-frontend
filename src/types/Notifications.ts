export type NotificationSeverity = "INFO" | "WARNING" | "CRITICAL";

export type AppNotification = {
    id: number;
    type: string;
    severity: NotificationSeverity;
    title: string;
    message: string;
    link: string | null;
    read: boolean;
    createdAt: string;
};

export type NotificationsState = {
    unread: number;
    items: AppNotification[];
};

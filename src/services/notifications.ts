import apiClient from "./apiClient";
import type { NotificationsState } from "../types/Notifications";

export const refreshNotifications = async () => {
    const response = await apiClient.post<NotificationsState>("/notifications/refresh");
    return response.data;
};

export const markNotificationRead = async (id: number) => {
    const response = await apiClient.post<NotificationsState>(`/notifications/${id}/read`);
    return response.data;
};

export const markAllNotificationsRead = async () => {
    const response = await apiClient.post<NotificationsState>("/notifications/read-all");
    return response.data;
};

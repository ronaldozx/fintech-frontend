import apiClient from "./apiClient";
import type { User } from "../types/Auth";

export type ProfileInput = {
    email: string;
    fullName: string;
    birthDate: string | null;
    monthlyIncome: number | null;
};

export type DeleteAccountResult = {
    connectionsRemoved: number;
    providerItemsNotRemoved: number;
};

export const getCurrentUser = async () => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
};

export const updateProfile = async (input: ProfileInput) => {
    await apiClient.put("/auth/update", input);
};

export const changePassword = async (currentPassword: string, newPassword: string) => {
    await apiClient.post("/auth/change-password", { currentPassword, newPassword });
};

export const downloadMyData = async () => {
    const response = await apiClient.get<Blob>("/account/export", { responseType: "blob" });

    const url = URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "meus-dados.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

export const deleteAccount = async (password: string) => {
    const response = await apiClient.delete<DeleteAccountResult>("/account", { data: { password } });
    return response.data;
};

import axios from "axios";
import apiClient from "./apiClient";

export const importOfx = async (file: File, userId: number) => {
    try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await apiClient.post(`/transaction/import/ofx/${userId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "bearer": localStorage.getItem("token") || "",
            },
        });

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(error.response?.data);
        }
        throw new Error("Erro ao importar extrato");
    }
};

export const getAllTransactions = (id : number) => {
    const data = apiClient.get(`/transaction/user/${id}`).then(res => res.data);
    return data;
}

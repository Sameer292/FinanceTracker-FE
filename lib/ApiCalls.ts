import apiClient from "./api";

export const getCategories = async () => {
    const res = await apiClient.get("/categories");
    return res.data;
};

export const getTransactions = async () => {
    const res = await apiClient.get("/transactions");
    return res.data;
};
import apiClient from "./api";

export const getCategories = async () => {
	const res = await apiClient.get("/categories");
	return res.data;
};

export const getTransactions = async () => {
	const res = await apiClient.get("/transactions");
	return res.data;
};

export const getTransactionsByCategory = async (categoryId: number) => {
	const res = await apiClient.get(`/category/${categoryId}/transactions`);
	return res.data;
};

export const getCategoryById = async (categoryId: number) => {
	const res = await apiClient.get(`/category/${categoryId}`);
	return res.data;
};

export const getRecentTransactions = async () => {
	const res = await apiClient.get("/transactions/recent");
	return res.data;
};

export const addCategory = async (data: createCategory) => {
	const res = await apiClient.post("/categories", data);
	return res.data;
};

export const changePassword = async (data: changePassword) => {
	const res = await apiClient.put<{ message: string; accessToken: string }>(
		"/change-password",
		data,
	);
	return res.data;
};

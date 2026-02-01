import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const apiClient = axios.create({
	baseURL: process.env.EXPO_PUBLIC_API_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
	},
});

// Request interceptor
apiClient.interceptors.request.use(
	async (config) => {
		const token = await AsyncStorage.getItem("accessToken");
		if (token && config.url !== "/login" && config.url !== "/register") {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

export default apiClient;

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { toast } from "sonner-native";
import apiClient from "app/lib/api";
import { isAxiosError } from "axios";

type AuthContextType = {
	authStatus: "loading" | "authenticated" | "unauthenticated";
	user?: User;
	login: (data: LoginInput) => void;
	logout: () => void;
	register: (data: RegisterInput) => void;
	isLoading: boolean;
	isLoginError: boolean;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [authStatus, setAuthStatus] =
		useState<AuthContextType["authStatus"]>("loading");

	const [tokenExists, setTokenExists] = useState<boolean | null>(null);

	const { data: user, isFetching } = useQuery({
		queryKey: ["me"],
		queryFn: async () => {
			const res = await apiClient.get<User>("/me");
			return res.data;
		},
		enabled: tokenExists === true,
		retry: false,
	});

	const loginMutation = useMutation({
		mutationFn: async (data: LoginInput) => {
			const res = await apiClient.post("/login", data);
			return res.data;
		},
		onSuccess: async (data) => {
			await AsyncStorage.setItem("accessToken", data.access_token);
			setTokenExists(true);
			queryClient.invalidateQueries({ queryKey: ["me"] });
		},
		onError: (err) => {
			toast.error("Failed logging in", {
				description: isAxiosError(err)
					? err.response?.data.detail || err.message
					: "Something went wrong",
				richColors: true,
			});
		},
	});

	const registerMutation = useMutation({
		mutationFn: (data: RegisterInput) => apiClient.post("/register", data),
		onSuccess: (res) => {
			toast.success("Signup successful", {
				description: res.data.message,
				richColors: true,
			});
			router.push("/login");
		},
		onError: (err) => {
			toast.error("Signup failed", {
				description: isAxiosError(err)
					? err.response?.data.detail
					: "Something went wrong",
				richColors: true,
			});
		},
	});

	const logout = async () => {
		await AsyncStorage.removeItem("accessToken");
		setAuthStatus("unauthenticated");
	};

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem("accessToken");
			setTokenExists(!!token);
			setAuthStatus(token ? "loading" : "unauthenticated");
		};

		checkToken();
	}, []);

	useEffect(() => {
		if (tokenExists === false) {
			setAuthStatus("unauthenticated");
			return;
		}

		if (tokenExists === true && user === undefined && isFetching) {
			setAuthStatus("loading");
			return;
		}
		setAuthStatus(user ? "authenticated" : "unauthenticated");
	}, [tokenExists, isFetching, user]);

	return (
		<AuthContext.Provider
			value={{
				authStatus,
				user,
				login: loginMutation.mutate,
				logout,
				register: registerMutation.mutate,
				isLoading: loginMutation.isPending,
				isLoginError: loginMutation.isError,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

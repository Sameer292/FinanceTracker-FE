import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { SecureTextField } from "app/components/SecureTextField";
import { changePassword } from "app/lib/ApiCalls";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import Icon from "react-native-remix-icon";
import { toast } from "sonner-native";
import { object, string, type infer as Zinfer } from "zod";

const ChangePassword = () => {
	const client = useQueryClient();

	const changePasswordMutation = useMutation({
		mutationFn: changePassword,
		onSuccess: async (data) => {
			if (!data || !data.accessToken) {
				toast.error("Failed changing password.", {
					description: "Something went wrong",
					richColors: true,
				});
				return;
			}
			await AsyncStorage.removeItem("accessToken");
			await AsyncStorage.setItem("accessToken", data.accessToken);
			client.invalidateQueries({ queryKey: ["me"] });
			toast.success("Password changed successfully", {
				richColors: true,
			});
			router.back();
		},
		onError: (err) => {
			toast.error("Failed logging in", {
				description: isAxiosError(err)
					? err.response?.data.detail
					: "Something went wrong",
				richColors: true,
			});
		},
	});

	const ChangePasswordSchema = object({
		current_Password: string({
			error: "Please enter your current password",
		}).min(1, { error: "Please enter your current password" }),
		new_Password: string({ error: "Please enter your new password" }).min(8, {
			error: "Password must be at least 8 characters long",
		}),
		confirm_new_Password: string({
			error: "Please enter your new password",
		}).min(8, { error: "Password must be at least 8 characters long" }),
	}).refine((data) => data.new_Password === data.confirm_new_Password, {
		message: "Passwords do not match",
		path: ["confirm_new_Password"],
	});
	type ChangePasswordSchemaType = Zinfer<typeof ChangePasswordSchema>;
	const methods = useForm<ChangePasswordSchemaType>({
		defaultValues: {
			current_Password: "",
			new_Password: "",
			confirm_new_Password: "",
		},
		mode: "onSubmit",
		resolver: zodResolver(ChangePasswordSchema),
	});

	const onSubmit = async (data: ChangePasswordSchemaType) => {
		const { confirm_new_Password, ...properData } = data;
		changePasswordMutation.mutate({
			current_password: properData.current_Password,
			new_password: properData.new_Password,
		});
	};

	return (
		<View className="flex-1 pt-5 px-4 bg-white">
			<View className="flex-row items-center gap-2 mb-5">
				<Pressable onPress={() => router.back()}>
					<Icon name="arrow-left-s-line" size={32} color="#444" />
				</Pressable>
				<Text className="text-xl font-nunito-bold">Change Password</Text>
			</View>
			<View className="flex-1 items-center gap-8">
				<View className="w-full flex-1 pb-6 justify-between">
					<View className="flex-1 w-full gap-4">
						<View className="w-full gap-2">
							<Controller
								control={methods.control}
								name="current_Password"
								render={({ field: { onChange, onBlur, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											Current Password
										</Text>
										<SecureTextField
											error={!!methods.formState.errors.current_Password}
											value={value}
											onBlur={onBlur}
											placeholder="Enter your current password"
											onChangeText={onChange}
										/>
									</View>
								)}
							/>
							{methods.formState.errors.current_Password && (
								<Text className="text-[#EF476F]">
									{methods.formState.errors.current_Password.message}
								</Text>
							)}
						</View>
						<View className="w-full gap-2">
							<Controller
								control={methods.control}
								name="new_Password"
								render={({ field: { onChange, onBlur, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											New password
										</Text>
										<SecureTextField
											error={!!methods.formState.errors.new_Password}
											value={value}
											placeholder="Enter your new password"
											onBlur={onBlur}
											onChangeText={onChange}
										/>
									</View>
								)}
							/>
							{methods.formState.errors.new_Password && (
								<Text className="text-[#EF476F]">
									{methods.formState.errors.new_Password.message}
								</Text>
							)}
						</View>
						<View className="w-full gap-2">
							<Controller
								control={methods.control}
								name="confirm_new_Password"
								render={({ field: { onChange, onBlur, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											Confirm New password
										</Text>
										<SecureTextField
											error={!!methods.formState.errors.confirm_new_Password}
											value={value}
											placeholder="Re-enter your new password"
											onBlur={onBlur}
											onChangeText={onChange}
										/>
									</View>
								)}
							/>
							{methods.formState.errors.confirm_new_Password && (
								<Text className="text-[#EF476F]">
									{methods.formState.errors.confirm_new_Password.message}
								</Text>
							)}
						</View>
					</View>
					<View className="gap-3 ">
						<Pressable
							disabled={changePasswordMutation.isPending}
							className="bg-[#07D19D] py-4 rounded-xl items-center"
							onPress={methods.handleSubmit(onSubmit)}
						>
							{changePasswordMutation.isPending ? (
								<ActivityIndicator color="white" />
							) : (
								<Text className="text-lg text-white font-nunito-bold">
									Save Changes
								</Text>
							)}
						</Pressable>
						<Pressable
							onPress={() => router.back()}
							className="border border-[#118AB2] py-4 rounded-xl items-center"
						>
							<Text className="text-[#118AB2] text-lg font-nunito-semibold">
								Cancel
							</Text>
						</Pressable>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ChangePassword;

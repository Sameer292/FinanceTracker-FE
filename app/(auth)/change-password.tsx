import { zodResolver } from "@hookform/resolvers/zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { changePassword } from "app/lib/ApiCalls";
import { isAxiosError } from "axios";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	ActivityIndicator,
	Pressable,
	Text,
	TouchableHighlight,
	View,
} from "react-native";
import Icon from "react-native-remix-icon";
import { toast } from "sonner-native";
import { object, string, type infer as Zinfer } from "zod";
import { PasswordInput } from "app/components/PasswordInput";

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
								render={({ field: { onChange, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											Current Password
										</Text>
										<PasswordInput
											error={methods.formState.errors.current_Password?.message}
											onChangeText={onChange}
											value={value}
											placeholder="Enter your current password"
										/>
									</View>
								)}
							/>
						</View>
						<View className="w-full gap-2">
							<Controller
								control={methods.control}
								name="new_Password"
								render={({ field: { onChange, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											New password
										</Text>
										<PasswordInput
											error={methods.formState.errors.new_Password?.message}
											onChangeText={onChange}
											value={value}
											placeholder="Enter your new password"
										/>
									</View>
								)}
							/>
						</View>
						<View className="w-full gap-2">
							<Controller
								control={methods.control}
								name="confirm_new_Password"
								render={({ field: { onChange, value } }) => (
									<View className="justify-center gap-2">
										<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
											Confirm New password
										</Text>
										<PasswordInput
											error={
												methods.formState.errors.confirm_new_Password?.message
											}
											onChangeText={onChange}
											value={value}
											placeholder="Reenter your new password"
										/>
									</View>
								)}
							/>
						</View>
					</View>
					<View className="gap-3 ">
						<TouchableHighlight
							underlayColor={"#04bf8f"}
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
						</TouchableHighlight>
						<TouchableHighlight
							underlayColor={"#e6e3e6"}
							onPress={() => router.back()}
							className="border border-[#118AB2] py-4 rounded-xl items-center"
						>
							<Text className="text-[#118AB2] text-lg font-nunito-semibold">
								Cancel
							</Text>
						</TouchableHighlight>
					</View>
				</View>
			</View>
		</View>
	);
};

export default ChangePassword;

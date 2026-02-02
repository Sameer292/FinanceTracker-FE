import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "app/context/AuthContext";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	View,
	Text,
	Pressable,
	Image,
	TouchableHighlight,
	TouchableWithoutFeedback,
	ActivityIndicator,
} from "react-native";
import Icon from "react-native-remix-icon";
import {
	object as Zobject,
	string as Zstring,
	email as Zemail,
	type infer as Zinfer,
} from "zod";
import { BottomSheetEditProfile } from "app/components/EditProfileImagePickerBottomSheet";
import { Keyboard } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "app/lib/api";
import { toast } from "sonner-native";
import { isAxiosError } from "axios";
import { TextField } from "heroui-native";
import clsx from "clsx";

export default function EditProfile() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const editProfileSchema = Zobject({
		name: Zstring({ error: "Please enter your name" }).min(3, {
			error: "Name must be at least 3 characters long",
		}),
		email: Zemail({ error: "Please enter a valid email address" }),
	});
	type editProfileForm = Zinfer<typeof editProfileSchema>;
	const {
		handleSubmit,
		formState: { errors },
		...methods
	} = useForm<editProfileForm>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
		mode: "onChange",
		reValidateMode: "onChange",
		resolver: zodResolver(editProfileSchema),
	});

	const { mutate, isPending } = useMutation<
		{ user_id: number; message: string },
		Error,
		editProfileForm
	>({
		mutationFn: async (data) => {
			const res = await apiClient.patch<{ user_id: number; message: string }>(
				"/update-profile",
				data,
			);
			return res.data;
		},
		onSuccess(data) {
			queryClient.invalidateQueries({ queryKey: ["me"] });
			toast.success(data.message || "Profile updated successfully", {
				richColors: true,
			});
		},
		onError(error) {
			if (isAxiosError(error)) {
				toast.error(error.response?.data.detail || "Failed updating profile", {
					richColors: true,
				});
				if (error.response?.data.detail.includes("email")) {
					methods.setError("email", {
						type: "manual",
						message: error.response?.data.detail,
					});
				}
				return;
			}
			toast.error("Failed updating profile", {
				richColors: true,
			});
		},
	});

	return (
		<TouchableWithoutFeedback
			style={{ flex: 1 }}
			onPress={() => Keyboard.dismiss()}
		>
			<View className="flex-1 pt-5 px-4 bg-white">
				<View className="flex-row items-center gap-2 mb-10">
					<Pressable onPress={() => router.back()}>
						<Icon name="arrow-left-s-line" size={32} color="#444" />
					</Pressable>
					<Text className="text-xl font-nunito-bold">Edit Profile</Text>
				</View>
				<View className="flex-1 items-center gap-8">
					<View
						style={{ borderRadius: "100%" }}
						className="relative rounded-full items-center justify-center size-32"
					>
						<Image
							source={require("app/assets/IMG_2110.jpg")}
							style={{borderColor:'#D9E3E8'}}
							className="rounded-full size-31 border-2 border-[#D9E3E8]"
						/>
						<View className="absolute -bottom-3 bg-white rounded-full border-[#D9E3E8] border">
							<BottomSheetEditProfile />
						</View>
					</View>
					<View className="w-full flex-1 pb-6 justify-between">
						<View className="flex-1 w-full gap-4">
							<Controller
								control={methods.control}
								name="name"
								render={({ field }) => (
									<View className="justify-center gap-2">
										<TextField isRequired isInvalid={!!errors.name}>
											<TextField.Label className="text-lg text-[#1E1E1E] font-nunito-medium">
												Name
											</TextField.Label>
											<TextField.Input
												{...field}
												onChangeText={field.onChange}
												className={clsx(
													"text-lg font-nunito-regular px-4 rounded-xl text-[#37474F] focus:border-2",
													errors.name
														? "border-2 border-red-500"
														: "border border-[D4DEE3]",
												)}
												placeholder="Enter your name"
											/>
											<TextField.ErrorMessage>
												<Text className="text-red-500">
													{errors?.name?.message}
												</Text>
											</TextField.ErrorMessage>
										</TextField>
									</View>
								)}
							/>
							<Controller
								control={methods.control}
								name="email"
								render={({ field }) => (
									<View className="justify-center gap-2">
										<TextField isRequired isInvalid={!!errors.email}>
											<TextField.Label className="text-lg text-[#1E1E1E] font-nunito-medium">
												Email
											</TextField.Label>
											<TextField.Input
												{...field}
												onChangeText={field.onChange}
												className={clsx(
													"text-lg font-nunito-regular px-4 rounded-xl text-[#37474F] focus:border-2",
													errors.email
														? "border-2 border-red-500"
														: "border border-[D4DEE3]",
												)}
												placeholder="Enter your email"
											/>
											<TextField.ErrorMessage>
												<Text className="text-red-500">
													{errors?.email?.message}
												</Text>
											</TextField.ErrorMessage>
										</TextField>
									</View>
								)}
							/>
						</View>
						<View className="gap-3 ">
							<TouchableHighlight
								disabled={isPending}
								underlayColor={"#04bf8f"}
								className={`py-4 rounded-xl items-center ${
									isPending ? "bg-[#035440]" : "bg-[#07D19D]"
								}`}
								onPress={handleSubmit((data) => {
									mutate(data);
								})}
							>
								{isPending ? (
									<ActivityIndicator size="small" color="white" />
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
		</TouchableWithoutFeedback>
	);
}

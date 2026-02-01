import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "app/context/AuthContext";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import {
	View,
	Text,
	Pressable,
	Image,
	TextInput,
	TouchableHighlight,
} from "react-native";
import Icon from "react-native-remix-icon";
import {
	object as Zobject,
	string as Zstring,
	email as Zemail,
	type infer as Zinfer,
} from "zod";
import { BottomSheetEditProfile } from "app/components/EditProfileImagePickerBottomSheet";
export default function EditProfile() {
	const { user } = useAuth();
	const editProfileSchema = Zobject({
		name: Zstring({ error: "Please enter your name" }).min(3, {
			error: "Name must be at least 3 characters long",
		}),
		email: Zemail({ error: "Please enter a valid email address" }),
	});
	type editProfileForm = Zinfer<typeof editProfileSchema>;
	const { handleSubmit, ...methods } = useForm<editProfileForm>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
		mode: "onSubmit",
		resolver: zodResolver(editProfileSchema),
	});

	const onSubmit = async (data: editProfileForm) => {
		console.log(data);
	};

	return (
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
					className="relative rounded-full border-2 border-[#D9E3E8] items-center justify-center size-32"
				>
					<Image
						source={require("app/assets/IMG_2110.jpg")}
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
							render={({ field: { onChange, onBlur, value } }) => (
								<View className="justify-center gap-2">
									<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
										Name
									</Text>
									<TextInput
										value={value}
										onBlur={onBlur}
										onChangeText={onChange}
										className="text-lg font-nunito-regular px-4 border border-[#D4DEE3] text-[#37474F] rounded-xl"
									/>
								</View>
							)}
						/>
						<Controller
							control={methods.control}
							name="email"
							render={({ field: { onChange, onBlur, value } }) => (
								<View className="justify-center gap-2">
									<Text className="text-lg text-[#1E1E1E] font-nunito-medium">
										Email
									</Text>
									<TextInput
										value={value}
										onBlur={onBlur}
										onChangeText={onChange}
										className="text-lg font-nunito-regular px-4 border border-[#D4DEE3] text-[#37474F] rounded-xl"
									/>
								</View>
							)}
						/>
					</View>
					<View className="gap-3 ">
						<TouchableHighlight
							underlayColor={"#04bf8f"}
							className="bg-[#07D19D] py-4 rounded-xl items-center"
							onPress={handleSubmit(onSubmit)}
						>
							<Text className="text-lg text-white font-nunito-bold">
								Save Changes
							</Text>
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
}

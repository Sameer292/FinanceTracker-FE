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
import { BottomSheet } from "heroui-native";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { toast } from "sonner-native";
import { useState } from "react";
export default function EditProfile() {
	const { user } = useAuth();
	const editProfileSchema = Zobject({
		name: Zstring({ error: "Please enter your name" }).min(3, {
			error: "Name must be at least 3 characters long",
		}),
		email: Zemail({ error: "Please enter a valid email address" }),
	});
	type editProfileForm = Zinfer<typeof editProfileSchema>;
	const methods = useForm<editProfileForm>({
		defaultValues: {
			name: user?.name,
			email: user?.email,
		},
		mode: "onSubmit",
		resolver: zodResolver(editProfileSchema),
	});

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
						<Pressable className="bg-[#07D19D] py-4 rounded-xl items-center">
							<Text className="text-lg text-white font-nunito-bold">
								Save Changes
							</Text>
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
}
const BottomSheetEditProfile = () => {
	const [pickedImage, setPickedImage] = useState<string | null>(null);
	const handleImagePicker = async () => {
		console.log("PICK");
		const permissionResult = await requestMediaLibraryPermissionsAsync();
		if (!permissionResult.granted) {
			toast.error("Permission required");
			return;
		}
		const result = await launchImageLibraryAsync({
			mediaTypes: ["images"],
			aspect: [4, 3],
			quality: 1,
		});
		if (!result.canceled) {
			setPickedImage(result.assets[0].uri);
		}
	};
	return (
		<BottomSheet>
			<BottomSheet.Trigger asChild>
				<Pressable
					onPress={() => setPickedImage(null)}
					className="p-2 rounded-full"
				>
					<Icon name="edit-line" size={15} color="#06D6A0" />
				</Pressable>
			</BottomSheet.Trigger>
			<BottomSheet.Portal>
				<BottomSheet.Overlay className="bg-[#0000004D]" />
				<BottomSheet.Content
					snapPoints={["65%"]}
					enableDynamicSizing={false}
					backgroundClassName="rounded-t-3xl"
					contentContainerClassName="h-full"
				>
					<View className="flex-1 px-6 pb-6 pt-4 justify-between">
						<BottomSheet.Title className="text-xl font-nunito-bold text-left">
							Update Profile Picture
						</BottomSheet.Title>

						{/* Image in the middle */}
						<View className="items-center justify-center">
							<View className="border-2 border-[#D9E3E8] items-center justify-center size-56 rounded-full">
								{!pickedImage ? (
									<Image
										source={require("app/assets/IMG_2110.jpg")}
										className="rounded-full size-55"
									/>
								) : (
									<Image
										source={{ uri: pickedImage }}
										className="rounded-full size-55"
									/>
								)}
							</View>
						</View>

						{/* Buttons at the bottom */}
						<View className="gap-3 ">
							<TouchableHighlight
								onPress={handleImagePicker}
								underlayColor={"#04bf8f"}
								className="bg-[#07D19D] py-4 rounded-xl items-center"
							>
								<Text className="text-lg text-white font-nunito-bold">
									Choose from Gallery
								</Text>
							</TouchableHighlight>
							<BottomSheet.Close asChild>
								<TouchableHighlight
									underlayColor={"#e6e3e6"}
									className="border border-[#118AB2] py-4 rounded-xl items-center"
								>
									<Text className="text-[#118AB2] text-lg font-nunito-semibold">
										Cancel
									</Text>
								</TouchableHighlight>
							</BottomSheet.Close>
						</View>
					</View>
				</BottomSheet.Content>
			</BottomSheet.Portal>
		</BottomSheet>
	);
};

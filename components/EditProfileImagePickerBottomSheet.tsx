import { BottomSheet } from "heroui-native";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync  } from "expo-image-picker";
import { Pressable, View, TouchableHighlight, Image, Text } from "react-native";
import { toast } from "sonner-native";
import { useState } from "react";
import Icon from "react-native-remix-icon";

export const BottomSheetEditProfile = () => {
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

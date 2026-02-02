import { useAuth } from "app/context/AuthContext";
import { type Href, router } from "expo-router";
import { Divider } from "heroui-native";
import { Image, Text, TouchableHighlight, View } from "react-native";
import Icon, { type IconName } from "react-native-remix-icon";

export default function profile() {
	const { user: me, logout } = useAuth();
	return (
		<View className="flex h-full justify-center pt-5 gap-12 px-4 items-center bg-white">
			{/* Header */}
			<View className="flex relative justify-center w-full px-4 items-center">
				<Text className="text-2xl font-nunito-bold">Profile</Text>
			</View>
			{/* Body */}
			<View className="flex-1 w-full gap-12 items-center ">
				<View className="w-full gap-4 items-center">
					<View className="justify-center items-center size-32 rounded-full">
						<Image
							source={require("../../assets/IMG_2110.jpg")}
							className="rounded-full size-30"
						/>
					</View>
					<View className="w-full items-center">
						<Text className="text-3xl font-nunito-semibold">{me?.name}</Text>
						<Text className="text-[#8395A7] text-lg font-nunito-regular">
							{me?.email}
						</Text>
					</View>
				</View>
				<View className="w-full gap-8">
					<View className="w-full gap-4">
						<ProfileOptionCard
							linkRef={"/editProfile"}
							text="Edit Profile"
							icon="user-fill"
						/>
						<ProfileOptionCard
							linkRef={"/change-password"}
							text="Change Password"
							icon="lock-password-fill"
						/>
						<ProfileOptionCard
							linkRef={"/currency"}
							text="Currency"
							icon="currency-fill"
						/>
					</View>
					<Divider
						orientation="horizontal"
						variant="thin"
						className="border-[#D9E3E8] border-t"
					/>
					<TouchableHighlight
						underlayColor={'#e8dada'}
						onPress={logout}
						className="h-14 w-full rounded-xl bg-[#FDEEEE] justify-center items-center"
					>
						<Text className="text-xl font-semibold text-[#D9534F]">Logout</Text>
					</TouchableHighlight>
				</View>
			</View>
		</View>
	);
}

const ProfileOptionCard = ({
	text,
	icon,
	linkRef,
}: {
	text: string;
	icon: IconName;
	linkRef: Href;
}) => {
	return (
		<TouchableHighlight
			onPress={() => router.push(linkRef)}
			underlayColor={"#e6e3e6"}
			className="h-20 w-full rounded-xl border-[#D9E3E8] border"
		>
			<View className="flex-1 flex-row justify-between items-center px-4">
				<View className="flex-row items-center gap-5">
					<View className="rounded-full p-3 bg-[#06D6A0]">
						<Icon name={icon} color={"white"} size={25} />
					</View>
					<Text className="text-[#37474F] font-nunito-bold text-lg">
						{text}
					</Text>
				</View>
				<View>
					<Icon name={"arrow-right-s-line"} size={30} />
				</View>
			</View>
		</TouchableHighlight>
	);
};

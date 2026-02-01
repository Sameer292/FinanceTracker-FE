import { Text, View } from "react-native";
import { BottomSheet } from "heroui-native";
import { HomeIcon } from "app/assets/SVGIcons/SVGIconsCustom";
import { TouchableHighlight } from "react-native";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
	const router = useRouter();
	const handleStartedPress = () => {
		router.replace("/login");
	};
	return (
		<View className={"bg-linear-to-b flex-1 from-[#FFF] to-[#06D6A0]"}>
			<BottomSheet isOpen={true} isDefaultOpen={true}>
				<BottomSheet.Portal>
					<BottomSheet.Content
						snapPoints={["45%"]}
						contentContainerClassName="h-full p-8 pb-18"
						enableDynamicSizing={false}
						backgroundClassName="rounded-t-4xl"
						handleIndicatorClassName="hidden"
						enablePanDownToClose={false}
						animateOnMount
						animationConfigs={{
							duration: 200,
						}}
					>
						<View className={"flex-1 justify-between "}>
							<View className="justify-center gap-8 items-center">
								<HomeIcon />
								<View className="gap-2 w-full jestify-center items-center">
									<Text className="text-[#073B4C] font-nunito-bold text-4xl">
										Expensia
									</Text>
									<Text className="font-nunito-regular text-[#8395A7]">
										Track. Save. Grow
									</Text>
								</View>
							</View>
							<TouchableHighlight
								underlayColor="#04bf8f"
								onPress={handleStartedPress}
								className="h-12 justify-center items-center bg-[#06D6A0] text-white font-nunito-bold rounded-lg"
							>
								<Text className="text-white font-nunito-bold font-medium">
									Get Started
								</Text>
							</TouchableHighlight>
						</View>
					</BottomSheet.Content>
				</BottomSheet.Portal>
			</BottomSheet>
		</View>
	);
}

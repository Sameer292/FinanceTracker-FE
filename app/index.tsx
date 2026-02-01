import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { useAuth } from "app/context/AuthContext";

export default function Index() {
	const { authStatus } = useAuth();

	if (authStatus === "loading") {
		return (
			<View className="flex-1 justify-center items-center">
				<ActivityIndicator size="large" />
			</View>
		);
	}

	if (authStatus === "unauthenticated") {
		return <Redirect href="/onboarding" />;
	}

	return <Redirect href="/(tabs)/dashboard" />;
}

import { useAuth } from "app/context/AuthContext";
import { Redirect } from "expo-router";
import { View, ActivityIndicator } from "react-native";

export default function Index() {

  const { authStatus } = useAuth()

  if (authStatus === "loading") {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" />
      </View>
    )
  }

  if (authStatus === "unauthenticated") {
    return <Redirect href="/login" />
  }

  return <Redirect href="/(tabs)/dashboard" />;
}

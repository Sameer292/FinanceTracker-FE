import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css"
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen 
          name='addTransactions'
          options={{
            animation:'slide_from_right',
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

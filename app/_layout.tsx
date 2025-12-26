import { Stack } from "expo-router";
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import "./globals.css";
import { AuthProvider, useAuth } from "app/context/AuthContext";
import { ActivityIndicator } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts, Nunito_700Bold, Nunito_400Regular, Nunito_600SemiBold, Nunito_500Medium } from '@expo-google-fonts/nunito'
import 'react-native-reanimated';

const queryClient = new QueryClient()
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_700Bold,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_500Medium
  })
  if (!loaded && !error) {
    return null;
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GestureHandlerRootView>
          <SafeAreaProvider >
            <HeroUINativeProvider>
              <Stacks />
              <Toaster />
            </HeroUINativeProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const Stacks = () => {
  const { authStatus } = useAuth();

  if (authStatus === "loading") {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top']}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={authStatus==='unauthenticated'} >
          <Stack.Screen name='login' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='signup' options={{ animation: 'slide_from_right' }} />
        </Stack.Protected>
        <Stack.Protected guard={authStatus==='authenticated'}>
          <Stack.Screen name='(tabs)' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='categories' options={{ animation: 'fade_from_bottom' }} />
          <Stack.Screen name='byCategories/[id]' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='addTransactions' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='addCategories' options={{ animation: 'slide_from_right' }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
};

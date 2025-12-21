import { router, Stack } from "expo-router";
import { HeroUINativeProvider } from 'heroui-native';
import { useEffect } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Toaster } from 'sonner-native';
import "./globals.css";
import { AuthProvider, useAuth } from "app/context/AuthContext";
import { ActivityIndicator } from "react-native";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export default function RootLayout() {
  const queryClient = new QueryClient()
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8F6' }} edges={['top']}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={authStatus==='unauthenticated'} >
          <Stack.Screen name='login' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='signup' options={{ animation: 'slide_from_right' }} />
        </Stack.Protected>
        <Stack.Protected guard={authStatus==='authenticated'}>
          <Stack.Screen name='(tabs)' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='categories' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='byCategories/[id]' options={{ animation: 'slide_from_right' }} />
          <Stack.Screen name='addTransactions' options={{ animation: 'slide_from_right' }} />
        </Stack.Protected>
      </Stack>
    </SafeAreaView>
  );
};

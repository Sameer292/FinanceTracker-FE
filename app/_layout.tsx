import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "./globals.css"
import { HeroUINativeProvider } from 'heroui-native';

import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function RootLayout() {
  return (
    <GestureHandlerRootView >
      <SafeAreaProvider>
        <HeroUINativeProvider>
          <Stacks />
        </HeroUINativeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const Stacks = () => {
  return (
    <Stack screenOptions={{ headerShown: false }} >
      <Stack.Screen name='(tabs)' />
      <Stack.Screen
        name='addTransactions'
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack>
  )
}
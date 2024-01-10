import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "react-native";
import { useFonts } from "expo-font";

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import {
  Amiri_400Regular,
  Amiri_700Bold,
} from "@expo-google-fonts/amiri";
import { colors } from "@/styles/index.cjs";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Header } from "@/components/header";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 3 } },
});

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const useInitFonts = () => {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Amiri_400Regular,
    Amiri_700Bold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return loaded;
};

function Layout() {
  const isFontsLoaded = useInitFonts();

  if (!isFontsLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="surah/[number]"
          options={{
            animation: "slide_from_right",
          }}
        />
        <Stack.Screen
          name="translations"
          options={{
            headerShown: true,
            header: () => <Header title="Translations" />,
            animation: "slide_from_right",
          }}
        />
      </Stack>
      <StatusBar
        translucent={false}
        backgroundColor={colors.background}
        barStyle="light-content"
      />
    </QueryClientProvider>
  );
}

export default Layout;

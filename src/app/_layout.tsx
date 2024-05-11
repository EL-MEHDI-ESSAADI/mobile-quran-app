import React, { useEffect } from "react";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
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
import { RootSiblingParent } from "react-native-root-siblings";
import { Header } from "@/components/header";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStore } from "@/store";

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

const useLoadFontAndStorage = () => {
  const [isFontLoaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
    Amiri_400Regular,
    Amiri_700Bold,
  });
  const hasHydrated = useStore((state) => state._hasHydrated);

  const isLoaded = isFontLoaded && hasHydrated;

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (isLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [isLoaded]);

  return isLoaded;
};

const RootLayout = () => {
  const { isLight, colorScheme, setColorScheme } =
    useColorScheme();
  const persistedTheme = useStore(
    (state) => state.persistedTheme
  );

  useEffect(() => {
    if (persistedTheme !== colorScheme) {
      setColorScheme(persistedTheme);
    }
  }, []);

  return (
    <RootSiblingParent>
      <QueryClientProvider client={queryClient}>
        <SafeAreaProvider>
          <SafeAreaView className="flex-1">
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen
                name="surah/[number]"
                options={{
                  animation: "slide_from_right",
                }}
              />
              <Stack.Screen
                name="verse/[key]"
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
          </SafeAreaView>
        </SafeAreaProvider>
        {/* 
          If I did translucent false the splash screen at first will take the space of the status bar
          and just before the splash screen hides it will stop taking the space and shrink which is not a good UX.
          So the only solution that I found is to make the status bar translucent and and wrap the navigator
          with SafeAreaView so it will add a padding top to the navigator that is equal to the status bar.
        */}
        <StatusBar
          translucent={true}
          backgroundColor={
            isLight ? colors.background : colors.background_dark
          }
          style={isLight ? "dark" : "light"}
        />
      </QueryClientProvider>
    </RootSiblingParent>
  );
};

function Layout() {
  const isLoaded = useLoadFontAndStorage();

  if (!isLoaded) return null;

  return <RootLayout />;
}

export default Layout;

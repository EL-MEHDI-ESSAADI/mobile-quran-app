import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import { SplashScreen, Tabs } from "expo-router";
import { StatusBar } from "react-native";

import {
  Poppins_400Regular,
  Poppins_500Medium,
} from "@expo-google-fonts/poppins";
import {
  Amiri_400Regular,
  Amiri_700Bold,
} from "@expo-google-fonts/amiri";
import { colors } from "@/constants";

import BookmarkIcon from "@/components/bookmark-icon";
import HomeIcon from "@/components/home-icon";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const useInitFonts = () => {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
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

  if (!loaded) {
    return null;
  }

  return loaded;
};

function Layout() {
  const isFontsLoaded = useInitFonts();

  if (!isFontsLoaded) return null;

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.secondary,
            borderColor: colors.secondary,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon active={focused} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            tabBarIcon: ({ focused }) => (
              <BookmarkIcon active={focused} />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
      <StatusBar
        translucent={false}
        backgroundColor={colors.background}
        barStyle="light-content"
      />
    </>
  );
}

export default Layout;

import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BookmarkIcon } from "@/components/svgs/bookmark";
import { HomeIcon } from "@/components/svgs/home";

import { colors } from "@/styles/index.cjs";
import { useColorScheme } from "@/hooks/useColorScheme";

function Layout() {
  const { isLight } = useColorScheme();

  function getTabBarIconColor(focused: boolean) {
    return focused
      ? isLight
        ? colors.primary
        : colors.primary_dark
      : isLight
      ? colors.muted
      : colors.muted_dark;
  }

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: isLight
              ? colors.background
              : colors.secondary_dark,
            borderColor: "transparent",
            height: 60,
            elevation: 30,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <HomeIcon fill={getTabBarIconColor(focused)} />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="bookmarks"
          options={{
            tabBarIcon: ({ focused }) => (
              <BookmarkIcon
                stroke={getTabBarIconColor(focused)}
                width={33}
                height={32}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                size={24}
                color={getTabBarIconColor(focused)}
              />
            ),
            tabBarShowLabel: false,
          }}
        />
      </Tabs>
    </>
  );
}

export default Layout;

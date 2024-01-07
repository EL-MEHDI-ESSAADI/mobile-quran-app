import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import BookmarkIcon from "@/components/icons/bookmark-icon";
import HomeIcon from "@/components/icons/home-icon";

import { colors } from "@/styles/index.cjs";

function Layout() {
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
        <Tabs.Screen
          name="settings"
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name="settings-outline"
                size={24}
                color={focused ? colors.primary : colors.muted}
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

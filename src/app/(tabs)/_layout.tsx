import React from "react";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

import { BookmarkIcon } from "@/components/svgs/bookmark";
import { HomeIcon } from "@/components/svgs/home";

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
            height: 60,
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
              <BookmarkIcon
                stroke={focused ? colors.primary : colors.muted}
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

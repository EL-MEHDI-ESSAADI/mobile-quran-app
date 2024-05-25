import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/header";

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      initialRouteName="index"
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="reciters"
        options={{
          headerShown: true,
          header: () => <Header title="Reciters" />,
        }}
      />
    </Stack>
  );
}

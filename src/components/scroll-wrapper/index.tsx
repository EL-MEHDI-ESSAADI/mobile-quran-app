import { View, ScrollView } from "react-native";
import React from "react";

export default function ScrollWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <View className="flex-1 px-6 bg-background">
      <ScrollView>{children}</ScrollView>
    </View>
  );
}

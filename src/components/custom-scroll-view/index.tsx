import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { ViewStyle } from "react-native";
import { styled } from "nativewind";

function CustomScrollView({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return (
    <View className="flex-1" style={style}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {children}
      </ScrollView>
    </View>
  );
}

const StyledCustomScrollView = styled(CustomScrollView);

export { StyledCustomScrollView as CustomScrollView };

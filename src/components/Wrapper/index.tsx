import { View, ViewStyle } from "react-native";
import React from "react";
import { styled } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

function Wrapper({ children, style }: Props) {
  return (
    <SafeAreaView className="px-6 pb-4 flex-1" style={style}>
      {children}
    </SafeAreaView>
  );
}

const StyledWrapper = styled(Wrapper);

export { StyledWrapper as Wrapper };

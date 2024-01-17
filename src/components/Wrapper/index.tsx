import { View, ViewStyle } from "react-native";
import React from "react";
import { styled } from "nativewind";

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
};

function Wrapper({ children, style }: Props) {
  return (
    <View
      className="px-6 flex-1 bg-background dark:bg-background_dark"
      style={style}
    >
      {children}
    </View>
  );
}

const StyledWrapper = styled(Wrapper);

export { StyledWrapper as Wrapper };

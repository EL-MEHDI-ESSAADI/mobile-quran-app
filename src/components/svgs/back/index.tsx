import { useColorScheme } from "@/hooks/useColorScheme";
import { colors } from "@/styles/index.cjs";
import React from "react";
import Svg, { Path } from "react-native-svg";

function BackIcon() {
  const { isLight } = useColorScheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 21 14" fill="none">
      <Path
        d="M21 5.83333H4.46833L8.645 1.645L7 0L0 7L7 14L8.645 12.355L4.46833 8.16667H21V5.83333Z"
        fill={isLight ? colors.muted : colors.muted_dark}
      />
    </Svg>
  );
}

export { BackIcon };

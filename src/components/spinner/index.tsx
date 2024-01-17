import React, { useEffect } from "react";
import AntDesignIcon from "@expo/vector-icons/AntDesign";
import { colors } from "@/styles/index.cjs";
import Animated, {
  withTiming,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
} from "react-native-reanimated";
import { useColorScheme } from "@/hooks/useColorScheme";

function Spinner({
  size = 24,
  color,
}: {
  size?: number;
  color?: string;
}) {
  const rotation = useSharedValue(0);
  const { isLight } = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  return (
    <Animated.View
      style={animatedStyle}
      className={`w-[${size}px]`}
    >
      <AntDesignIcon
        name="loading1"
        size={size}
        color={
          color ||
          (isLight ? colors.foreground : colors.foreground_dark)
        }
      />
    </Animated.View>
  );
}

export { Spinner };

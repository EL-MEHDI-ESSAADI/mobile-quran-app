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

function Spinner() {
  const rotation = useSharedValue(0);

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
    <Animated.View style={animatedStyle} className="w-[24px]">
      <AntDesignIcon
        name="loading1"
        size={24}
        color={colors.foreground}
      />
    </Animated.View>
  );
}

export { Spinner };

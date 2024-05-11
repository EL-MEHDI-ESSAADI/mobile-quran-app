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
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

function Spinner({
  size = 24,
  color,
  loader = "ant-design-icon",
}: {
  size?: number;
  color?: string;
  loader?: "ant-design-icon" | "font-awesome5";
}) {
  const rotation = useSharedValue(0);
  const { isLight } = useColorScheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  const renderLoader = () => {
    switch (loader) {
      case "ant-design-icon":
        return (
          <AntDesignIcon
            name="loading1"
            size={size}
            color={color || (isLight ? colors.foreground : colors.foreground_dark)}
          />
        );
      case "font-awesome5":
        return (
          <FontAwesome5
            name="spinner"
            size={size}
            color={color || (isLight ? colors.primary : colors.primary_dark)}
          />
        );
      default:
        return (
          <AntDesignIcon
            name="loading1"
            size={size}
            color={color || (isLight ? colors.foreground : colors.foreground_dark)}
          />
        );
    }
  };

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
    <Animated.View style={animatedStyle} className={`w-[${size}px]`}>
      {renderLoader()}
    </Animated.View>
  );
}

export { Spinner };

import { View, Text, ViewStyle } from "react-native";
import React, { useEffect } from "react";
import { styled } from "nativewind";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

function Skeleton({ style }: { style?: ViewStyle }) {
  const opacity = useSharedValue(1);

  const viewStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  useEffect(() => {
    opacity.value = withRepeat(
      withTiming(0.5, {
        duration: 2000,
        easing: Easing.bezier(0.4, 0, 0.6, 1),
      }),
      -1,
      true
    );
  }, []);

  return (
    <Animated.View
      className="w-7 h-7 bg-foreground"
      style={[style, viewStyle]}
    />
  );
}

const StyledSkeleton = styled(Skeleton);

export { StyledSkeleton as Skeleton };

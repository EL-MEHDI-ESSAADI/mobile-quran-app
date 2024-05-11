import {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { QURAN_PLAYER_HEIGHT } from "@/constants";

export const useCollapsingPlayer = () => {
  const scrollDirection = useSharedValue<"up" | "down">("up");
  const translateY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event, ctx: { lastOffset: number }) => {
      scrollDirection.value = event.contentOffset.y - ctx.lastOffset > 0 ? "down" : "up";

      ctx.lastOffset = event.contentOffset.y;
    },
    onEndDrag: () => {
      translateY.value = withTiming(
        scrollDirection.value === "up" ? 0 : QURAN_PLAYER_HEIGHT,
        { duration: 200 }
      );
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: translateY.value,
      },
    ],
  }));

  return { scrollHandler, animatedStyle };
};

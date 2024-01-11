import { styled } from "nativewind";
import { View, ViewStyle } from "react-native";

function Separator({ style }: { style?: ViewStyle }) {
  return <View className="h-px bg-border my-6" style={style} />;
}

const StyledSeparator = styled(Separator);

export { StyledSeparator as Separator };

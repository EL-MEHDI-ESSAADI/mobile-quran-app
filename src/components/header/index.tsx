import { Text, ViewStyle } from "react-native";
import { useRouter } from "expo-router";
import { styled } from "nativewind";

import { TouchableOpacity } from "react-native-gesture-handler";
import { BackIcon } from "@/components/svgs/back";
import { Wrapper } from "@/components/wrapper";

function Header({
  title,
  style,
}: {
  title: string;
  style?: ViewStyle;
}) {
  const router = useRouter();
  return (
    <Wrapper
      className="flex-row items-center pt-6 bg-background flex-none"
      style={style}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={router.back}
        className="py-2"
      >
        <BackIcon />
      </TouchableOpacity>
      <Text className="text-foreground font-poppins_bold text-xl ml-6">
        {title}
      </Text>
    </Wrapper>
  );
}

const StyledHeader = styled(Header);

export { StyledHeader as Header };

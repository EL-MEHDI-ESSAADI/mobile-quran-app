import { View, Text } from "react-native";
import React from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants";
import { router } from "expo-router";

function Reciters() {
  return (
    <ScrollWrapper>
      <View className="flex-row space-x-[24px] mt-2">
        <Pressable onPress={router.back}>
          <AntDesignIcons
            name="arrowleft"
            size={30}
            color={colors.muted}
          />
        </Pressable>
        <Text className="text-foreground font-poppins-bold text-xl">
          Reciters
        </Text>
      </View>
    </ScrollWrapper>
  );
}

export default Reciters;

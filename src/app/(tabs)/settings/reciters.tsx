import { View, Text } from "react-native";
import React from "react";
import ScrollWrapper from "@/components/scroll-wrapper";
import { Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants";
import { Stack, router } from "expo-router";

function Reciters() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <ScrollWrapper>
        <View>
          <Text>Page</Text>
        </View>
      </ScrollWrapper>
    </>
  );
}

export default Reciters;

import { View, Text } from "react-native";
import React from "react";
import { Pressable } from "react-native";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { colors } from "@/constants";
import { Stack, router } from "expo-router";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";

function Reciters() {
  return (
    <>
      <Stack.Screen options={{ headerShown: true }} />
      <CustomScrollView>
        <Wrapper>
          <Text>Page</Text>
        </Wrapper>
      </CustomScrollView>
    </>
  );
}

export default Reciters;

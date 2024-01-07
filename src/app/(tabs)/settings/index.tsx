import { View, Text, Switch, Pressable } from "react-native";
import React from "react";
import { Link } from "expo-router";

import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { colors } from "@/styles/index.cjs";
import { useStore } from "@/store";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";

function Settings() {
  const {
    autoScroll,
    toggleAutoScroll,
    selectedReciter,
    selectedTranslation,
  } = useStore((state) => state);
  return (
    <CustomScrollView>
      <Wrapper>
        <Text className="text-2xl text-foreground font-poppins mt-4 mb-3">
          Translations
        </Text>
        <View className="bg-secondary px-2 py-3 rounded-lg flex-row justify-between items-center mb-3">
          <View>
            <Text className="text-muted text-base font-poppins">
              Selected Translation
            </Text>
            <Text className="text-primary font-poppins text-lg">
              {selectedTranslation.name}
            </Text>
          </View>
          <AntDesignIcons
            name="right"
            size={24}
            color={colors.muted}
          />
        </View>
        <Text className="text-2xl text-foreground font-poppins mb-3">
          Audio
        </Text>
        <Link href="/settings/reciters" asChild>
          <Pressable className="bg-secondary px-2 py-3 rounded-lg flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-muted text-base font-poppins">
                Selected Reciter
              </Text>
              <Text className="text-primary font-poppins text-lg">
                {selectedReciter.name}
              </Text>
            </View>
            <AntDesignIcons
              name="right"
              size={24}
              color={colors.muted}
            />
          </Pressable>
        </Link>
        <View className="flex-row justify-between itmes-center">
          <Text className="text-xl text-foreground font-poppins">
            Auto Scroll
          </Text>
          <Switch
            value={autoScroll}
            onChange={toggleAutoScroll}
            thumbColor={colors.primary}
            trackColor={{
              false: colors.border,
              true: colors.border,
            }}
          />
        </View>
      </Wrapper>
    </CustomScrollView>
  );
}
export default Settings;

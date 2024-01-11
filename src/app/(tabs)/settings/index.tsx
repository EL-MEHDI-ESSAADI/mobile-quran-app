import { Href, Link } from "expo-router";
import React from "react";
import {
  Pressable,
  Switch,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";
import { useStore } from "@/store";
import { colors } from "@/styles/index.cjs";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { styled } from "nativewind";

const SettingLink = styled(
  ({
    title,
    name,
    value,
    href,
    style,
  }: {
    title: string;
    style?: ViewStyle;
    name: string;
    value: string;
    href: Href<string>;
  }) => {
    return (
      <View style={style}>
        <Text className="text-2xl text-foreground font-poppins mb-3">
          {title}
        </Text>
        <Link href={href} asChild>
          <Pressable className="bg-secondary space-x-2 px-2 py-3 rounded-lg flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-muted text-base font-poppins">
                {name}
              </Text>
              <Text className="text-primary font-poppins text-lg">
                {value}
              </Text>
            </View>
            <AntDesignIcons
              name="right"
              size={24}
              color={colors.muted}
            />
          </Pressable>
        </Link>
      </View>
    );
  }
);

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
        <SettingLink
          className="mt-4 mb-3"
          title="Translations"
          name="Selected Translation"
          value={selectedTranslation.name}
          href="/translations"
        />
        <SettingLink
          className="mb-6"
          title="Audio"
          name="Selected Reciter"
          value={selectedReciter.name}
          href="/settings/reciters"
        />
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

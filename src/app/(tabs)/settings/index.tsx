import { Href, Link } from "expo-router";
import React from "react";
import { Pressable, Switch, Text, View, ViewStyle } from "react-native";

import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";
import { useStore } from "@/store";
import { colors } from "@/styles/index.cjs";
import AntDesignIcons from "@expo/vector-icons/AntDesign";
import { styled } from "nativewind";
import { useColorScheme } from "@/hooks/useColorScheme";

const SettingLink = styled(
  ({
    name,
    value,
    href,
    style,
  }: {
    style?: ViewStyle;
    name: string;
    value: string;
    href: Href<string>;
  }) => {
    const { isLight } = useColorScheme();
    return (
      <View style={style}>
        <Link href={href} asChild>
          <Pressable className="bg-secondary dark:bg-secondary_dark space-x-2 px-2 py-3 rounded-lg flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-muted dark:text-muted_dark text-base font-poppins">{name}</Text>
              <Text className="text-primary dark:text-primary_dark font-poppins text-lg">
                {value}
              </Text>
            </View>
            <AntDesignIcons
              name="right"
              size={24}
              color={isLight ? colors.muted : colors.muted_dark}
            />
          </Pressable>
        </Link>
      </View>
    );
  }
);

const SettingToggle = styled(
  ({
    title,
    checked,
    toggle,
    style,
  }: {
    title: string;
    checked: boolean;
    toggle: () => void;
    style?: ViewStyle;
  }) => {
    const { isLight } = useColorScheme();
    return (
      <View className="flex-row justify-between itmes-center items-center relative" style={style}>
        <Text className="text-xl text-foreground dark:text-foreground_dark font-poppins">
          {title}
        </Text>
        <Switch
          value={checked}
          onChange={toggle}
          thumbColor={isLight ? colors.primary : colors.primary_dark}
          trackColor={{
            false: isLight ? colors.border : colors.border_dark,
            true: isLight ? colors.border : colors.border_dark,
          }}
        />
      </View>
    );
  }
);

const Heading = styled(({ title, style }: { title: string; style?: ViewStyle }) => {
  return (
    <View className="flex-row">
      <Text
        className="text-2xl text-foreground font-poppins border-b-2 border-primary dark:text-foreground_dark dark:border-primary_dark"
        style={style}
      >
        {title}
      </Text>
    </View>
  );
});

function Settings() {
  const { selectedReciter, selectedTranslation } = useStore((state) => state);
  const { isLight, toggleColorScheme } = useColorScheme();

  return (
    <CustomScrollView>
      <Wrapper className="pt-6 pb-4">
        <View className="mb-6">
          <Heading title="Translations" className="mb-3" />
          <SettingLink
            name="Selected Translation"
            value={selectedTranslation.name}
            href="/translations"
          />
        </View>
        <View className="mb-6">
          <Heading title="Audio" className="mb-3" />
          <SettingLink
            className="mb-1"
            name="Selected Reciter"
            value={selectedReciter.name}
            href="/settings/reciters"
          />
        </View>
        <View>
          <Heading title="Appearance" className="mb-1" />
          <SettingToggle title="Dark Mode" checked={!isLight} toggle={toggleColorScheme} />
        </View>
      </Wrapper>
    </CustomScrollView>
  );
}
export default Settings;

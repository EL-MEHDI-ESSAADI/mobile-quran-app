import React, { useRef, useState } from "react";
import {
  Image,
  View,
  TextInput,
  FlatList,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { Link } from "expo-router";
import Icon from "@expo/vector-icons/Ionicons";

import Fuse from "fuse.js";
import { colors } from "@/styles/index.cjs";
import { surahsOverview } from "@/data";
import { useStore } from "@/store";
import { Wrapper } from "@/components/wrapper";
import { Separator } from "@/components/separator";
import { useColorScheme } from "@/hooks/useColorScheme";

const fuse = new Fuse(surahsOverview, {
  keys: ["name", "englishName", "englishNameTranslation"],
});

const DEBOUNCE_TIME = 500;

const useSurahs = () => {
  const [surahs, setSurahs] = useState(surahsOverview);

  const filterTimeoutRef =
    useRef<ReturnType<typeof setTimeout>>();

  function filterSurahs(filter: string) {
    clearTimeout(filterTimeoutRef.current);

    filterTimeoutRef.current = setTimeout(() => {
      if (filter) {
        setSurahs(
          fuse.search(filter).map((result) => result.item)
        );
      } else {
        setSurahs(surahsOverview);
      }
    }, DEBOUNCE_TIME);
  }

  return [surahs, filterSurahs] as const;
};

function Home() {
  const [surahs, filterSurahs] = useSurahs();
  const addToHistory = useStore((state) => state.addToHistory);
  const { isLight } = useColorScheme();

  function renderHeader() {
    return (
      <View className="mt-6">
        <Image
          source={require("assets/images/quran.png")}
          className="mx-auto mb-4 h-36 w-auto"
          resizeMode="contain"
        />
        <View className="flex-row bg-secondary px-5 py-4 rounded-xl space-x-2 mb-6 items-center dark:bg-secondary_dark">
          <TextInput
            className="flex-1 text-sm text-foreground dark:text-foreground_dark font-poppins"
            placeholder="Search"
            placeholderTextColor={
              isLight ? colors.muted : colors.muted_dark
            }
            onChangeText={filterSurahs}
          />
          <Icon
            name="md-search-outline"
            size={24}
            color={
              isLight
                ? colors.foreground
                : colors.foreground_dark
            }
          />
        </View>
      </View>
    );
  }

  function renderItem({
    item: surah,
  }: {
    item: (typeof surahs)[number];
  }) {
    return (
      <Link
        href={`/surah/${surah.number}`}
        asChild
        onPress={() => addToHistory(surah.number)}
      >
        <Pressable className="w-full flex-row space-x-1 justify-between items-center">
          <View className="flex-row space-x-4 items-center">
            <ImageBackground
              source={require("assets/images/star.png")}
              className="w-[37px] h-[36] items-center justify-center"
            >
              <Text className="text-foreground dark:text-foreground_dark text-sm font-poppins_medium">
                {surah.number}
              </Text>
            </ImageBackground>
            <View className="space-y-1">
              <Text className="text-foreground dark:text-foreground_dark font-poppins_medium text-base">
                {surah.englishName}
              </Text>
              <Text className="text-muted dark:text-muted_dark text-xs font-poppins_medium uppercase">
                {surah.numberOfAyahs} verses
              </Text>
            </View>
          </View>
          <Text className="text-primary dark:text-primary_dark text-xl font-amiri_bold">
            {surah.name}
          </Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Wrapper>
      <FlatList
        data={surahs}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 16 }}
        keyExtractor={(surah) => surah.number.toString()}
        ItemSeparatorComponent={() => (
          <Separator className="my-4" />
        )}
        ListHeaderComponent={renderHeader()}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}

export default Home;

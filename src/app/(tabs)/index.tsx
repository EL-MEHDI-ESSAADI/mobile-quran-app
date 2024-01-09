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
import Icon from "@expo/vector-icons/Ionicons";
import Fuse from "fuse.js";

import { colors } from "@/styles/index.cjs";
import { surahsOverview } from "@/data";
import { Wrapper } from "@/components/wrapper";
import { Link } from "expo-router";

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

  function renderHeader() {
    return (
      <>
        <Image
          source={require("assets/images/quran.png")}
          className="mx-auto mt-6 mb-4 h-36 w-auto"
          resizeMode="contain"
        />
        <View className="flex-row bg-secondary px-5 py-4 rounded-xl space-x-2 mb-6 items-center">
          <TextInput
            className="flex-1 text-sm text-foreground font-poppins"
            placeholder="Search"
            placeholderTextColor={colors.muted}
            onChangeText={filterSurahs}
          />
          <Icon
            name="md-search-outline"
            size={24}
            color={colors.foreground}
          />
        </View>
      </>
    );
  }

  function renderItem({
    item: surah,
  }: {
    item: (typeof surahs)[0];
  }) {
    return (
      <Link href={`/surah/${surah.number}`} asChild>
        <Pressable className="w-full flex-row space-x-1 justify-between items-center">
          <View className="flex-row space-x-4 items-center">
            <ImageBackground
              source={require("assets/images/star.png")}
              className="w-[37px] h-[36] items-center justify-center"
            >
              <Text className="text-foreground text-sm font-poppins-medium">
                {surah.number}
              </Text>
            </ImageBackground>
            <View className="space-y-1">
              <Text className="text-foreground font-poppins-medium text-base">
                {surah.englishName}
              </Text>
              <Text className="text-muted text-xs font-poppins-medium uppercase">
                {surah.numberOfAyahs} verses
              </Text>
            </View>
          </View>
          <Text className="text-primary text-xl font-amiri-bold">
            {surah.name}
          </Text>
        </Pressable>
      </Link>
    );
  }

  return (
    <Wrapper className="bg-background">
      <FlatList
        data={surahs}
        keyboardShouldPersistTaps="handled"
        keyExtractor={(surah) => surah.number.toString()}
        ItemSeparatorComponent={() => (
          <View className="my-4 border-t border-border" />
        )}
        ListHeaderComponent={renderHeader()}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}

export default Home;

import React, { useState } from "react";
import {
  Image,
  View,
  ScrollView,
  TextInput,
  FlatList,
  Text,
  ImageBackground,
} from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { colors } from "@/constants";
import { surahsOverview } from "@/data";
import Fuse from "fuse.js";

const fuse = new Fuse(surahsOverview, {
  keys: ["name", "englishName", "englishNameTranslation"],
});

function Home() {
  const [filterdSurahs, setFilterdSurahs] =
    useState(surahsOverview);

  function onSeachInputChange(search: string) {
    if (search) {
      setFilterdSurahs(
        fuse.search(search).map((result) => result.item)
      );
    } else {
      setFilterdSurahs(surahsOverview);
    }
  }

  return (
    <View className="flex-1 px-6 bg-background">
      <ScrollView>
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
            onChangeText={onSeachInputChange}
          />
          <Icon
            name="md-search-outline"
            size={24}
            color={colors.foreground}
          />
        </View>
        <FlatList
          className="mb-2"
          scrollEnabled={false}
          data={filterdSurahs}
          keyExtractor={(surah) => surah.number.toString()}
          ItemSeparatorComponent={() => (
            <View className=" my-4 border-t border-border" />
          )}
          renderItem={({ item: surah }) => {
            return (
              <View className="flex-row space-x-1 justify-between items-center">
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
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
}

export default Home;

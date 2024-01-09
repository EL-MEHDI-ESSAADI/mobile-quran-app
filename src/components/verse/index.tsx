import { View, Text } from "react-native";
import React from "react";
import { Verse as VerseType } from "@/types";
import { colors } from "@/styles/index.cjs";
import FeatherIcons from "@expo/vector-icons/Feather";
import { stripHtmlTags } from "@/lib/utils";

function Verse({ data }: { data: VerseType }) {
  return (
    <View>
      <View className="bg-secondary rounded-[10px] justify-between mb-6 flex-row px-[13px] py-[10px]">
        <Text className="rounded-full bg-primary px-[11px] py-[3px] font-poppins text-foreground text-sm">
          {data.verse_number}
        </Text>
        <View className="flex-row gap-4">
          <FeatherIcons
            name="share-2"
            size={24}
            color={colors.primary}
          />
          <FeatherIcons
            name="play"
            size={24}
            color={colors.primary}
          />

          <FeatherIcons
            name="bookmark"
            size={24}
            color={colors.primary}
          />
        </View>
      </View>
      <Text className="text-foreground text-right leading-[45px] font-amiri-bold text-[18px] mb-4">
        {data.text_imlaei}
      </Text>
      <Text className="text-muted font-poppins text-base">
        {stripHtmlTags(data.translations[0].text)}
      </Text>
    </View>
  );
}

export { Verse };

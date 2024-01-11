import { View, Text, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { Basmala } from "@/components/svgs/basmala";
import { QuranBg } from "@/components/svgs/quran-bg";
import { Surah } from "@/types";
import { styled } from "nativewind";

function SurahHero({
  surah,
  style,
}: {
  surah: Surah;
  style?: ViewStyle;
}) {
  return (
    <LinearGradient
      className="py-7 px-4 rounded-[20px] relative mb-[40px]"
      style={style}
      colors={["#DF98FA", "#9055FF"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View className="items-center relative z-20">
        <Text className="text-foreground font-poppins_medium text-[26px] mb-1">
          {surah?.englishName}
        </Text>
        <Text className="text-foreground font-poppins_medium text-base mb-4">
          {surah?.englishNameTranslation}
        </Text>
        <View className="w-[200px] h-px bg-foreground opacity-[0.75] mb-4 rounded-full" />
        <View className="flex-row items-center mb-8 gap-[5px]">
          <Text className="text-foreground font-poppins_medium text-sm uppercase">
            {surah?.revelationType}
          </Text>
          <View className="w-1 h-1 rounded-full bg-foreground opacity-[0.75]" />
          <Text className="text-foreground font-poppins_medium text-sm uppercase">
            {surah?.numberOfAyahs} verses
          </Text>
        </View>
        <Basmala />
      </View>
      <QuranBg className="absolute right-0 bottom-0" />
    </LinearGradient>
  );
}

const styledSurahHero = styled(SurahHero);

export { styledSurahHero as SurahHero };

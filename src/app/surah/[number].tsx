import { BackIcon } from "@/components/svgs/back";
import { Basmala } from "@/components/svgs/basmala";
import QuranBg from "@/components/svgs/quran-bg";
import { Wrapper } from "@/components/wrapper";
import { getSurahByNumber } from "@/lib/utils";
import { colors } from "@/styles/index.cjs";
import FeatherIcons from "@expo/vector-icons/Feather";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FlatList, Pressable, Text, View } from "react-native";

function Surah() {
  const router = useRouter();
  const { number: numberParam } = useLocalSearchParams();
  const surah = getSurahByNumber(Number(numberParam));

  if (!surah)
    return (
      <View>
        <Text>Surah not found</Text>
      </View>
    );

  function renderHeader() {
    return (
      <View className="mb-[40px]">
        <View className="flex-row items-center mt-6 mb-6">
          <Pressable onPress={router.back} className="py-2">
            <BackIcon />
          </Pressable>
          <Text className="text-foreground font-poppins-bold text-xl ml-6">
            {surah?.englishName}
          </Text>
        </View>
        <LinearGradient
          className="py-7 px-4 rounded-[20px] relative"
          colors={["#DF98FA", "#9055FF"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View className="items-center relative z-20">
            <Text className="text-foreground font-poppins-medium text-[26px] mb-1">
              {surah?.englishName}
            </Text>
            <Text className="text-foreground font-poppins-medium text-base mb-4">
              {surah?.englishNameTranslation}
            </Text>
            <View className="w-[200px] h-px bg-foreground opacity-[0.75] mb-4 rounded-full" />
            <View className="flex-row items-center mb-8 gap-[5px]">
              <Text className="text-foreground font-poppins-medium text-sm uppercase">
                {surah?.revelationType}
              </Text>
              <View className="w-1 h-1 rounded-full bg-foreground opacity-[0.75]" />
              <Text className="text-foreground font-poppins-medium text-sm uppercase">
                {surah?.numberOfAyahs} verses
              </Text>
            </View>
            <Basmala />
          </View>
          <QuranBg className="absolute right-0 bottom-0" />
        </LinearGradient>
      </View>
    );
  }

  function renderItem() {
    return (
      <View>
        <View className="bg-secondary rounded-[10px] justify-between mb-6 flex-row px-[13px] py-[10px]">
          <Text className="rounded-full bg-primary px-[11px] py-[3px] font-poppins text-foreground text-sm">
            1
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
        <Text className="text-foreground text-right font-amiri-bold text-lg mb-4">
          بسم الله الرحمن الرحيم
        </Text>
        <Text className="text-muted font-poppins text-base">
          [All] praise is [due] to Allah, Lord of the worlds -
        </Text>
      </View>
    );
  }

  return (
    <Wrapper className="bg-background">
      <FlatList
        data={[0, 1]}
        ItemSeparatorComponent={() => (
          <View className="h-px bg-border my-6" />
        )}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
      />
    </Wrapper>
  );
}

export default Surah;

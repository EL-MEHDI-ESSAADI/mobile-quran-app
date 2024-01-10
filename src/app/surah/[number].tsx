import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useStore } from "@/store";

import { Basmala } from "@/components/svgs/basmala";
import { QuranBg } from "@/components/svgs/quran-bg";
import { Wrapper } from "@/components/wrapper";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { Verse } from "@/components/verse";
import { VerseSkeleton } from "@/components/verse-skeleton";
import { PageError } from "@/components/page-error";

import { getSurahByNumber, getVersesApiUrl } from "@/lib/utils";
import { type VersesResponse } from "@/types";

const useSurah = ({ surahNumber }: { surahNumber: number }) => {
  const selectedTranslation = useStore(
    (state) => state.selectedTranslation
  );
  const queryResult = useInfiniteQuery({
    queryKey: ["surah", surahNumber, selectedTranslation.id],
    queryFn: async ({ pageParam }) => {
      const { data } = await axios.get<VersesResponse>(
        getVersesApiUrl({
          pageNumber: pageParam,
          surahNumber,
          translationSrcId: selectedTranslation.id,
        })
      );
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.pagination.next_page;
    },
    enabled: !!surahNumber,
  });
  return queryResult;
};

const VersesSkeleton = () => {
  const NUMBER_OF_VERSES = 3;
  const verses = Array.from(
    { length: NUMBER_OF_VERSES },
    (_, i) => i
  );
  return verses.map((_, index) => (
    <View key={index}>
      <VerseSkeleton />
      {verses.length - 1 !== index && <Separator />}
    </View>
  ));
};

function Surah() {
  const { number: numberParam } = useLocalSearchParams();
  const surahNumber = Number(numberParam);
  const surah = getSurahByNumber(surahNumber);
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    isFetching,
    refetch,
  } = useSurah({
    surahNumber,
  });

  function renderHeader() {
    return (
      <LinearGradient
        className="py-7 px-4 rounded-[20px] relative mb-[40px]"
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
    );
  }

  function renderFooter() {
    if (!isNextPageExist()) return null;
    return (
      <>
        <Separator />
        <VerseSkeleton />
      </>
    );
  }

  function handleEndReached() {
    // if there is no data or is fetching a page, don't fetch next page
    if (!data || isFetching) return;
    if (isNextPageExist()) fetchNextPage();
    // TODO: handle fetch next page error
    // TODO: handle reach end of the top of verses skeleton instead of the bottom
  }

  function renderEmpty() {
    if (isLoading) return <VersesSkeleton />;
    if (isError)
      return (
        <View className="flex-row justify-center">
          <Text className="text-foreground text-lg font-poppins-medium text-center">
            Fail to load verses,{" "}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            className=" rounded-md"
            onPress={() => refetch()}
          >
            <Text className="text-foreground text-xl  underline font-poppins-medium">
              Retry
            </Text>
          </TouchableOpacity>
        </View>
      );
    return null;
  }

  function renderScreenStack() {
    return (
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => (
            <Header title={surah?.englishName || "unknown"} />
          ),
        }}
      />
    );
  }

  function isNextPageExist() {
    if (!data) return false;
    return !!data.pages[data.pages.length - 1].pagination
      .next_page;
  }

  if (!surah)
    return (
      <>
        {renderScreenStack()}
        <PageError title="Surah not found" />
      </>
    );

  return (
    <>
      {renderScreenStack()}
      <Wrapper className="bg-background">
        <FlatList
          data={
            data?.pages.map((page) => page.verses).flat() || []
          }
          ItemSeparatorComponent={Separator}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={renderHeader}
          renderItem={({ item }) => <Verse data={item} />}
          ListEmptyComponent={renderEmpty}
          onEndReached={handleEndReached}
          ListFooterComponent={renderFooter}
        />
      </Wrapper>
    </>
  );
}

export default Surah;

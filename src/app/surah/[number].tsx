import axios from "axios";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useStore } from "@/store";

import { Wrapper } from "@/components/wrapper";
import { Header } from "@/components/header";
import { Separator } from "@/components/separator";
import { Verse } from "@/components/verse";
import { VerseSkeleton } from "@/components/verse-skeleton";
import { PageError } from "@/components/page-error";

import { getSurahByNumber, getVersesApiUrl } from "@/lib/utils";
import { type VersesResponse } from "@/types";
import { SurahHero } from "@/components/surah-hero";
import { QueryError } from "@/components/query-error";

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
        <QueryError
          refetch={refetch}
          text="Fail to load verses"
        />
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
          ListHeaderComponent={() => <SurahHero surah={surah} />}
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

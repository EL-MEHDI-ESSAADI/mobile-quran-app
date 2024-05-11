import { Stack, useLocalSearchParams } from "expo-router";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";

import { CustomScrollView } from "@/components/custom-scroll-view";
import { Header } from "@/components/header";
import { PageError } from "@/components/page-error";
import { QueryError } from "@/components/query-error";
import { SurahHero } from "@/components/surah-hero";
import { Verse } from "@/components/verse";
import { VerseSkeleton } from "@/components/verse-skeleton";
import { Wrapper } from "@/components/wrapper";

import { getSurahByNumber, getVerseApiUrl } from "@/lib/utils";
import { VerseResponse } from "@/types";
import { useStore } from "@/store";
import { SurahAudioPlayer } from "@/components/surah-audio-player";

const useVerse = ({ verseKey, enabled }: { verseKey: string; enabled: boolean }) => {
  const selectedTranslation = useStore((state) => state.selectedTranslation);
  const queryResult = useQuery({
    queryKey: ["verse", verseKey, selectedTranslation.id],
    async queryFn() {
      const { data } = await axios.get<VerseResponse>(
        getVerseApiUrl({
          verseKey,
          translationSrcId: selectedTranslation.id,
        })
      );

      return data;
    },
    enabled,
  });

  return queryResult;
};

export default function VerseScreen() {
  const { key: verseKeyParam } = useLocalSearchParams();
  const verseKey = verseKeyParam as string;
  const surah = getSurahByNumber(Number(verseKey.split(":")[0]));
  const { data, isError, isLoading, refetch } = useVerse({
    verseKey,
    enabled: !!surah,
  });

  function renderScreenStack() {
    return (
      <Stack.Screen
        options={{
          headerShown: true,
          header: () => <Header title={surah ? `${surah.englishName}  ${verseKey}` : "unknown"} />,
        }}
      />
    );
  }

  if (!surah)
    return (
      <>
        {renderScreenStack()}
        <PageError title="Verse not found" />
      </>
    );

  return (
    <>
      {renderScreenStack()}
      <CustomScrollView>
        <Wrapper className="pb-4">
          <SurahHero surah={surah} />
          {isError && <QueryError refetch={refetch} text="Fail to load verse" />}
          {isLoading && <VerseSkeleton />}
          {!!data && <Verse data={data.verse} />}
        </Wrapper>
      </CustomScrollView>
      {!!data && <SurahAudioPlayer surahNumber={surah.number} />}
    </>
  );
}

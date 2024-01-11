import { Pressable, Text, View } from "react-native";

import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { twJoin } from "tailwind-merge";

import { CustomScrollView } from "@/components/custom-scroll-view";
import { PageError } from "@/components/page-error";
import { Spinner } from "@/components/spinner";
import { Wrapper } from "@/components/wrapper";

import { availableTranslationsApi } from "@/constants";
import { convertTranslationListToMap } from "@/lib/utils";
import { useStore } from "@/store";
import { TranslationInfo } from "@/types";

type TranslationsResponse = {
  translations: TranslationInfo[];
};

const useTranslations = () => {
  const selectedTranslation = useStore(
    (state) => state.selectedTranslation
  );
  const queryResult = useQuery({
    queryKey: ["translations"],
    async queryFn() {
      const { data } = await axios.get<TranslationsResponse>(
        availableTranslationsApi
      );
      return convertTranslationListToMap(
        data.translations,
        selectedTranslation.id
      );
    },
  });
  return queryResult;
};

const SingleTranslation = ({
  translation,
}: {
  translation: TranslationInfo;
}) => {
  const { selectedTranslation, setSelectedTranslation } =
    useStore((state) => state);
  return (
    <Pressable
      key={translation.id}
      className="mt-3 pl-3 flex-row items-center"
      onPress={() => setSelectedTranslation(translation)}
    >
      <View className="w-5 h-5 rounded-full relative justify-center items-center bg-foreground">
        <View
          className={twJoin(
            "w-3 h-3 rounded-full absolute",
            translation.id === selectedTranslation.id &&
              "bg-primary"
          )}
        />
      </View>
      <Text className="text-foreground ml-3 text-lg font-poppins">
        {translation.author_name}
      </Text>
    </Pressable>
  );
};

const Translations = ({
  translations,
}: {
  translations: Map<string, TranslationInfo[]>;
}) => {
  return (
    <View className="space-y-4">
      {Array.from(translations).map(
        ([language, translations]) => {
          return (
            <View key={language}>
              <Text className="text-foreground text-xl font-poppins_medium capitalize">
                {language}
              </Text>
              {translations.map((translation) => (
                <SingleTranslation
                  key={translation.id}
                  translation={translation}
                />
              ))}
            </View>
          );
        }
      )}
    </View>
  );
};

function TranslationsScreen() {
  const { data, isLoading, isError, refetch } =
    useTranslations();

  if (isLoading)
    return (
      <View className="bg-background flex-1 items-center justify-center">
        <Spinner size={40} />
      </View>
    );
  if (isError || !data)
    return (
      <PageError
        title="Fail to load translations"
        retry={refetch}
      />
    );

  return (
    <>
      <CustomScrollView>
        <Wrapper>
          <Translations translations={data} />
        </Wrapper>
      </CustomScrollView>
    </>
  );
}

export default TranslationsScreen;

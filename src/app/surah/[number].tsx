import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";
import { getSurahByNumber } from "@/lib/utils";
import { colors } from "@/styles/index.cjs";

function Surah() {
  const { number: numberParam } = useLocalSearchParams();
  const surah = getSurahByNumber(Number(numberParam));

  if (!surah)
    return (
      <View>
        <Text>Surah not found</Text>
      </View>
    );

  return (
    <>
      <CustomScrollView>
        <Wrapper>
          <Text className="text-muted">{numberParam}</Text>
        </Wrapper>
      </CustomScrollView>
    </>
  );
}

export default Surah;

import { Pressable, Text, View } from "react-native";
import React from "react";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";
import { reciters } from "@/data";
import { useStore } from "@/store";
import { twJoin } from "tailwind-merge";

function Reciters() {
  const { selectedReciter, setSelectedReciter } = useStore((state) => state);
  return (
    <CustomScrollView>
      <Wrapper>
        {reciters.map((reciter) => (
          <Pressable
            key={reciter.id}
            className="mt-3 pl-3 flex-row items-center flex-wrap"
            onPress={() => setSelectedReciter(reciter)}
          >
            <View className="w-5 h-5 rounded-full relative justify-center items-center bg-border dark:bg-border_dark">
              <View
                className={twJoin(
                  "w-3 h-3 rounded-full absolute",
                  reciter.id === selectedReciter.id && "bg-primary dark:bg-primary_dark"
                )}
              />
            </View>
            <Text className="text-foreground dark:text-foreground_dark ml-3 text-lg font-poppins">
              {reciter.name}
            </Text>
            {reciter.specificity && (
              <Text className="text-white bg-primary dark:bg-primary_dark px-2  rounded-full dark:text-foreground_dark text-sm ml-1 font-poppins">
                {reciter.specificity}
              </Text>
            )}
          </Pressable>
        ))}
      </Wrapper>
    </CustomScrollView>
  );
}

export default Reciters;

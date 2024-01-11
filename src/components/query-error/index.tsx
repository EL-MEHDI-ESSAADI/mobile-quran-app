import { View, Text } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { styled } from "nativewind";

function QueryError({
  text,
  refetch,
}: {
  text: string;
  refetch: () => void;
}) {
  return (
    <View className="flex-row justify-center">
      <Text className="text-foreground text-lg font-poppins_medium text-center">
        {text},{" "}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className=" rounded-md"
        onPress={refetch}
      >
        <Text className="text-foreground text-xl  underline font-poppins_medium">
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const StyledQueryError = styled(QueryError);

export { StyledQueryError as QueryError };

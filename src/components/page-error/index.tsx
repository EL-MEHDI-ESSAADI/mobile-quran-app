import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

function PageError({
  title,
  retry,
}: {
  title: string;
  retry?: () => void;
}) {
  const router = useRouter();

  return (
    <View className="bg-background flex-1 items-center justify-center">
      <Text className="text-foreground text-center text-3xl font-poppins_bold mb-4">
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-primary px-5 py-3 rounded-md"
        onPress={retry || router.back}
      >
        <Text className="text-foreground text-xl font-poppins_medium">
          {retry ? "Retry" : "Go back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { PageError };

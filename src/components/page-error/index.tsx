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
    <View className="bg-background dark:bg-background_dark flex-1 items-center justify-center">
      <Text className="text-foreground dark:text-foreground_dark text-center text-3xl font-poppins_bold mb-4">
        {title}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        className="bg-primary dark:bg-primary_dark px-5 py-3 rounded-md"
        onPress={retry || router.back}
      >
        <Text className="text-background dark:text-foreground_dark text-xl font-poppins_medium">
          {retry ? "Retry" : "Go back"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { PageError };

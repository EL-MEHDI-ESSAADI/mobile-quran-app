import React from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

function Home() {
  return (
    <View className="flex-1 bg-background">
      <ScrollView>
        <Text className="text-4xl text-muted font-poppins">
          Home
        </Text>
      </ScrollView>
    </View>
  );
}

export default Home;

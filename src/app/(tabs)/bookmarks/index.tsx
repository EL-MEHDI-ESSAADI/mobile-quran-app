import { View, Text } from "react-native";
import React from "react";
import ScrollWrapper from "@/components/scroll-wrapper";

function Bookmarks() {
  return (
    <ScrollWrapper>
      <Text className="text-4xl text-foreground font-poppins">
        bookmarks
      </Text>
    </ScrollWrapper>
  );
}

export default Bookmarks;

import { Text } from "react-native";
import React from "react";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";

function Bookmarks() {
  return (
    <CustomScrollView>
      <Wrapper>
        <Text className="text-4xl text-foreground font-poppins">
          bookmarks
        </Text>
      </Wrapper>
    </CustomScrollView>
  );
}

export default Bookmarks;

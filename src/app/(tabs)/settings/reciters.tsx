import { Text } from "react-native";
import React from "react";
import { CustomScrollView } from "@/components/custom-scroll-view";
import { Wrapper } from "@/components/wrapper";

function Reciters() {
  return (
    <>
      <CustomScrollView>
        <Wrapper>
          <Text>Page</Text>
        </Wrapper>
      </CustomScrollView>
    </>
  );
}

export default Reciters;

import { View, Text, TouchableOpacity } from "react-native";

import { BookmarkIcon } from "@/components/svgs/bookmark";
import FeatherIcons from "@expo/vector-icons/Feather";
import Toast from "react-native-root-toast";

import { colors, fonts } from "@/styles/index.cjs";
import { Verse as VerseType } from "@/types";
import { stripHtmlTags } from "@/lib/utils";
import { useStore } from "@/store";
import * as Clipboard from "expo-clipboard";

const BookmarkButton = ({ verseKey }: { verseKey: string }) => {
  const [bookmarks, toggleBookmark] = useStore((state) => [
    state.bookmarks,
    state.toggleBookmark,
  ]);
  const isBookmarked = bookmarks.includes(verseKey);

  const onPress = () => {
    toggleBookmark(verseKey);
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <BookmarkIcon
        isFilled={isBookmarked}
        style={{ marginLeft: 14 }}
      />
    </TouchableOpacity>
  );
};

const CopyButton = ({ verseText }: { verseText: string }) => {
  const onPress = async () => {
    await Clipboard.setStringAsync(verseText);
    Toast.show("Ayah copied", {
      backgroundColor: colors.primary,
      shadow: true,
      textStyle: {
        fontFamily: fonts.poppins,
        color: colors.foreground,
        fontSize: 14,
      },
    });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <FeatherIcons
        name="copy"
        size={24}
        color={colors.primary}
        style={{ marginLeft: 16 }}
      />
    </TouchableOpacity>
  );
};

function Verse({ data }: { data: VerseType }) {
  return (
    <View>
      <View className="bg-secondary rounded-[10px] justify-between mb-6 flex-row px-[13px] py-[10px]">
        <Text className="rounded-full bg-primary px-[11px] py-[3px] font-poppins text-foreground text-sm">
          {data.verse_number}
        </Text>
        <View className="flex-row">
          <FeatherIcons
            name="play"
            size={24}
            color={colors.primary}
          />
          <CopyButton verseText={data.text_imlaei} />
          <BookmarkButton verseKey={data.verse_key} />
        </View>
      </View>
      <Text className="text-foreground text-right leading-[45px] font-amiri_bold text-[18px] mb-4">
        {data.text_imlaei}
      </Text>
      <Text className="text-muted font-poppins text-base">
        {stripHtmlTags(data.translations[0].text)}
      </Text>
    </View>
  );
}

export { Verse };

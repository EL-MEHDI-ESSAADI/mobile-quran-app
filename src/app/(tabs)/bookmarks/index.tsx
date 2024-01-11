import { Link } from "expo-router";
import { styled } from "nativewind";
import {
  Pressable,
  Text,
  View,
  ViewStyle,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { Wrapper } from "@/components/wrapper";
import { getSurahByNumber } from "@/lib/utils";
import { useStore } from "@/store";

const HistoryItem = ({
  surahNumber,
}: {
  surahNumber: number;
}) => {
  const surah = getSurahByNumber(surahNumber);

  if (!surah) return null;

  return (
    <Link href={`/surah/${surah.number}`} asChild>
      <Pressable className="bg-secondary p-4 rounded-lg w-40 min-h-[140px]">
        <View className="flex-row justify-between mb-2 gap-2">
          <Text className="text-primary font-poppins_medium  flex-1 text-sm">
            {surah.englishName}
          </Text>
          <Text className="text-foreground text-sm font-poppins_medium">
            {surah.number}
          </Text>
        </View>
        <Text className="text-foreground text-xs mb-2 font-poppins_medium">
          {surah.englishNameTranslation}
        </Text>
        <View className="bg-background items-center justify-center rounded-sm h-20 mt-auto">
          <Text className="text-foreground text-xl font-amiri_bold">
            {surah.name}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
};

const BookmarkItem = ({ verseKey }: { verseKey: string }) => {
  const surah = getSurahByNumber(Number(verseKey.split(":")[0]));

  if (!surah) return null;

  return (
    <Link href={`/verse/${verseKey}`} asChild>
      <TouchableOpacity className="px-4 py-2 bg-secondary rounded-lg">
        <Text className="text-foreground font-poppins_medium text-base">
          {surah.englishName}&nbsp;&nbsp;{verseKey}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

const Header = styled(
  ({ title, style }: { title: string; style?: ViewStyle }) => {
    return (
      <View className="flex-row" style={style}>
        <Text className="text-foreground border-b-2 border-primary  font-poppins_medium text-3xl">
          {title}
        </Text>
      </View>
    );
  }
);

const EmptyListText = ({ text }: { text: string }) => {
  return (
    <Text className="text-foreground font-poppins_medium text-base">
      {text}
    </Text>
  );
};

function Bookmarks() {
  const history = useStore((state) => state.history);
  const bookmarks = useStore((state) => state.bookmarks);

  return (
    <Wrapper className="pt-6 bg-background">
      <View className="mb-7 space-y-4">
        <Header title="History" />
        <FlatList
          data={history}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <HistoryItem surahNumber={item} />
          )}
          ListEmptyComponent={() => (
            <EmptyListText text="No History yet" />
          )}
          className="pl-2"
          horizontal={true}
          ItemSeparatorComponent={() => <View className="w-4" />}
        />
      </View>
      <View className="space-y-4">
        <Header title="Bookmarks" />
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.toString()}
          renderItem={({ item }) => (
            <BookmarkItem verseKey={item} />
          )}
          ListEmptyComponent={() => (
            <EmptyListText text="No bookmarks yet" />
          )}
          className="pl-2"
          horizontal={true}
          ItemSeparatorComponent={() => <View className="w-4" />}
        />
      </View>
    </Wrapper>
  );
}

export default Bookmarks;

import { DEFAULT_TRANSLATION, versesApi } from "@/constants";
import { surahsOverview } from "@/data";

export const getSurahByNumber = (number: number) => {
  if (!number) return null;
  return surahsOverview.find((surah) => surah.number === number);
};

export const getVersesApiUrl = ({
  surahNumber,
  pageNumber,
}: {
  surahNumber: number;
  pageNumber: number;
}) => {
  return versesApi
    .replace("${surahNumber}", surahNumber.toString())
    .replace("${pageNumber}", pageNumber.toString())
    .replace(
      "${translationSrcId}",
      DEFAULT_TRANSLATION.id.toString()
    );
};

export const stripHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

let str = "<sub foot_note=6565>1</sub>";
console.log(stripHtmlTags(str)); // Output: 1

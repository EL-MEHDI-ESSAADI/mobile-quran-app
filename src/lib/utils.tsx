import { audioApi, verseApi, versesApi } from "@/constants";
import { surahsOverview } from "@/data";
import { TranslationInfo } from "@/types";

export const getSurahByNumber = (number: number) => {
  if (!number) return null;
  return surahsOverview.find((surah) => surah.number === number);
};

export const getVersesApiUrl = ({
  surahNumber,
  pageNumber,
  translationSrcId,
}: {
  surahNumber: number;
  pageNumber: number;
  translationSrcId: number;
}) => {
  return versesApi
    .replace("${surahNumber}", surahNumber.toString())
    .replace("${pageNumber}", pageNumber.toString())
    .replace("${translationSrcId}", translationSrcId.toString());
};

export const getVerseApiUrl = ({
  verseKey,
  translationSrcId,
}: {
  verseKey: string;
  translationSrcId: number;
}) => {
  return verseApi
    .replace("${verseKey}", verseKey)
    .replace("${translationSrcId}", translationSrcId.toString());
};
export const getAudioApiApiUrl = (reciterId: number, surahNumber: number) => {
  return audioApi
    .replace("${reciterId}", reciterId.toString())
    .replace("${surahId}", surahNumber.toString());
};

export const stripHtmlTags = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "");
};

/**
 * Converts a list of translations to a Map object where each key is a language name and each value is an array of translations for that language.
 * If a translation's id matches the given id, it is moved to the front of its array.
 * If any array contains the matching translation, it is moved to the front of the map.
 *
 * @param list - The list of translations to convert.
 * @param id - The id to sort by.
 * @returns The converted Map object.
 */
export const convertTranslationListToMap = (
  list: TranslationInfo[],
  id: number
): Map<string, TranslationInfo[]> => {
  let map = new Map<string, TranslationInfo[]>();
  let keyOfMatchingId: string | undefined;

  list.forEach((item) => {
    if (!map.has(item.language_name)) {
      map.set(item.language_name, []);
    }
    if (item.id === id) {
      map.get(item.language_name)!.unshift(item);
      keyOfMatchingId = item.language_name;
    } else {
      map.get(item.language_name)!.push(item);
    }
  });

  if (keyOfMatchingId) {
    const matchingArray = map.get(keyOfMatchingId);
    map.delete(keyOfMatchingId);
    map = new Map([[keyOfMatchingId, matchingArray!], ...map.entries()]);
  }

  return map;
};

export const formatTime = (millis?: number) => {
  if (!millis) return "0:00";

  let seconds = Math.floor((millis / 1000) % 60);
  let minutes = Math.floor((millis / (1000 * 60)) % 60);
  let hours = Math.floor((millis / (1000 * 60 * 60)) % 24);

  const time = `${hours ? `${hours}:` : ""}${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return time;
};

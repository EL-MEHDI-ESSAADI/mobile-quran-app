import { surahsOverview } from "@/data";

export const getSurahByNumber = (number: number) => {
  return surahsOverview.find((surah) => surah.number === number);
};

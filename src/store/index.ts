import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  DEFAULT_RECITER,
  DEFAULT_TRANSLATION,
} from "@/constants";
import { TranslationInfo } from "@/types";

type ReciterType = {
  specificity?: string;
  name: string;
  id: number;
};

type StoreState = {
  autoScroll: boolean;
  selectedReciter: ReciterType;
  selectedTranslation: TranslationInfo;
  // the history array is used to keep track of the last 10 surahs that the user has visited, it stores the surah number
  history: number[];
  // array of surah keys that the user has bookmarked
  bookmarks: string[];
  toggleAutoScroll: () => void;
  setSelectedTranslation: (
    selectedTranslation: TranslationInfo
  ) => void;
  addToHistory: (surahNumber: number) => void;
  toggleBookmark: (surahKey: string) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      autoScroll: true,
      selectedReciter: DEFAULT_RECITER,
      selectedTranslation: DEFAULT_TRANSLATION,
      history: [],
      bookmarks: [],
      toggleAutoScroll: () =>
        set((state) => ({ autoScroll: !state.autoScroll })),
      setSelectedTranslation: (
        selectedTranslation: TranslationInfo
      ) => set(() => ({ selectedTranslation })),
      addToHistory: (surahNumber: number) => {
        set((state) => {
          // remove the surah number from the array if it exists
          const newHistory = [...state.history].filter(
            (item) => item !== surahNumber
          );
          // add the new surah number to the beginning of the array
          newHistory.unshift(surahNumber);
          // if history length is more than 10, remove the last item
          if (newHistory.length > 10) {
            newHistory.pop();
          }

          return { history: newHistory };
        });
      },
      toggleBookmark: (surahKey: string) => {
        set((state) => {
          const newBookmarks = [...state.bookmarks];
          const index = newBookmarks.indexOf(surahKey);
          if (index > -1) {
            newBookmarks.splice(index, 1);
          } else {
            newBookmarks.unshift(surahKey);
          }
          return { bookmarks: newBookmarks };
        });
      },
    }),
    {
      name: "store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

import { DEFAULT_RECITER, DEFAULT_TRANSLATION } from "@/constants";
import { AudioState, TranslationInfo } from "@/types";
import { Appearance, ColorSchemeName } from "react-native";

type ReciterType = {
  specificity?: string;
  name: string;
  id: number;
};

type AudioVerseState = {
  key: string;
  status: AudioState["status"];
  pauseAudio: () => void;
  playAudio: () => void;
  playVerse: (verseKey: string) => void;
};

type StoreState = {
  autoScroll: boolean;
  selectedReciter: ReciterType;
  selectedTranslation: TranslationInfo;
  // the history array is used to keep track of the last 10 surahs that the user has visited, it stores the surah number
  history: number[];
  // array of surah keys that the user has bookmarked
  bookmarks: string[];
  _hasHydrated: boolean;
  persistedTheme: ColorSchemeName;
  audioVerseState?: AudioVerseState;
  setPersistedTheme: (theme: ColorSchemeName) => void;
  setHasHydrated: (value: boolean) => void;
  toggleAutoScroll: () => void;
  setSelectedTranslation: (selectedTranslation: TranslationInfo) => void;
  addToHistory: (surahNumber: number) => void;
  toggleBookmark: (surahKey: string) => void;
  setAudioVerseState: (state?: AudioVerseState) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      autoScroll: true,
      selectedReciter: DEFAULT_RECITER,
      selectedTranslation: DEFAULT_TRANSLATION,
      history: [],
      bookmarks: [],
      _hasHydrated: false,
      persistedTheme: Appearance.getColorScheme() || "light",
      audioVerseState: undefined,
      setPersistedTheme: (theme) => {
        set({ persistedTheme: theme });
      },
      setHasHydrated: (value) => {
        set({
          _hasHydrated: value,
        });
      },
      toggleAutoScroll: () => set((state) => ({ autoScroll: !state.autoScroll })),
      setSelectedTranslation: (selectedTranslation: TranslationInfo) =>
        set(() => ({ selectedTranslation })),
      addToHistory: (surahNumber: number) => {
        set((state) => {
          // remove the surah number from the array if it exists
          const newHistory = [...state.history].filter((item) => item !== surahNumber);
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
      setAudioVerseState: (state) => {
        set({ audioVerseState: state });
      },
    }),
    {
      name: "store",
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage:
        ({ setHasHydrated }) =>
        (state) => {
          setHasHydrated(true);
        },
    }
  )
);

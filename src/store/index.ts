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
  toggleAutoScroll: () => void;
  setSelectedTranslation: (
    selectedTranslation: TranslationInfo
  ) => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      autoScroll: true,
      selectedReciter: DEFAULT_RECITER,
      selectedTranslation: DEFAULT_TRANSLATION,
      toggleAutoScroll: () =>
        set((state) => ({ autoScroll: !state.autoScroll })),
      setSelectedTranslation: (
        selectedTranslation: TranslationInfo
      ) => set(() => ({ selectedTranslation })),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

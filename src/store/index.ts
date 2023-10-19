import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persist, createJSONStorage } from "zustand/middleware";

import {
  DEFAULT_RECITER,
  DEFAULT_TRANSLATION,
} from "@/constants";

type ReciterType = {
  specificity?: string;
  name: string;
  id: number;
};

type TranslationType = {
  id: number;
  name: string;
  lang: string;
};

type StoreState = {
  autoScroll: boolean;
  selectedReciter: ReciterType;
  selectedTranslation: TranslationType;
  toggleAutoScroll: () => void;
};

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      autoScroll: true,
      selectedReciter: DEFAULT_RECITER,
      selectedTranslation: DEFAULT_TRANSLATION,
      toggleAutoScroll: () =>
        set((state) => ({ autoScroll: !state.autoScroll })),
    }),
    {
      name: "store",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

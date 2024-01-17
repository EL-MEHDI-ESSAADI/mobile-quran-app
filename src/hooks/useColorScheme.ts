import { useStore } from "@/store";
import { useColorScheme as useNativeColorScheme } from "nativewind";
import { ColorSchemeSystem } from "nativewind/dist/style-sheet/color-scheme";
import { ColorSchemeName } from "react-native";

export const useColorScheme = () => {
  const setPersistedTheme = useStore(
    (state) => state.setPersistedTheme
  );
  const { colorScheme, setColorScheme } = useNativeColorScheme();

  const isLight = colorScheme === "light";

  function customSetColorScheme(value: ColorSchemeName) {
    setPersistedTheme(value);
    setColorScheme(value as ColorSchemeSystem);
  }

  function customToggleColorScheme() {
    customSetColorScheme(isLight ? "dark" : "light");
  }

  return {
    colorScheme,
    isLight,
    toggleColorScheme: customToggleColorScheme,
    setColorScheme: customSetColorScheme,
  };
};

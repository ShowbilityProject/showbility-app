import type { ColorValue } from "react-native";

export const colors = {
  primary: "#FF5E00",
  secondary: "#3385FF",
  gray900: "#1F1F1F",
  gray800: "#373737",
  gray700: "#6C6C6C",
  gray600: "#9B9B9B",
  gray500: "#B3B3B3",
  gray400: "#D4D4D4",
  gray300: "#EDEDED",
  gray200: "#F4F4F4",
  gray100: "#FAFAFA",
  black: "#000000",
  white: "#FFFFFF",
  positive: "#00C400",
  negative: "#EF2B2A",
} as const satisfies Record<string, ColorValue>;

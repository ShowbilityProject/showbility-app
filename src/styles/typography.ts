import type { StyleProp, TextStyle } from "react-native";

export const fonts = {
  100: "Pretendard-thin",
  200: "Pretendard-ExtraLight",
  300: "Pretendard-Light",
  400: "Pretendard-Regular",
  500: "Pretendard-Medium",
  600: "Pretendard-SemiBold",
  700: "Pretendard-Bold",
  800: "Pretendard-ExtraBold",
  900: "Pretendard-Black",
} as const satisfies Record<number, string>;

export const typography = {
  h1: {
    fontFamily: fonts[600],
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.25,
  },
} as const satisfies Record<string, StyleProp<TextStyle>>;

export const typo = typography; // alias for `typography`

import type { StyleProp, TextStyle } from "react-native";

export const weightFontMap = {
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

interface Props {
  weight?: keyof typeof weightFontMap;
  size?: number;
  lineHeight?: number;
  letter?: number;
}

const createTypography = ({
  weight,
  size,
  lineHeight,
  letter = -0.25,
}: Props) =>
  ({
    fontFamily: weight && weightFontMap[weight],
    fontSize: size,
    lineHeight: lineHeight,
    letterSpacing: letter,
  }) as const satisfies StyleProp<TextStyle>;

export const typography = {
  h1: createTypography({
    weight: 600,
    size: 24,
    lineHeight: 32,
  }),
  h2: createTypography({
    weight: 600,
    size: 20,
    lineHeight: 28,
  }),
  h3: createTypography({
    weight: 600,
    size: 16,
    lineHeight: 24,
  }),
  h4: createTypography({
    weight: 600,
    size: 14,
    lineHeight: 22,
  }),
  h5: createTypography({
    weight: 600,
    size: 13,
    lineHeight: 20,
  }),
  h6: createTypography({
    weight: 600,
    size: 12,
    lineHeight: 18,
  }),
  body1: createTypography({
    weight: 400,
    size: 16,
    lineHeight: 24,
  }),
  body2: createTypography({
    weight: 400,
  }),
  custom: createTypography,
} as const;

export const typo = typography; // alias for `typography`

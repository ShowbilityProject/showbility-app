import { FlexStyle, StyleProp, ViewStyle } from "react-native";

export const round = {
  sm: { borderRadius: 8 },
  md: { borderRadius: 12 },
  full: { borderRadius: 999 },
} as const satisfies Record<string, StyleProp<ViewStyle>>;

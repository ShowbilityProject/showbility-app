import { FlexStyle, StyleProp, ViewStyle } from "react-native";

export const round = {
  full: { borderRadius: 999 },
} as const satisfies Record<string, StyleProp<ViewStyle>>;

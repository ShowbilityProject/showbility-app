import type { ColorValue, StyleProp, ViewStyle } from "react-native";

export const bg = (color: ColorValue) =>
  ({ backgroundColor: color }) satisfies StyleProp<ViewStyle>;

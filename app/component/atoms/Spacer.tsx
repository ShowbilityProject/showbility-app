import { View } from "react-native";
import * as React from "react";

export const Spacer: React.FC<{
  x?: number,
  y?: number
}> = ({ x, y }) => (
  <View style={{ width: x, height: y }}/>
);

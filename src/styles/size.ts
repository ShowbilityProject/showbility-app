import { DimensionValue, FlexStyle } from "react-native";

export const h = (value: DimensionValue) => ({ height: value }) as const;
export const w = (value: DimensionValue) => ({ width: value }) as const;

export const size = (value: DimensionValue) =>
  ({
    width: value,
    height: value,
  }) as const satisfies FlexStyle;

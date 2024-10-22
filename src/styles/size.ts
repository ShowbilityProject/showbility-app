import { FlexStyle } from "react-native";

export const h = (value: number) => ({ height: value }) as const;
export const w = (value: number) => ({ width: value }) as const;

export const size = (value: number) =>
  ({
    width: value,
    height: value,
  }) as const satisfies FlexStyle;

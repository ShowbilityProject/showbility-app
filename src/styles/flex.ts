import { StyleProp, FlexStyle } from "react-native";

interface Props {
  dir: "v" | "h";
  justify?: FlexStyle["justifyContent"];
  align?: FlexStyle["alignItems"];
  gap?: number;
}

export function flex({ dir, justify, align, gap }: Props) {
  return {
    display: "flex",
    flexDirection: ({ h: "row", v: "column" } as const)[dir],
    justifyContent: justify,
    alignItems: align,
    gap: gap,
  } satisfies StyleProp<FlexStyle>;
}

flex.v = (props: Omit<Props, "dir"> = {}) => flex({ dir: "v", ...props });
flex.h = (props: Omit<Props, "dir"> = {}) => flex({ dir: "h", ...props });

export const flexFill = { flex: 1 } as const;

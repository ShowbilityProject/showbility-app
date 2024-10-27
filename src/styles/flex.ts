import { StyleProp, FlexStyle } from "react-native";

interface Props {
  dir: "x" | "y";
  justify?: FlexStyle["justifyContent"];
  align?: FlexStyle["alignItems"];
  gap?: number;
}

export function flex({ dir, justify, align, gap }: Props) {
  return {
    display: "flex",
    flexDirection: ({ x: "row", y: "column" } as const)[dir],
    justifyContent: justify,
    alignItems: align,
    gap: gap,
  } satisfies StyleProp<FlexStyle>;
}

flex.y = (props: Omit<Props, "dir"> = {}) => flex({ dir: "y", ...props });
flex.x = (props: Omit<Props, "dir"> = {}) => flex({ dir: "x", ...props });

export const flexFill = { flex: 1 } as const;

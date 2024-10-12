import { StyleProp, FlexStyle } from "react-native";

interface Props {
  dir: "v" | "h";
  justify: FlexStyle["justifyContent"];
  align: FlexStyle["alignItems"];
}

export const flex = ({ dir, justify, align }: Props) =>
  ({
    display: "flex",
    flexDirection: ({ h: "row", v: "column" } as const)[dir],
    justifyContent: justify,
    alignItems: align,
  }) satisfies StyleProp<FlexStyle>;

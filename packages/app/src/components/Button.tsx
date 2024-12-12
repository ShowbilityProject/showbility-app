import { PropsWithChildren } from "react";
import { Pressable } from "./Pressable";
import {
  PressableProps,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { bg, colors, margin, padding, round, text, w } from "@/styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Variant = "primary" | "mono";

interface ButtonProps extends PressableProps {
  variant?: Variant;
  disabled?: boolean;
  children: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  cta?: boolean;
}

export function Button({
  variant = "primary",
  disabled = false,
  children,
  containerStyle,
  style,
  textStyle,
  cta = false,
  ...props
}: ButtonProps) {
  const { bottom } = useSafeAreaInsets();
  const variantStyle = variantStyles[variant];

  return (
    <View
      style={[cta && [margin.x(20), margin.bottom(bottom)], containerStyle]}
    >
      <Pressable
        style={[
          w("100%"),
          padding(16),
          round.sm,
          variantStyle.pressable,
          style,
        ]}
        {...props}
      >
        <Text
          style={[
            text.h4,
            { textAlign: "center" },
            variantStyle.text,
            textStyle,
          ]}
        >
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

const variantStyles: Record<
  Variant,
  { pressable: StyleProp<ViewStyle>; text: StyleProp<TextStyle> }
> = {
  primary: {
    pressable: [bg(colors.primary)],
    text: [text.color(colors.white)],
  },
  mono: { pressable: [], text: [] },
};

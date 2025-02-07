import { bg, colors, padding, round, text, h, flex, flexFill } from "@/styles";
import { forwardRef, useMemo, useState } from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Variant = "outlined" | "filled";

interface InputProps extends Omit<TextInputProps, "style"> {
  variant?: Variant;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

type State = "disabled" | "focused" | "normal";

export const Input = forwardRef<TextInput, InputProps>(function Input(
  { variant = "outlined", disabled = false, style, textStyle, ...props },
  ref,
) {
  const [focused, setFocused] = useState(false);

  const state = useMemo(
    () => (disabled ? "disabled" : focused ? "focused" : "normal"),
    [disabled, focused],
  );

  return (
    <View style={[h(48), commonStyles, variantStyles[variant](state), style]}>
      <TextInput
        ref={ref}
        editable={!disabled}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={[text.body2, { lineHeight: 16 }, h("100%"), flexFill, textStyle]}
        textAlignVertical="center"
        placeholderTextColor={
          { outlined: colors.gray500, filled: colors.gray600 }[variant]
        }
        {...props}
      />
    </View>
  );
});

export type Input = TextInput;

const commonStyles: StyleProp<ViewStyle> = [
  round.sm,
  padding.x(16),
  flex.x({ align: "center" }),
];

const variantStyles: Record<Variant, (state: State) => StyleProp<ViewStyle>> = {
  outlined: state => [
    {
      borderColor: state === "focused" ? colors.black : colors.gray300,
      borderWidth: 1,
    },
  ],
  filled: state => [bg(colors.gray200)],
};

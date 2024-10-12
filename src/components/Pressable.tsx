import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { Pressable as BasePressable } from "react-native";
import { ComponentProps } from "react";

const AnimatedPressable = Animated.createAnimatedComponent(BasePressable);

type Props = ComponentProps<typeof BasePressable>;

export function Pressable({ style, ...props }: Props) {
  const scale = useSharedValue(1);

  return (
    <AnimatedPressable
      style={[
        useAnimatedStyle(() => ({
          transform: [
            {
              scale: withTiming(scale.value, {
                duration: 200,
                easing: Easing.out(Easing.cubic),
              }),
            },
          ],
        })),
        style,
      ]}
      onPressIn={() => {
        scale.value = 0.97;
      }}
      onPressOut={() => {
        scale.value = 1;
      }}
      {...props}
    />
  );
}

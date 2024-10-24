import { PropsWithChildren } from "react";
import { Pressable } from "./Pressable";
import { PressableProps } from "react-native";

interface ButtonProps extends PressableProps {
  variant?: "primary" | "mono";
}

export function Button({}: ButtonProps) {
  return <Pressable></Pressable>;
}

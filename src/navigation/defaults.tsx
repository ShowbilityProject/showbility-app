import { StackNavigationOptions } from "@react-navigation/stack";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import { text, colors, padding } from "@/styles";

import { TouchableOpacity } from "react-native";

import { ArrowLeftIcon, CloseIcon } from "@/icons";
import { useNavigation } from "@react-navigation/native";

export const defaultHeaderOptions: StackNavigationOptions &
  BottomTabNavigationOptions = {
  headerStatusBarHeight: 56,
  headerTitleStyle: [text.h3],
  headerBackButtonDisplayMode: "minimal",
  headerBackImage: () => <ArrowLeftIcon width={24} height={24} />,
  headerBackgroundContainerStyle: [
    {
      borderBottomWidth: 1,
      borderBottomColor: colors.gray300,
    },
  ],
  headerShadowVisible: false,
  headerRightContainerStyle: padding.right(20),
  headerLeftContainerStyle: padding.left(20),
};

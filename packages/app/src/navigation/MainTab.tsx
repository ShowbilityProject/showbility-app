import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import { HomeRoute, MyRoute, SearchRoute } from "@/pages/MainTabs";
import { text, colors, h, padding } from "@/styles";

import { SafeAreaView } from "react-native-safe-area-context";
import { defaultHeaderOptions } from "./defaults";

export const MainTabs = createBottomTabNavigator({
  initialRouteName: "Home",
  tabBar: props => (
    <SafeAreaView edges={["bottom"]}>
      <BottomTabBar {...props} />
    </SafeAreaView>
  ),
  screenOptions: {
    ...defaultHeaderOptions,
    tabBarActiveTintColor: colors.black,
    tabBarInactiveTintColor: colors.gray700,
    tabBarStyle: [
      h(46),
      padding.top(4),
      padding.bottom(-8),
      { borderTopColor: colors.gray200, borderTopWidth: 1 },
    ],
    tabBarLabelStyle: [text.custom({ weight: 600, size: 10, lineHeight: 14 })],
    animation: "shift",
  },
  screens: {
    Search: SearchRoute,
    Home: HomeRoute,
    My: MyRoute,
  },
});

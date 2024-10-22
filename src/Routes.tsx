import {
  CardStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
} from "@react-navigation/stack";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

import { LoginPage, ImageViewerPage, ContentDetailPage } from "@/pages";
import { HomePage, SearchPage, MyPage } from "@/pages/MainTabs";

import { text, colors, h, padding } from "@/styles";

import { Stack, Tab } from "@/navigation";
import { Dimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { SearchIcon, MyIcon, HomeIcon, ArrowLeftIcon } from "@/icons";

const defaultHeaderOptions: StackNavigationOptions &
  BottomTabNavigationOptions = {
  headerStatusBarHeight: 56,
  headerTitleStyle: [text.h3],
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <ArrowLeftIcon width={24} height={24} style={{ margin: 10 }} />
  ),
  headerBackgroundContainerStyle: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray300,
  },
  headerShadowVisible: false,
};

export function Routes() {
  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{
        ...defaultHeaderOptions,
      }}
    >
      <Stack.Screen
        name="MainTab"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.ModalTransition,
        }}
      />
      <Stack.Screen
        name="ContentDetail"
        component={ContentDetailPage}
        options={{ title: "작품" }}
      />
      <Stack.Screen
        name="ImageViewer"
        component={ImageViewerPage}
        options={{
          gestureDirection: "vertical",
          gestureResponseDistance: Dimensions.get("screen").height,
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
    </Stack.Navigator>
  );
}

function MainTabs() {
  const { bottom } = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        ...defaultHeaderOptions,
        tabBarActiveTintColor: colors.black,
        tabBarInactiveTintColor: colors.gray700,
        tabBarStyle: [
          h(46 + bottom),
          padding.top(4),
          padding.bottom(bottom - 8),
          { borderTopColor: colors.gray200, borderTopWidth: 1 },
        ],
        tabBarLabelStyle: [
          text.custom({ weight: 600, size: 10, lineHeight: 14 }),
        ],
      }}
    >
      <Tab.Screen
        name="Search"
        options={{
          title: "검색",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <SearchIcon width={24} height={24} filled={focused} color={color} />
          ),
        }}
        component={SearchPage}
      />
      <Tab.Screen
        name="Home"
        options={{
          title: "홈",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <HomeIcon width={24} height={24} filled={focused} color={color} />
          ),
        }}
        component={HomePage}
      />
      <Tab.Screen
        name="My"
        options={{
          title: "마이",
          tabBarIcon: ({ focused, color }) => (
            <MyIcon width={24} height={24} filled={focused} color={color} />
          ),
        }}
        component={MyPage}
      />
    </Tab.Navigator>
  );
}

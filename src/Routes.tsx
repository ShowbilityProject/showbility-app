import {
  CardStyleInterpolators,
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import {
  LoginPage,
  ImageViewerPage,
  ContentDetailPage,
  CommentsPage,
  UploadPage,
} from "@/pages";
import { HomePage, SearchPage, MyPage } from "@/pages/MainTabs";

import { text, colors, h, padding } from "@/styles";

// import { Stack, Tab } from "@/navigation";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  SearchIcon,
  MyIcon,
  HomeIcon,
  ArrowLeftIcon,
  CloseIcon,
} from "@/icons";
import { AbilityDetailPage } from "./pages/AbilityDetailPage";
import { SettingsIcon } from "./icons/SettingsIcon";
import { useNavigation } from "@react-navigation/core";
import { createStaticNavigation } from "@react-navigation/native";

function HeaderCloseButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack}>
      <CloseIcon color={colors.black} width={24} height={24} />
    </TouchableOpacity>
  );
}

const defaultHeaderOptions: StackNavigationOptions &
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

const MainTabs = createBottomTabNavigator({
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
  },
  screens: {
    Search: {
      screen: SearchPage,
      options: {
        title: "검색",
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <SearchIcon width={24} height={24} filled={focused} color={color} />
        ),
      },
    },
    Home: {
      screen: HomePage,
      options: {
        title: "홈",
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <HomeIcon width={24} height={24} filled={focused} color={color} />
        ),
      },
    },
    My: {
      screen: MyPage,
      options: {
        title: "마이",
        headerTitle: "",
        tabBarIcon: ({ focused, color }) => (
          <MyIcon width={24} height={24} filled={focused} color={color} />
        ),
        headerRight: () => <SettingsIcon width={24} height={24} />,
      },
    },
  },
});

const Stack = createStackNavigator({
  screenOptions: { ...defaultHeaderOptions },
  screens: {
    MainTab: {
      screen: MainTabs,
      options: { headerShown: false },
    },
    Login: {
      screen: LoginPage,
      options: {
        headerShown: false,
        gestureEnabled: false,
        ...TransitionPresets.ModalTransition,
      },
    },
    Upload: {
      screen: UploadPage,
      options: {
        title: "내 작품 올리기",
        headerMode: "screen",
        headerLeft: () => null,
        headerRight: () => <HeaderCloseButton />,
        ...TransitionPresets.ModalSlideFromBottomIOS,
      },
    },
    ContentDetail: {
      screen: ContentDetailPage,
      options: { title: "작품" },
    },
    Comments: {
      screen: CommentsPage,
      options: { title: "댓글 15" },
    },
    AbilityDetail: {
      screen: AbilityDetailPage,
    },
    ImageViewer: {
      screen: ImageViewerPage,
      options: {
        gestureDirection: "vertical",
        gestureResponseDistance: Dimensions.get("screen").height,
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
      },
    },
  },
});

export const Routes = createStaticNavigation(Stack);

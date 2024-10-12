import {
  StackNavigationOptions,
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TabParams, StackParams } from "./navigation/types";
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";

import { LoginPage } from "@/pages";
import { HomePage, SearchPage, MyPage } from "@/pages/MainTabs";
import { ContentDetailPage } from "./pages/ContentDetailPage";
import { ArrowLeftIcon } from "./icons/ArrowLeftIcon";
import { typo } from "./styles/typography";
import { colors } from "./styles/colors";

const defaultHeaderOptions: StackNavigationOptions &
  BottomTabNavigationOptions = {
  headerStatusBarHeight: 56,
  headerTitleStyle: [typo.h3],
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

const Stack = createStackNavigator<StackParams>();

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
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ ...defaultHeaderOptions }}
    >
      <Tab.Screen
        name="Search"
        options={{ title: "검색" }}
        component={SearchPage}
      />
      <Tab.Screen
        name="Home"
        options={{
          tabBarLabel: "홈",
          headerShown: false,
        }}
        component={HomePage}
      />
      <Tab.Screen name="My" options={{ title: "마이" }} component={MyPage} />
    </Tab.Navigator>
  );
}

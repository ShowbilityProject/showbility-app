import {
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import { TabParams, StackParams } from "./navigation/types";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ShowbilityHome } from "./views/showbility/shobilityHome";

import { LoginPage } from "@/pages";
import { HomePage, SearchPage, MyPage } from "@/pages/MainTabs";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

const Stack = createStackNavigator<StackParams>();

export function Routes() {
  console.log(HeaderStyleInterpolators);

  return (
    <Stack.Navigator
      initialRouteName="MainTab"
      screenOptions={{ headerStyle: { backgroundColor: "red" } }}
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
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
          // ...TransitionPresets.ModalTransition,
        }}
      />
    </Stack.Navigator>
  );
}

const Tab = createBottomTabNavigator<TabParams>();

function MainTabs() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen name="Search" component={SearchPage} />
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="My" component={MyPage} />
    </Tab.Navigator>
  );
}

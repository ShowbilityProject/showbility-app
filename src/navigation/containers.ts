import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type { StackParams, TabParams } from "./types";

export const Stack = createStackNavigator<StackParams>();
export const Tab = createBottomTabNavigator<TabParams>();

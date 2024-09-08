import React, { useCallback } from "react";
import { View, AppRegistry, StatusBar } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StackScreenOptions } from "./app/style/common";

import LoginStackScreen from "./app/views/account/loginStack";
import TopStackScreen from "./app/views/mainTab";

import config from "./app.config";
import { useAuthState } from "./app/common/hooks";

const expoConfig = config();
const RootStack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    JejuGothicOTF: require("./assets/fonts/JejuGothicOTF.otf"),
  });
  const { authenticated, loading } = useAuthState();

  // setVisible(true);
  const iScreen = authenticated ? "App" : "Login";

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && !loading) await SplashScreen.hideAsync();
  }, [fontsLoaded, loading]);

  if (!fontsLoaded || loading) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <StatusBar backgroundColor="#FFF" barStyle="light-content" />
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={iScreen}
          screenOptions={StackScreenOptions}
        >
          <RootStack.Screen
            name="App"
            component={TopStackScreen}
            options={{ headerShown: false, gestureEnabled: false }}
          />
          <RootStack.Screen
            name="Login"
            component={LoginStackScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
}

AppRegistry.registerComponent(expoConfig.name, () => App);

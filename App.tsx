import React, { useCallback, useEffect, useState } from "react";
import { View, AppRegistry, StatusBar } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import * as Updates from "expo-updates";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { verifyToken } from "./app/service/account";
import { StackScreenOptions } from "./app/style/common";

import LoginStackScreen from "./app/views/account/loginStack";
import TopStackScreen from "./app/views/mainTab";

import config from "./app.config";

const { expo } = config();
const RootStack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    JejuGothicOTF: require("./assets/fonts/JejuGothicOTF.otf"),
  });
  const [updated, setUpdated] = useState(false);
  const [tokenAlive, setTokenAlive] = useState<boolean | null>(null);

  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplash(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const update = async () => {
      if (__DEV__) return setUpdated(true);
      const update = await Updates.checkForUpdateAsync();

      if (!update.isAvailable) return setUpdated(true);

      await Updates.fetchUpdateAsync();
      await Updates.reloadAsync();

      setUpdated(true);
    };

    update().catch(alert);
  }, []);

  useEffect(() => {
    verifyToken().then(res => {
      setTokenAlive(res);
    });
  }, []);

  // setVisible(true);
  const iScreen = tokenAlive ? "App" : "Login";
  console.log(tokenAlive, iScreen);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && updated && tokenAlive !== null && !splash)
      await SplashScreen.hideAsync();
  }, [fontsLoaded, updated, tokenAlive, splash]);

  if (!fontsLoaded || !updated || tokenAlive == null) return null;

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

AppRegistry.registerComponent(expo.name, () => App);

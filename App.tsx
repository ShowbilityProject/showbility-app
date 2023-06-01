import React, { useCallback, useEffect, useState } from "react";
import { View, AppRegistry } from "react-native";

import * as SplashScreen from "expo-splash-screen";
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
    'JejuGothicOTF': require('./assets/fonts/JejuGothicOTF.otf'),
  })
  const [tokenAlive, setTokenAlive] = useState(false);

  useEffect(() => {
    verifyToken().then(res => {
      setTokenAlive(res);
    });
    // setTimeout(() => {
    //   SplashScreen.hideAsync();
    // }, 1000);
  }, []);

  // setVisible(true);
  const iScreen = tokenAlive ? "App" : "Login";
  console.log(tokenAlive, iScreen);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <RootStack.Navigator
          initialRouteName={iScreen}
          screenOptions={StackScreenOptions}>
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



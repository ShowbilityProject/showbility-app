import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { verifyToken } from "./app/service/account";
// import SplashScreen from "react-native-splash-screen";
import * as SplashScreen from "expo-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { StackScreenOptions } from "./app/style/common";

import LoginStackScreen from "./app/views/account/loginStack";
import TopStackScreen from "./app/views/mainTab";

import { AppRegistry } from "react-native";

import config from "./app.config";

const { expo } = config();
const RootStack = createStackNavigator();

export default function App() {
  const [tokenAlive, setTokenAlive] = useState(false);

  useEffect(() => {
    verifyToken().then(res => {
      setTokenAlive(res);
    });
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 1000);
  }, []);

  // setVisible(true);
  const iScreen = tokenAlive ? "App" : "Login";
  console.log(tokenAlive, iScreen);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={iScreen}
        screenOptions={StackScreenOptions}>
        <RootStack.Screen
          name="Login"
          component={LoginStackScreen}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="App"
          component={TopStackScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </RootStack.Navigator>
      {/* {isSignedIn ? <TopStackScreen /> : <LoginStackScreen />} */}
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(expo.name, () => App);



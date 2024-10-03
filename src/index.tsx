import React, { useCallback } from "react";
import { View, StatusBar } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { StackScreenOptions } from "./style/common";

import LoginStackScreen from "./views/account/loginStack";
import TopStackScreen from "./views/mainTab";

import { useAuthState } from "./common/hooks";
import { Routes } from "./Routes";
import { registerRootComponent } from "expo";

SplashScreen.preventAutoHideAsync();

function App() {
  // const [fontsLoaded] = useFonts({
  //   JejuGothicOTF: require("./assets/fonts/JejuGothicOTF.otf"),
  // });
  const { authenticated, loading } = useAuthState();

  // setVisible(true);

  const onLayoutRootView = useCallback(() => {
    if (!loading) SplashScreen.hideAsync();
  }, [loading]);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </View>
  );
}

registerRootComponent(App);

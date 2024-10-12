import React, { useCallback } from "react";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "./common/hooks";
import { Routes } from "./Routes";
import { registerRootComponent } from "expo";
import { colors } from "./styles/colors";

SplashScreen.preventAutoHideAsync();

function App() {
  const { authenticated, loading } = useAuthState();

  authenticated;

  const onLayoutRootView = useCallback(() => {
    SplashScreen.hideAsync();
  }, [loading]);

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer
        theme={{
          dark: false,
          colors: {
            primary: colors.primary,
            background: colors.white,
            card: colors.white,
            text: colors.gray900,
            border: colors.gray300,
            notification: colors.primary,
          },
        }}
      >
        <Routes />
      </NavigationContainer>
    </View>
  );
}

registerRootComponent(App);

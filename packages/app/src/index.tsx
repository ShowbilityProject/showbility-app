import React, { useCallback } from "react";
import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { useAuthState } from "./common/hooks";
import { Routes } from "./Routes";
import { registerRootComponent } from "expo";
import { colors } from "./styles/colors";

import "./defaultProps";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function App() {
  const { authenticated, loading } = useAuthState();

  authenticated;

  const onLayoutRootView = useCallback(() => {
    SplashScreen.hideAsync();
  }, [loading]);

  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        {/* <NavigationContainer */}
        {/*   theme={{ */}
        {/*     dark: false, */}
        {/*     colors: { */}
        {/*       primary: colors.primary, */}
        {/*       background: colors.white, */}
        {/*       card: colors.white, */}
        {/*       text: colors.gray900, */}
        {/*       border: colors.gray300, */}
        {/*       notification: colors.primary, */}
        {/*     }, */}
        {/*   }} */}
        {/* > */}
        <Routes
          theme={{
            ...DefaultTheme,
            fonts: {
              regular: { fontFamily: "Pretendard-Regular", fontWeight: "400" },
              medium: { fontFamily: "Pretendard-Medium", fontWeight: "500" },
              bold: { fontFamily: "Pretendard-Bold", fontWeight: "700" },
              heavy: { fontFamily: "Pretendard-Black", fontWeight: "900" },
            },
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
        />
        {/* </NavigationContainer> */}
      </View>
    </QueryClientProvider>
  );
}

registerRootComponent(App);

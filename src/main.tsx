import { View } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import { DefaultTheme } from "@react-navigation/native";

import { colors } from "@/styles/colors";

import { useQuery } from "@tanstack/react-query";
import { loginStatus } from "@/api/user";
import { useDelay } from "@/hooks/useDelay";

import { Navigation } from "@/navigation";

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({
  fade: true,
});

export function App() {
  const delayOver = useDelay(0);
  const { data: isLoggedIn, isLoading } = useQuery(loginStatus);

  if (!delayOver || isLoading) return null;

  return (
    <View style={{ flex: 1 }} onLayout={SplashScreen.hideAsync}>
      <Navigation
        initialState={{
          routes: [
            { name: "MainTab" },
            ...(isLoggedIn ? [] : [{ name: "Login" }]),
          ],
        }}
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
    </View>
  );
}

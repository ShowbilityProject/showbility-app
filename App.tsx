import React from "react";
import { SafeAreaView, AppRegistry, Text, Image } from "react-native";

import * as SplashScreen from "expo-splash-screen";

import config from "./app.config";

const { expo } = config();

SplashScreen.preventAutoHideAsync();

export default function App() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={{
          uri: "https://raw.githubusercontent.com/ShowbilityProject/showbility-app/refs/heads/deploy/close-v1/assets/caution.png",
        }}
        style={{ width: 96, height: 96, marginBottom: 12 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "600", lineHeight: 28 }}>
        쇼빌리티는 지금 준비 중..
      </Text>
      <Text
        style={{
          color: "#9B9B9B",
          fontSize: 16,
          fontWeight: "400",
          lineHeight: 24,
          marginTop: 4,
          marginBottom: 10,
        }}
      >
        곧, 멋진 모습으로 찾아뵐게요!
      </Text>
    </SafeAreaView>
  );
}

AppRegistry.registerComponent(expo.name, () => App);

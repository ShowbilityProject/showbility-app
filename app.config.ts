import { ExpoConfig } from "expo/config";

const isDev = process.env.APP_VARIANT === "development";

const config: ExpoConfig = {
  name: isDev ? "쇼빌리티 Dev" : "쇼빌리티",
  slug: "showbility",
  owner: "showbility",
  version: "1.2.0",
  runtimeVersion: "1.1.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    usesAppleSignIn: true,
    supportsTablet: false,
    bundleIdentifier: `com.showbility.app.${isDev ? "ShowbilityDev" : "Showbility"}`,
    infoPlist: {
      NSPhotoLibraryUsageDescription:
        "사진 업로드를 위해 사진 접근 권한이 필요합니다.",
      ITSAppUsesNonExemptEncryption: false,
    },
  },
  android: {
    package: `com.showbility.app.${isDev ? "ShowbilityDev" : "Showbility"}`,
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "c78be390-3769-4983-be83-9888018dbb02",
    },
  },
  plugins: [
    "expo-secure-store",
    "expo-build-properties",
    "expo-apple-authentication",
    [
      "@react-native-seoul/kakao-login",
      {
        kakaoAppKey: process.env.EXPO_PUBLIC_KAKAO_KEY,
        kotlinVersion: "1.8.0",
      },
    ],
  ],
  updates: {
    url: "https://u.expo.dev/c78be390-3769-4983-be83-9888018dbb02",
  },
};

export default config;

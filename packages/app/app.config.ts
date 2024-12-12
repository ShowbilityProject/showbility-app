import { ExpoConfig } from "expo/config";

const isDev = process.env.APP_VARIANT === "development";

const config: ExpoConfig = {
  name: isDev ? "쇼빌리티 Dev" : "쇼빌리티",
  slug: "showbility",
  owner: "showbility",
  version: "1.2.0",
  runtimeVersion: "1.3.0",
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
      "expo-font",
      {
        fonts: [
          "Pretendard-Thin",
          "Pretendard-ExtraLight",
          "Pretendard-Light",
          "Pretendard-Regular",
          "Pretendard-Medium",
          "Pretendard-SemiBold",
          "Pretendard-Bold",
          "Pretendard-ExtraBold",
          "Pretendard-Black",
        ].map(fontName => `./assets/fonts/${fontName}.otf`),
      },
    ],
    ["@react-native-seoul/kakao-login", { kakaoAppKey: process.env.KAKAO_KEY }],

    [
      "expo-image-picker",
      {
        photosPermission: "사진 업로드를 위해 사진 접근 권한이 필요합니다.",
        cameraPermission: "사진 업로드를 위해 카메라 접근 권한이 필요합니다.",
      },
    ],
  ],
  updates: {
    url: "https://u.expo.dev/c78be390-3769-4983-be83-9888018dbb02",
  },
};

export default config;

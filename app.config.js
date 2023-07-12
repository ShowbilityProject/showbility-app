export default () => ({
  "expo": {
    name: "쇼빌리티",
    slug: "showbility",
    owner: "showbility",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.showbility.app.Showbility"
    },
    android: {
      package: "com.showbility.app.Showbility",
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      }
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    extra: {
      eas: {
        projectId: "c78be390-3769-4983-be83-9888018dbb02"
      }
    },
    plugins: [
      "expo-build-properties",
      "expo-apple-authentication",
      [
        "@react-native-seoul/kakao-login",
        {
          kakaoAppKey: process.env.EXPO_PUBLIC_KAKAO_KEY,
          kotlinVersion: "1.8.0"
        }
      ]
    ]
  }
});

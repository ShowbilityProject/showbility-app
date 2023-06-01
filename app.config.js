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
      bundleIdentifier: "com.showbility.showbility"
    },
    android: {
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
      [
        "@react-native-seoul/kakao-login",
        {
          kakaoAppKey: process.env.KAKAO_APP_KEY,
          // overrideKakaoSDKVersion: "2.9.0",
          // kotlinVersion: "1.5.10"
        }
      ]
    ]
  }
});

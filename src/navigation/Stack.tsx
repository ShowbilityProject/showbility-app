import { createStackNavigator } from "@react-navigation/stack";

import {
  LoginRoute,
  UploadRoute,
  ContentDetailRoute,
  CommentsRoute,
  AbilityDetailRoute,
  ImageViewerRoute,
} from "@/pages";

import { defaultHeaderOptions } from "./defaults";
import { MainTabs } from "./MainTab";
import { registerScreens } from "@/pages/Register";

export const Stack = createStackNavigator({
  screenOptions: { ...defaultHeaderOptions },
  screens: {
    MainTab: {
      screen: MainTabs,
      options: { headerShown: false },
    },
    Login: LoginRoute,
    Upload: UploadRoute,
    ContentDetail: ContentDetailRoute,
    Comments: CommentsRoute,
    AbilityDetail: AbilityDetailRoute,
    ImageViewer: ImageViewerRoute,
  },
  groups: {
    Register: {
      screenOptions: { title: "회원가입" },
      screens: registerScreens,
    },
  },
});

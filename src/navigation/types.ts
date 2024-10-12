import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import type { StackScreenProps } from "@react-navigation/stack";

export type StackParams = {
  MainTab: NavigatorScreenParams<TabParams>;
  Login: undefined;
  ContentDetail: { id: string };
  ImageViewer: { uri: string };
};

export type TabParams = {
  Home: undefined;
  Search: undefined;
  My: undefined;
};

export type StackPageProps<T extends keyof StackParams> = StackScreenProps<
  StackParams,
  T
>;

export type TabPageProps<T extends keyof TabParams> = CompositeScreenProps<
  BottomTabScreenProps<TabParams, T>,
  StackPageProps<keyof StackParams>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends StackParams {}
  }
}

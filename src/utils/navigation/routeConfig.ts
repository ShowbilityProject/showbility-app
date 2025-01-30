import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  EventMapBase,
  NavigationState,
  ParamListBase,
  PathConfig,
  RouteConfigProps,
  StaticNavigation,
} from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";

type RouteConfigBase<ScreenOptions extends {}> = Omit<
  RouteConfigProps<
    ParamListBase,
    keyof ParamListBase,
    NavigationState,
    ScreenOptions,
    EventMapBase,
    unknown
  >,
  "name"
> & {
  /**
   * Callback to determine whether the screen should be rendered or not.
   * This can be useful for conditional rendering of screens,
   * e.g. - if you want to render a different screen for logged in users.
   *
   * You can use a custom hook to use custom logic to determine the return value.
   *
   * @example
   * ```js
   * if: useIsLoggedIn
   * ```
   */
  if?: () => boolean;
  /**
   * Linking config for the screen.
   * This can be a string to specify the path, or an object with more options.
   *
   * @example
   * ```js
   * linking: {
   *   path: 'profile/:id',
   *   exact: true,
   * },
   * ```
   */
  linking?: PathConfig<ParamListBase> | string;
  /**
   * Static navigation config or Component to render for the screen.
   */
  screen: StaticNavigation<any, any, any> | React.ComponentType<any>;
};

export const bottomTabRoute = <
  T extends RouteConfigBase<BottomTabNavigationOptions>,
>(
  config: T,
) => config;

export const stackRoute = <T extends RouteConfigBase<StackNavigationOptions>>(
  config: T,
) => config;

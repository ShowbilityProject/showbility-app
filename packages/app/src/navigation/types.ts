import { StaticParamList } from "@react-navigation/native";
import { Stack } from "./Stack";
import { StackNavigationProp } from "@react-navigation/stack";

type ParamList = StaticParamList<typeof Stack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends ParamList {}
  }
}

declare module "@react-navigation/native" {
  export function useNavigation<T = StackNavigationProp<ParamList>>(): T;
}

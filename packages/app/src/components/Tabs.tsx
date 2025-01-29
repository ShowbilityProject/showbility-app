import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useMemo,
} from "react";
import { ensure } from "@/utils/assert";
import { TouchableOpacity, View, StyleProp, ViewStyle } from "react-native";
import { flex } from "@/styles";

export function createTabs<T>() {
  interface Props {
    value: T;
    onChange: (value: T) => void;
  }

  const TabContext = createContext<Props | null>(null);

  function Tabs({
    children,
    style,
    ...props
  }: PropsWithChildren<Props> & { style?: StyleProp<ViewStyle> }) {
    return (
      <TabContext.Provider value={props}>
        <View style={[flex.x({ align: "center" }), style]}>{children}</View>
      </TabContext.Provider>
    );
  }

  Tabs.Item = ({
    value,
    children,
    style,
  }: {
    value: T;
    children: ReactNode | ((isActive: boolean) => ReactNode);
    style?:
      | StyleProp<ViewStyle>
      | ((isActive: boolean) => StyleProp<ViewStyle>);
  }) => {
    const { value: currentValue, onChange } = ensure(useContext(TabContext));
    const isActive = useMemo(
      () => value === currentValue,
      [value, currentValue],
    );

    return (
      <TouchableOpacity
        style={[typeof style === "function" ? style(isActive) : style]}
        onPress={() => onChange(value)}
      >
        {typeof children === "function" ? children(isActive) : children}
      </TouchableOpacity>
    );
  };

  return Tabs;
}

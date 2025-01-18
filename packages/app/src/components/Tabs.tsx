import { createContext, PropsWithChildren, ReactNode, useContext } from "react";
import { ensure } from "@/utils/assert";
import { TouchableOpacity, View, Text } from "react-native";
import { colors, flex, padding, text } from "@/styles";

export function createTabs<T>() {
  interface Props {
    value: T;
    onChange: (value: T) => void;
  }

  const TabContext = createContext<Props | null>(null);

  function Tabs({ children, ...props }: PropsWithChildren<Props>) {
    return (
      <TabContext.Provider value={props}>
        <View style={[flex.x({ align: "center" }), padding.x(12)]}>
          {children}
        </View>
      </TabContext.Provider>
    );
  }

  Tabs.Item = ({
    value,
    children,
  }: {
    value: T;
    children: ReactNode | ((color: string) => ReactNode);
  }) => {
    const { value: currentValue, onChange } = ensure(useContext(TabContext));

    const color = value === currentValue ? colors.black : colors.gray500;

    return (
      <TouchableOpacity
        style={[padding.x(8), padding.y(14)]}
        onPress={() => onChange(value)}
      >
        <Text
          style={[
            text.custom({ size: 22, lineHeight: 28, weight: 600 }),
            { color },
          ]}
        >
          {typeof children === "function" ? children(color) : children}
        </Text>
      </TouchableOpacity>
    );
  };

  return Tabs;
}

import React, { type PropsWithChildren } from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { normalizeFontSize } from "../font";
import { Color } from "../../style/colors";

interface Props extends PropsWithChildren {
  href: any; // TODO
  style?: any; // TODO
}

export const Anchor: React.FC<Props> = ({ href, style, children }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(...(href as never))}>
      <Text
        style={style}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

import React, { PropsWithChildren } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { normalizeFontSize } from "../font";
import { Color } from "../../style/colors";

const styles = StyleSheet.create({
  wrapper: {
    height: 52,
  },
  button: {
    width: "100%",
    height: 52,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "JejuGothicOTF",
    fontSize: normalizeFontSize(17),
  },
});

interface Props extends PropsWithChildren {
  onPress: () => void;
  disabled?: boolean;
  secondary?: boolean;
}

export const ActionButton: React.FC<Props> = ({
  onPress,
  disabled,
  children,
  secondary,
}) => (
  <View style={{ ...styles.wrapper }}>
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: disabled
            ? Color.veryLightGrey
            : secondary
            ? Color.veryLightGrey
            : Color.birghtOrange,
        },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.text,
          {
            color: disabled
              ? Color.veryLightPink
              : secondary
              ? Color.brownishGrey
              : Color.white,
          },
        ]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  </View>
);

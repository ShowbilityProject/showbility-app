import React, { type Dispatch } from "react";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { Color } from "../../style/colors";

interface Props {
  checked: boolean;
  toggle: Dispatch<boolean> | Dispatch<boolean>[];
}

export const CheckBox: React.FC<Props> = ({ checked, toggle }) => (
  <Pressable
    onPress={() =>
      Array.isArray(toggle)
        ? toggle.forEach(t => t(!checked))
        : toggle(!checked)
    }
  >
    {checked ? (
      <Image
        style={styles.selectImage}
        source={require("../../../assets/imgs/select_icon_3x.png")}
      />
    ) : (
      <View style={styles.circle} />
    )}
  </Pressable>
);

const styles = StyleSheet.create({
  selectImage: {
    width: 24,
    height: 24,
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Color.veryLightPink,
  },
});

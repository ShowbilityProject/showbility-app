import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {normalizeFontSize} from "../../../component/font";
import {Color} from "../../../style/colors";

const styles = new StyleSheet.create({
  wrapper: {
    height: 52,
  },
  button: {
    width: '100%',
    height: 52,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(17),
  },
});

export default function SubmitButton({onPress, disabled, children, variant, style}) {
  const secondary = variant === "secondary";
  return (
    <View style={{...styles.wrapper, ...style}}>
      <TouchableOpacity
        style={[styles.button, {
          backgroundColor: disabled
            ? Color.veryLightGrey
            : secondary ? Color.veryLightGrey : Color.birghtOrange
        }]}
        onPress={onPress}
        disabled={disabled}>
        <Text style={[styles.text, {
          color: disabled
            ? Color.veryLightPink
            : secondary ? Color.veryLightPink : Color.white
        }]}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

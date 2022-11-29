import * as React from 'react';
import {StyleSheet, Text, TouchableOpacity} from "react-native";
import {Color} from "../../../style/colors";
import {normalizeFontSize} from "../../../component/font";


const styles = new StyleSheet.create({
  buttonText: {
    fontFamily: 'JejuGothicOTF',
    // color: Color.veryLightPink,
    fontSize: normalizeFontSize(14),
    letterSpacing: -0.16,
    paddingLeft: 10,
  }
});

export default function TextFieldButton(
  {
    onPress,
    disabled,
    validated,
    children
  }) {
  const showDisabled = !validated || disabled

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={showDisabled}
    >
      <Text
        style={[styles.buttonText, {
          color: showDisabled ? Color.veryLightPink : Color.birghtOrange
        }]}
      >
        {children}
      </Text>
    </TouchableOpacity>
  )
}




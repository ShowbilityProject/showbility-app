import * as React from 'react';
import {StyleSheet, Text, TextInput, View} from "react-native";
import {Color} from "../../../style/colors";
import {normalizeFontSize} from "../../../component/font";

const styles = new StyleSheet.create({
  wrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
  },
  textInput: {
    fontSize: normalizeFontSize(17),
    lineHeight: 22,
    letterSpacing: -0.41,
    fontFamily: 'JejuGothicOTF',
    flex: 1,
    height: 60,
  },
  errorText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(12),
    lineHeight: 21,
    letterSpacing: -0.1,
    color: Color.birghtOrange,
    position: 'absolute',
    right: 0,
    bottom: -28,
  },
});

export default function TextField(
  {
    value, setValue, helperText,
    error, validator, errorText,
    children,
    ...props
  }) {
  const [focus, setFocus] = React.useState(false);
  const validated = (validator !== undefined)
    ? validator(value)
    : (error !== undefined)
      ? !error
      : value.length > 0;
  const showError = !validated && value.length > 0;

  return (
    <View style={[styles.wrapper, {
      borderBottomColor: showError
        ? Color.birghtOrange
        : focus
          ? Color.black
          : Color.paleGray
    }]}>
      <TextInput
        style={styles.textInput}
        value={value}
        onChangeText={setValue}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        {...props}
      />
      {children &&
        React.cloneElement(children, {validated})}
      {showError && <Text style={styles.errorText}>{errorText}</Text>}
    </View>
  )
}

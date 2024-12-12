import * as React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type GestureResponderEvent, TextInputProps,
} from "react-native";
import { Color } from "../../style/colors";
import { normalizeFontSize } from "../font";
import { PropsWithChildren, useCallback, useState } from "react";

const styles = StyleSheet.create({
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
  buttonText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
    letterSpacing: -0.16,
    paddingLeft: 10,
  }
});

interface Props extends TextInputProps {
  // value: string;
  // setValue: (text: string) => void;
  // validate?: (text: string) => string | void;
  error?: string | null;
  placeholder?: string;
  secureTextEntry?: boolean;
}

const InputComponent: React.FC<Props> = ({
  // value,
  // setValue,
  error,
  // validate,
  children,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);
  // const [error, setError] = useState<string | null>(null);
  
  
  // const onChange = useCallback((text: string) => {
  //   const errorMessage = validate?.(text);
  //
  //   errorMessage
  //     ? setError(errorMessage)
  //     : setError(null);
  //
  //   setValue(text);
  // }, [validate, setValue, setError]);
  
  return (
    <View style={[styles.wrapper, {
      borderBottomColor: error
        ? Color.birghtOrange
        : focused
          ? Color.black
          : Color.paleGray
    }]}>
      <TextInput
        style={styles.textInput}
        // value={value}
        // onChangeText={setValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
      {children}
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

interface ButtonProps extends PropsWithChildren {
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const InputButton: React.FC<ButtonProps> = ({
  onPress,
  disabled,
  children,
}) => (
  <TouchableOpacity
    onPress={onPress}
    disabled={disabled}
  >
    <Text
      style={[styles.buttonText, {
        color: disabled ? Color.veryLightPink : Color.birghtOrange
      }]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export const Input = Object.assign(
  InputComponent,
  { Button: InputButton },
);

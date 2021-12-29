import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from 'react-native';
import {requestSignIn} from '../../../service/account';
import {Color} from '../../../style/colors';

const styles = new StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 24,
    flex: 1,
  },
  textInputWrapper: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Color.paleGray,
  },
  focusedBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Color.black,
  },
  errorBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: Color.birghtOrange,
  },
  textInput: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    fontFamily: 'JejuGothicOTF',
    flex: 1,
    height: 60,
  },
  buttonWrapper: {
    flex: 1,
    marginTop: 20,
  },
  buttonStyle: {
    width: '100%',
    height: 52,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
  },
  errorText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 12,
    lineHeight: 21,
    letterSpacing: -0.1,
    color: Color.birghtOrange,
    position: 'absolute',
    right: 0,
    bottom: -31,
  },
});

export function EmailLoginScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState('');

  const getBorderStyle = value => {
    if (value === focusedInput) return styles.focusedBorderBottom;
    else return styles.borderBottom;
  };

  const handleDismiss = () => {
    Keyboard.dismiss();
    setFocusedInput('');
  };

  const validateInputs = React.useCallback(() => {
    const isEmailValidate = validateEmail();
    // setShowEmailError(!ret);
    return isEmailValidate & (password.length > 0);
  }, [password, validateEmail]);

  const validateEmail = React.useCallback(() => {
    const emailRexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    let ret = emailRexp.test(email);
    return ret;
  }, [email]);

  const getButtonBackColor = () => {
    return validateInputs() ? Color.birghtOrange : '#f7f7f7';
  };

  const getButtonTextColor = () => {
    return validateInputs() ? Color.white : Color.veryLightPink;
  };

  const handleSumbit = async () => {
    if (!validateInputs()) return false;
    else {
      let ret = await requestSignIn(email, password);
      if (!ret) Alert.alert('로그인 오류', '이메일과 비밀번호를 확인해주세요.');
      else {
        navigation.replace('App');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleDismiss()}>
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, getBorderStyle('email')]}>
          <TextInput
            style={[styles.textInput]}
            placeholder={'이메일'}
            onChangeText={v => {
              setEmail(v);
              validateEmail();
            }}
            onFocus={() => setFocusedInput('email')}
            keyboardType="email-address"
          />
          {!validateEmail() ? (
            <Text style={styles.errorText}>이메일 형식을 확인해주세요.</Text>
          ) : null}
        </View>
        <View style={[styles.textInputWrapper, getBorderStyle('password')]}>
          <TextInput
            style={styles.textInput}
            placeholder={'비밀번호'}
            onChangeText={v => setPassword(v)}
            onFocus={() => setFocusedInput('password')}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            style={[
              styles.buttonStyle,
              {
                backgroundColor: getButtonBackColor(),
              },
            ]}
            title={'회원가입'}
            onPress={() => handleSumbit()}>
            <Text style={[styles.confirmText, {color: getButtonTextColor()}]}>
              로그인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

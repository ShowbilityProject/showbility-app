import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView, ScrollView, Alert
} from "react-native";
import {
  requestResetPassword
} from "../../../service/account";
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";
import {normalizeFontSize} from "../../../component/font";
import {useNavigation} from "@react-navigation/native";
import {useCallback} from "react";

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFound: {},
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 24,
  },
  details: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(16),
    paddingTop: 91,
    paddingBottom: 15,
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
  }
});

export function ResetPassword({route}) {
  const navigation = useNavigation();
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');

  const {email, authHash} = route.params;


  const validatePassword = password => (
    password.length >= 10
    && /[0-9]/g.test(password)
    && /[a-zA-Z]/g.test(password)
    && /[!@#$%^&*\-_]/g.test(password)
  );

  const validatePasswordSync = v => v === password;

  const validateFields = useCallback(() => (
    validatePassword(password)
    && validatePasswordSync(passwordCheck)
  ), [password, validatePassword, passwordCheck, validatePasswordSync])

  const handleSubmit = () => {
    if (!validateFields()) return false;
    requestResetPassword(email, password, authHash).then(res => {
      if (res) {
        alert("비밀번호가 재설정되었습니다.")
      } else {
        alert("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.")
      }
    });
  }

  const alert = (message) =>
    Alert.alert(
      "Alert",
      message,
      [
        {text: "확인", onPress: () => navigation.popToTop()}
      ]
    );

  return (
    <TouchableWithoutFeedback>
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        keyboardVerticalOffset={70}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
            <Text style={styles.details}>새로운 비밀번호를 입력해주세요.</Text>

            <TextField
              placeholder='비밀번호'
              value={password}
              setValue={setPassword}
              validator={validatePassword}
              errorText={'영문 + 숫자 + 특수문자 포함 10자 이상 입력해주세요'}
              secureTextEntry
            />

            <TextField
              placeholder={'비밀번호 확인'}
              value={passwordCheck}
              setValue={setPasswordCheck}
              validator={v => v === password}
              errorText={'비밀번호가 일치하지 않습니다'}
              secureTextEntry
            />

          </ScrollView>
          <View style={styles.buttonWrapper}>
            <SubmitButton
              style={{flex: 1}}
              onPress={handleSubmit}
              disabled={!validateFields()}
            >
              비밀번호 재설정하기
            </SubmitButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import TextField from "./TextField";
import TextFieldButton from "./TextFieldButton";
import SubmitButton from "./SubmitButton";
import {normalizeFontSize} from "../../../component/font";


const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
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
  },
});

export function FindPasswordScreen() {
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [validationCode, setValidationCode] = React.useState('');

  const validateEmail = email => {
    const emailRegex = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return emailRegex.test(email);
  }

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
            <Text style={styles.details}>쇼빌리티 가입시 등록한 정보를 입력해주세요</Text>

            <TextField
              placeholder='이름'
              value={name}
              setValue={setName}
            />
            <TextField
              placeholder='전화번호'
              keyboardType='numeric'
              value={phoneNumber}
              setValue={v => setPhoneNumber(v.replace(/[^0-9]/g, ''))}
            />

            <TextField
              placeholder='이메일'
              value={email}
              setValue={setEmail}
              validator={validateEmail}
              errorText={'이메일 형식을 확인해 주세요'}
            >
              <TextFieldButton>
                인증요청
              </TextFieldButton>
            </TextField>

            <TextField
              placeholder='인증번호 입력'
              value={validationCode}
              setValue={setValidationCode}
            >
              <TextFieldButton>
                인증하기
              </TextFieldButton>
            </TextField>

          </ScrollView>
          <View style={styles.buttonWrapper}>
            <SubmitButton
              // onPress={() => setModalVisible(true)}
            >
              비밀번호 재설정하기
            </SubmitButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

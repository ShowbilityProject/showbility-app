import * as React from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import {
  requestFindPasswordEmailVerification,
  verifyPasswordResetCode,
  requestResetPassword,
} from "../../../service/account";
import TextField from "./TextField";
import TextFieldButton from "./TextFieldButton";
import SubmitButton from "./SubmitButton";
import {normalizeFontSize} from "../../../component/font";
import {useNavigation} from "@react-navigation/native";


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

export function FindPasswordScreen({route}) {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState(route.params?.email || '');
  const [validationCode, setValidationCode] = React.useState('');

  const [emailSent, setEmailSent] = React.useState(false);

  const [authHash, setAuthHash] = React.useState('');

  const validateEmail = email => {
    const emailRegex = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return emailRegex.test(email);
  }

  const validateReset = () => (
    name
    && phoneNumber
    && email
    && emailSent
    && validationCode
    && authHash
  )

  const handleEmailRequest = () => {
    if (!validateEmail()) return false;
    requestFindPasswordEmailVerification(name, phoneNumber, email).then(res => {
      if (res) {
        setEmailSent(true);
      } else {
        alert("이미 사용중인 이메일입니다.");
      }
    })
  }

  const handleValidateEmailCode = () => {
    if (!validationCode) return false;
    verifyPasswordResetCode(email, validationCode).then(authHash => {
      if (authHash) {
        setAuthHash(authHash);
      } else {
        alert("인증번호가 일치하지 않습니다. 다시 입력해주세요.");
      }
    })
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
              <TextFieldButton
                onPress={handleEmailRequest}
                disabled={emailSent}
              >
                {emailSent ? "발송완료" : "인증요청"}
              </TextFieldButton>
            </TextField>

            <TextField
              placeholder='인증번호 입력'
              value={validationCode}
              setValue={setValidationCode}
            >
              <TextFieldButton
                onPress={handleValidateEmailCode}
                disabled={authHash}
              >
                {authHash ? "인증 완료" : "인증하기"}
              </TextFieldButton>
            </TextField>

          </ScrollView>
          <View style={styles.buttonWrapper}>
            <SubmitButton
              onPress={() => navigation.navigate("비밀번호 재설정", {email, authHash})}
              disabled={!validateReset()}
            >
              비밀번호 재설정하기
            </SubmitButton>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

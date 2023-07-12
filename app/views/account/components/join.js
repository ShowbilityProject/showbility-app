import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  KeyboardAvoidingView,
  ScrollView, Platform,
} from 'react-native';
import Modal from 'react-native-modal';

import {isEmpty} from '../../../common/util';
import {normalizeFontSize} from '../../../component/font';
import {
  requestEmailValidationCode,
  verifyEmailCode,
  requestDuplicateEmailCheck,
  requestDuplicateNicknameCheck,
  requestSignUp,
} from '../../../service/account';
import {Color} from '../../../style/colors';

import TextField from "./TextField";
import TextFieldButton from "./TextFieldButton";
import SubmitButton from "./SubmitButton";

const styles = new StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    paddingHorizontal: 15,
    paddingTop: 24,
    paddingBottom: 10,
  },
  agreeText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(17),
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  smallAgreeText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(15),
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  allAgreeWrapper: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 20,
  },
  agreeWrapper: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  buttonWrapper: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  buttonStyle: {
    width: '100%',
    height: 52,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  joinConfirmText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(17),
  },
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
  modalWrapper: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: Color.white,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
});


export function JoinScreen() {
  const navigation = useNavigation();
  const [name, setName] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');

  const [email, setEmail] = React.useState('');
  const [isNicknameValid, setIsNicknameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [showEmailError, setShowEmailError] = React.useState(false);
  const [validationCode, setValidationCode] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [nickname, setNickname] = React.useState('');
  const [showNicknameError, setShowNicknameError] = React.useState(false);

  const [agreedRule, setAgreedRule] = React.useState(false);
  const [agreeMarketing, setAgreeMarketing] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState('');

  const [isModalVisible, setModalVisible] = React.useState(false);

  const [emailSent, setEmailSent] = React.useState(false);
  const [emailVerified, setEmailVerified] = React.useState(false);


  const selectIcon = require('../../../../assets/imgs/select_icon_3x.png');
  const emailRexp = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  const handleEmailValidationRequest = () => {
    if (!emailRexp.test(email)) return false;
    requestEmailValidationCode(email).then(res => {
      if (res) {
        setEmailSent(true);
      } else {
        alert("이미 사용중인 이메일입니다.");
      }
    })
  }

  const handleVerifyEmailCode = () => {
    verifyEmailCode(email, validationCode).then(res => {
      if (res) {
        setEmailVerified(true);
      } else {
        alert("인증번호가 일치하지 않습니다. 다시 입력해주세요.");
      }
    })
  }

  const handleDuplicateCheck = () => {
    if (!emailRexp.test(email)) return false;
    else
      requestDuplicateEmailCheck(email).then(res => {
        setIsEmailValid(res);
        setShowEmailError(!res);
      });
  };

  const handleNicknameDupCheck = () => {
    if (isEmpty(nickname)) return false;
    else
      requestDuplicateNicknameCheck(nickname).then(res => {
        setIsNicknameValid(res);
        setShowNicknameError(!res);
      });
  };

  const validateEmail = email => {
    const emailRegex = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    return emailRegex.test(email);
  }

  const validatePassword = password => (
    password.length >= 10
    && /[0-9]/g.test(password)
    && /[a-zA-Z]/g.test(password)
    && /[!@#$%^&*\-_]/g.test(password)
  );

  const validatePasswordSync = () => {
    if (password.length === 0) return true;
    else return validatePassword();
  };

  const validateInputs = () => (
    nickname.length === 0
    && !emailRexp.test(email)
    && !validatePassword()
    && !agreedRule
    && !isEmailValid
  );

  const handleAgreeAll = React.useCallback(() => {
    let value = true;
    if (agreedRule & agreeMarketing) value = false;
    setAgreedRule(value);
    setAgreeMarketing(value);
  }, [agreeMarketing, agreedRule]);

  const getSelectIcon = value => {
    if (value) return <Image style={styles.selectImage} source={selectIcon}/>;
    else return <View style={styles.circle}/>;
  };

  const getButtonBackColor = () => {
    return validateInputs() ? Color.birghtOrange : '#f7f7f7';
  };

  const getButtonTextColor = () => {
    return validateInputs() ? Color.white : Color.veryLightPink;
  };

  const handleSumbit = async () => {
    if (!validateInputs()) return false;
    else {
      let ret = await requestSignUp(
        nickname,
        email,
        password,
        agreedRule,
        agreeMarketing,
      );
      if (!ret) Alert.alert('회원가입 오류', '회원가입 오류입니다.');
      else {
        Alert.alert('회원가입이 완료되었습니다.', '', [
          {text: '확인', onPress: async () => navigation.replace('App')},
        ]);
      }
    }
  };

  const getBorderStyle = value => {
    if (value === focusedInput) return styles.focusedBorderBottom;
    else return styles.borderBottom;
  };

  const alert = (message) =>
    Alert.alert(
      "Alert",
      message,
      [
        {text: "확인"}
      ]
    );

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={70}
      >
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}>
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
              error={true}
            >
              <TextFieldButton
                onPress={handleEmailValidationRequest}
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
                onPress={handleVerifyEmailCode}
                disabled={emailVerified}
              >
                {emailVerified ? "확인 완료" : "인증하기"}
              </TextFieldButton>
            </TextField>

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

            <TextField
              placeholder='별명'
              value={nickname}
              setValue={setNickname}
            >
              <TextFieldButton>
                중복확인
              </TextFieldButton>
            </TextField>
          </ScrollView>


          <View style={styles.buttonWrapper}>
            <SubmitButton
              onPress={() => setModalVisible(true)}
            >
              회원가입
            </SubmitButton>
          </View>

          <Modal
            style={styles.modalWrapper}
            backdropOpacity={0.4}
            isVisible={isModalVisible}
            onBackdropPress={() => setModalVisible(false)}
          >
            <View style={styles.modal}>
              <View style={[styles.allAgreeWrapper, styles.borderBottom]}>
                <Pressable onPress={() => handleAgreeAll()}>
                  {getSelectIcon(agreedRule & agreeMarketing)}
                </Pressable>
                <Text style={styles.agreeText}>서비스 이용약관 전체 동의</Text>
              </View>
              <View style={[styles.agreeWrapper, {marginTop: 20,}]}>
                <Pressable onPress={() => setAgreedRule(!agreedRule)}>
                  {getSelectIcon(agreedRule)}
                </Pressable>
                <Text style={styles.smallAgreeText}>
                  [필수] 이용약관 및 개인정보 처리방침
                </Text>
              </View>
              <View style={styles.agreeWrapper}>
                <Pressable onPress={() => setAgreeMarketing(!agreeMarketing)}>
                  {getSelectIcon(agreeMarketing)}
                </Pressable>
                <Text style={styles.smallAgreeText}>
                  [선택] 마케팅 정보 수집 및 수신 동의
                </Text>
              </View>
              <Text>
                당신의 재능 활동은 연결된 계정에 노출되지 않습니다.
              </Text>

              <SubmitButton
                onPress={() => setModalVisible(true)}
              >
                회원가입
              </SubmitButton>


            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

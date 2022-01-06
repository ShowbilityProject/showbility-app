import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { isEmpty } from '../../../common/util';
import {
  requestDuplicateEmailCheck,
  requestDuplicateNicknameCheck,
  requestSignUp,
} from '../../../service/account';
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
  agreeText: {
    fontSize: 17,
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  smallAgreeText: {
    fontSize: 15,
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
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
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
    fontSize: 17,
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
  checkDup: {
    fontFamily: 'JejuGothicOTF',
    color: Color.veryLightPink,
    fontSize: 16,
    letterSpacing: -0.16,
    paddingLeft: 10,
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

export function JoinScreen() {
  const navigation = useNavigation();
  const [nickname, setNickname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [isNicknameValid, setIsNicknameValid] = React.useState(false);
  const [isEmailValid, setIsEmailValid] = React.useState(false);
  const [showEmailError, setShowEmailError] = React.useState(false);
  const [showNicknameError, setShowNicknameError] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [passwordCheck, setPasswordCheck] = React.useState('');
  const [agreedRule, setAgreedRule] = React.useState(false);
  const [agreeMarketing, setAgreeMarketing] = React.useState(false);
  const [focusedInput, setFocusedInput] = React.useState('');

  const selectIcon = require('../../../../assets/imgs/select_icon_3x.png');
  const emailRexp = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

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

  const validatePassword = React.useCallback(() => {
    if (password.legnth < 10) {
      return false;
    } else if (!/[0-9]/g.test(password)) {
      return false;
    } else if (!/[a-zA-Z]/g.test(password)) {
      return false;
    } else if (!/[!|@|#|$|%|^|&|*|\-|_]/g.test(password)) {
      return false;
    } else return true;
  }, [password]);

  const validatePasswordSync = () => {
    if (password.length === 0) return true;
    else return validatePassword();
  };

  const validateInputs = () => {
    if (nickname.length === 0) return false;
    else if (!emailRexp.test(email)) return false;
    else if (!validatePassword()) return false;
    else if (!agreedRule) return false;
    else if (!isEmailValid) return false;
    else return true;
  };

  const handleAgreeAll = React.useCallback(() => {
    let value = true;
    if (agreedRule & agreeMarketing) value = false;
    setAgreedRule(value);
    setAgreeMarketing(value);
  }, [agreeMarketing, agreedRule]);

  const getSelectIcon = value => {
    if (value) return <Image style={styles.selectImage} source={selectIcon} />;
    else return <View style={styles.circle} />;
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

  const handleDismiss = () => {
    Keyboard.dismiss();
    setFocusedInput('');
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleDismiss()}>
      <View style={styles.container}>
        <View style={[styles.textInputWrapper, getBorderStyle('nickname')]}>
          <TextInput
            style={styles.textInput}
            placeholder={'닉네임'}
            onChangeText={v => {
              setIsNicknameValid(false);
              setNickname(v);
              setShowNicknameError(false);
            }}
            onFocus={() => setFocusedInput('nickname')}
          />
          {isNicknameValid ? (
            <Text style={[styles.checkDup, {color: Color.birghtOrange}]}>
              확인완료
            </Text>
          ) : (
            <TouchableOpacity onPress={() => handleNicknameDupCheck()}>
              <Text style={styles.checkDup}>중복확인</Text>
            </TouchableOpacity>
          )}
          {showNicknameError ? (
            <Text style={styles.errorText}>이미 사용 중인 닉네임 입니다.</Text>
          ) : null}
        </View>
        <View style={[styles.textInputWrapper, getBorderStyle('email')]}>
          <TextInput
            style={styles.textInput}
            placeholder={'이메일'}
            onChangeText={v => {
              setIsEmailValid(false);
              setEmail(v);
              setShowEmailError(false);
            }}
            onFocus={() => setFocusedInput('email')}
            keyboardType="email-address"
          />
          {isEmailValid ? (
            <Text style={[styles.checkDup, {color: Color.birghtOrange}]}>
              확인완료
            </Text>
          ) : (
            <TouchableOpacity onPress={() => handleDuplicateCheck()}>
              <Text style={styles.checkDup}>중복확인</Text>
            </TouchableOpacity>
          )}
          {showEmailError ? (
            <Text style={styles.errorText}>이미 사용 중인 이메일 입니다.</Text>
          ) : null}
        </View>
        <View style={[styles.textInputWrapper, getBorderStyle('password')]}>
          <TextInput
            style={styles.textInput}
            placeholder={'비밀번호(영문+숫자+특수문자 10자 이상)'}
            onChangeText={v => setPassword(v)}
            secureTextEntry={true}
            onFocus={() => setFocusedInput('password')}
          />
          {!validatePasswordSync() ? (
            <Text style={styles.errorText}>
              영문, 숫자, 특수문자 포함 10자 이상 입력해주세요.
            </Text>
          ) : null}
        </View>
        <View style={[styles.textInputWrapper, getBorderStyle('passwordcheck')]}>
          <TextInput
            style={styles.textInput}
            placeholder={'비밀번호를 다시 입력하세요.'}
            onChangeText={v => setPasswordCheck(v)}
            secureTextEntry={true}
            onFocus={() => setFocusedInput('passwordcheck')}
          />
          {!isEmpty(passwordCheck) & (password !== passwordCheck) ? (
            <Text style={styles.errorText}>비밀번호가 일치하지 않습니다.</Text>
          ) : null}
        </View>
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
            <Text
              style={[styles.joinConfirmText, {color: getButtonTextColor()}]}>
              회원가입
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

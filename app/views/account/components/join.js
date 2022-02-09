import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  Alert, ScrollView,
} from 'react-native';
import {isEmpty} from '../../../common/util';
import {normalizeFontSize} from '../../../component/font';
import {
  requestDuplicateEmailCheck,
  requestDuplicateNicknameCheck,
  requestSignUp,
} from '../../../service/account';
import {Color} from '../../../style/colors';

import TextField from "./TextField";
import TextFieldButton from "./TextFieldButton";

const styles = new StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 24,
    flex: 1,
  },
  agreeText: {
    fontSize: normalizeFontSize(17),
    lineHeight: 18,
    letterSpacing: 0.1,
    marginLeft: 10,
  },
  smallAgreeText: {
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


  const selectIcon = require('../../../../assets/imgs/select_icon_3x.png');
  const emailRexp = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

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


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={styles.container}>
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


        {/*<View style={[styles.textInputWrapper, getBorderStyle('nickname')]}>*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    placeholder={'닉네임'}*/}
        {/*    onChangeText={v => {*/}
        {/*      setIsNicknameValid(false);*/}
        {/*      setNickname(v);*/}
        {/*      setShowNicknameError(false);*/}
        {/*    }}*/}
        {/*    onFocus={() => setFocusedInput('nickname')}*/}
        {/*  />*/}
        {/*  {isNicknameValid ? (*/}
        {/*    <Text style={[styles.checkDup, {color: Color.birghtOrange}]}>*/}
        {/*      확인완료*/}
        {/*    </Text>*/}
        {/*  ) : (*/}
        {/*    <TouchableOpacity onPress={() => handleNicknameDupCheck()}>*/}
        {/*      <Text style={styles.checkDup}>중복확인</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  )}*/}
        {/*  {showNicknameError ? (*/}
        {/*    <Text style={styles.errorText}>이미 사용 중인 닉네임 입니다.</Text>*/}
        {/*  ) : null}*/}
        {/*</View>*/}

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

        {/*<View style={[styles.textInputWrapper, getBorderStyle('email')]}>*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    placeholder={'이메일'}*/}
        {/*    onChangeText={v => {*/}
        {/*      setIsEmailValid(false);*/}
        {/*      setEmail(v);*/}
        {/*      setShowEmailError(false);*/}
        {/*    }}*/}
        {/*    onFocus={() => setFocusedInput('email')}*/}
        {/*    keyboardType="email-address"*/}
        {/*  />*/}
        {/*  {isEmailValid ? (*/}
        {/*    <Text style={[styles.checkDup, {color: Color.birghtOrange}]}>*/}
        {/*      확인완료*/}
        {/*    </Text>*/}
        {/*  ) : (*/}
        {/*    <TouchableOpacity onPress={() => handleDuplicateCheck()}>*/}
        {/*      <Text style={styles.checkDup}>중복확인</Text>*/}
        {/*    </TouchableOpacity>*/}
        {/*  )}*/}
        {/*  {showEmailError ? (*/}
        {/*    <Text style={styles.errorText}>이미 사용 중인 이메일 입니다.</Text>*/}
        {/*  ) : null}*/}
        {/*</View>*/}

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
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

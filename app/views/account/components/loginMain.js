import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  TouchableOpacity,
  StatusBar,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  requestLoginApple,
  requestLoginKakao,
  requestSignIn,
  verifyToken,
} from '../../../service/account';
import {login} from '@react-native-seoul/kakao-login';
import {Color} from '../../../style/colors';
import {normalizeFontSize} from '../../../component/font';

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'JejuGothicOTF',
  },
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  centerContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 137,
    paddingBottom: 0,
  },
  loginContainer: {
    flexBasis: 265,
    paddingHorizontal: 30,
    paddingTop: 23,
    paddingBottom: 30,
  },
  accountContainer: {
    flexBasis: "auto",

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 30,
  },
  footerContainer: {
    alignItems: 'center',
    paddingBottom: 132,
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
  textInput: {
    fontSize: normalizeFontSize(17),
    lineHeight: 22,
    letterSpacing: -0.41,
    fontFamily: 'JejuGothicOTF',
    flex: 1,
    height: 60,
  },
  loginButtonWrapper: {
    flex: 1,
    height: 52,
  },
  loginButton: {
    width: '100%',
    height: 52,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(17),
  },
  accountTextWrapper: {
    width: "33%",
    alignItems: "center",
    borderRightWidth: 1,
  },
  accountText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(16),
  },
  icon: {
    height: 60,
    width: 60,
  },
  clickableText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
    color: Color.veryLightPink,
    textDecorationLine: 'underline',
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

function LoginScreen() {
  const kakao_icon = '../../../../assets/imgs/login/kakao_login_circle.png';
  const apple_icon = '../../../../assets/imgs/login/apple_login_circle.png';
  const showbility_icon = require('../../../../assets/imgs/showbility.png');
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [focusedInput, setFocusedInput] = React.useState('');

  const [wrongEmail, setWrongEmail] = React.useState(false);

  const validateEmail = (validateWrong) => {
    const emailRegex = /^[A-Za-z0-9_.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    const valid = emailRegex.test(email);

    if (wrongEmail && valid) setWrongEmail(false);
    if (validateWrong && !valid) setWrongEmail(true);

    return valid;
  }


  const validateInputs = React.useCallback(() => {
    return validateEmail() & password.length > 0;
  }, [password, validateEmail]);


  const getInputBorderStyle = (value) => {
    return value === focusedInput
      ? styles.focusedBorderBottom
      : styles.borderBottom;
  }

  const getButtonBackStyle = () => (
    {backgroundColor: validateInputs() ? Color.birghtOrange : Color.veryLightGrey}
  )

  const getButtonTextStyle = () => (
    {color: validateInputs() ? Color.white : Color.veryLightPink}
  )


  React.useEffect(() => {
    verifyToken().then(res => {
      if (res) {
        console.log('Current token is valid, move to app');
        navigation.navigate('App');
      }
    });
  }, []);

  const signInWithKakao = async () => {
    try {
      const token = await login();
      let ret = await requestLoginKakao(token);
      if (ret) navigation.navigate('App');
      else Alert.alert('로그인 실패', '문제가 발생하였습니다.');
    } catch (err) {
      // console.error(err);
      Alert.alert('로그인 실패', '취소되었습니다.');
    }
  };

  const signInWithApple = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(
      appleAuthRequestResponse.user,
    );
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      let ret = await requestLoginApple(appleAuthRequestResponse);
      if (ret) navigation.navigate('App');
      else Alert.alert('로그인 실패', '문제가 발생하였습니다.');
    } else {
      Alert.alert('로그인 실패', 'Apple 인증 서버 응답이 적절하지 않습니다.');
    }
  }

  const handleSubmit = async () => {
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
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <StatusBar barStyle={'dark-content'}/>
        <View style={styles.centerContainer}>
          <Text
            style={{fontFamily: 'JejuGothicOTF', fontSize: normalizeFontSize(16), marginBottom: 10}}>
            세상에 너의 재능을 보여줘!
          </Text>
          <Image style={{marginStart: 56, marginEnd: 55, resizeMode: "contain"}}
                 source={showbility_icon}/>
        </View>
        <View style={styles.loginContainer}>
          <View style={[styles.textInputWrapper, getInputBorderStyle('email')]}>
            <TextInput
              style={styles.textInput}
              placeholder={'이메일'}
              onChangeText={setEmail}
              onFocus={() => setFocusedInput('email')}
              onBlur={() => {
                setFocusedInput('');
                validateEmail(true);
              }}
            />
            {wrongEmail && <Text style={styles.errorText}>
              이메일 형식을 확인해주세요.
            </Text>}
          </View>
          <View style={[styles.textInputWrapper, getInputBorderStyle('password')]}>
            <TextInput
              style={styles.textInput}
              placeholder={'비밀번호'}
              onChangeText={setPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
              secureTextEntry={true}
            />
          </View>
          <View style={styles.loginButtonWrapper}>
            <TouchableOpacity
              style={[styles.loginButton, getButtonBackStyle()]}
              onPress={handleSubmit}
              disabled={!validateInputs()}>
              <Text style={[styles.loginButtonText, getButtonTextStyle()]}>
                로그인
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.accountContainer}>
          <Pressable style={styles.accountTextWrapper}>
            <Text style={styles.accountText}>이메일 찾기</Text>
          </Pressable>
          <Pressable
            style={styles.accountTextWrapper}
            onPress={() => navigation.navigate("이메일 로그인")}
          >
            <Text style={styles.accountText}>계정정보 찾기</Text>
          </Pressable>
          <Pressable
            style={[styles.accountTextWrapper, {borderRightWidth: 0}]}
            onPress={() => navigation.navigate('회원가입')}>
            <Text style={styles.accountText}>회원가입</Text>
          </Pressable>
        </View>
        <View style={styles.buttonsContainer}>
          <Text
            style={[
              styles.clickableText,
              {paddingBottom: 20, textDecorationLine: 'none'},
            ]}>
            SNS 간편 로그인
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Pressable
              onPress={signInWithKakao}
              style={{paddingHorizontal: 25}}>
              <Image style={styles.icon} source={require(kakao_icon)}/>
            </Pressable>
            <Pressable
              onPress={signInWithApple}
              style={{paddingHorizontal: 25}}>
              <Image style={styles.icon} source={require(apple_icon)}/>
            </Pressable>
          </View>
        </View>
        <View style={styles.footerContainer}>
          <Text
            style={styles.clickableText}
            onPress={() => navigation.navigate('App')}>
            로그인 전 둘러보기
          </Text>
        </View>
        {/*<View style={styles.footerContainer}>*/}
        {/*  <Text style={styles.privacyText}>*/}
        {/*    당신의 재능 활동은 연결된 계정에 노출되지 않습니다.*/}
        {/*  </Text>*/}
        {/*  <Text style={styles.privacyText}>*/}
        {/*    회원가입시{' '}*/}
        {/*    <Text*/}
        {/*      style={{color: Color.vividBlue}}*/}
        {/*      onPress={() =>*/}
        {/*        navigation.push('Privacy', {title: '개인정보 처리방침'})*/}
        {/*      }>*/}
        {/*      개인정보 처리방침*/}
        {/*    </Text>*/}
        {/*    과{' '}*/}
        {/*    <Text*/}
        {/*      style={{color: Color.vividBlue}}*/}
        {/*      onPress={() => navigation.push('Privacy', {title: '이용약관'})}>*/}
        {/*      이용약관*/}
        {/*    </Text>*/}
        {/*    을 확인하였으며, 동의합니다.*/}
        {/*  </Text>*/}
        {/*</View>*/}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default LoginScreen;

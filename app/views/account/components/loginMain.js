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
import TextField from "./TextField";
import SubmitButton from "./SubmitButton";

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
    justifyContent: 'center',
  },
  loginContainer: {
    paddingHorizontal: 30,
  },
  accountContainer: {
    flexBasis: "auto",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
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
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
  },
  accountText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
  },
  verticalBar: {
    height: 16,
    width: 1,
    borderRightWidth: 1,
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

const Padding = ({height}) => <View style={{flex: height}}/>;

function LoginScreen() {
  const kakao_icon = '../../../../assets/imgs/login/kakao_login_circle.png';
  const apple_icon = '../../../../assets/imgs/login/apple_login_circle.png';
  const showbility_icon = require('../../../../assets/imgs/showbility.png');
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const validateInputs = React.useCallback(() => {
    return email.length > 0 && password.length > 0;
  }, [email, password]);


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

        <Padding height={137}/>

        <View style={styles.centerContainer}>
          <Text
            style={{fontFamily: 'JejuGothicOTF', fontSize: normalizeFontSize(16), marginBottom: 10}}>
            세상에 너의 재능을 보여줘!
          </Text>
          <Image style={{marginStart: 56, marginEnd: 55, resizeMode: "contain"}}
                 source={showbility_icon}/>
        </View>

        <Padding height={23}/>

        <View style={styles.loginContainer}>
          <TextField
            placeholder='이메일'
            value={email}
            setValue={setEmail}
          />
          <TextField
            placeholder='비밀번호'
            value={password}
            setValue={setPassword}
            secureTextEntry
          />
          <SubmitButton
            onPress={handleSubmit}
            disabled={!validateInputs()}>
            로그인
          </SubmitButton>
        </View>

        <Padding height={40}/>

        <View style={styles.accountContainer}>
          <Pressable style={styles.accountTextWrapper}>
            <Text style={styles.accountText}>이메일 찾기</Text>
          </Pressable>
          <Pressable
            style={[styles.accountTextWrapper,
              {flex: 1.2}
            ]}
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

        <Padding height={50}/>

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
          <Text
            style={[styles.clickableText, {paddingTop: 30}]}
            onPress={() => navigation.navigate('App')}>
            로그인 전 둘러보기
          </Text>
        </View>

        <Padding height={132}/>

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

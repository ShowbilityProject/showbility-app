import {useNavigation} from '@react-navigation/core';
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'JejuGothicOTF',
    paddingTop: 100,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  loginContainer: {
    paddingHorizontal: 30,
  },
  joinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: normalizeFontSize(30),
    paddingVertical: 15,
  },
  footerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: '90%',
    height: '80%',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#DDDDDD',
  },
  accountContainer: {
    flexBasis: "auto",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  flexCenter: {
    alignItems: 'center',
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '90%',
    height: 60,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: normalizeFontSize(17),
  },
  accountTextWrapper: {
    flex: 1,
    alignItems: "center",
    borderRightWidth: 1,
  },
  circle: {
    height: 26,
    width: 26,
    borderRadius: 26 / 2,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    marginRight: 10,
  },
  accountText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
  },
  privacyText: {
    fontSize: normalizeFontSize(12),
    color: Color.veryLightPink,
    lineHeight: 18,
  },
  verticalBar: {
    height: 16,
    width: 1,
    borderRightWidth: 1,
  },
  kakaoImage: {
    height: 60,
    width: 60,
  },
  icon: {
    height: 60,
    width: 60,
  },
  beforeLoginText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
    color: Color.veryLightPink,
    textDecorationLine: 'underline',
  },
  clickableText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
    color: Color.veryLightPink,
    textDecorationLine: 'underline',
  },
  joinText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(14),
    color: Color.birghtOrange,
    marginLeft: 10,
    textDecorationLine: 'underline',
  },
  emailLoginBox: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.veryLightPink,
  },
});

const Padding = ({height}) => <View style={{flex: height}}/>;

function LoginScreen({route}) {
  const kakao_icon = '../../../../assets/imgs/login/kakao_login_circle.png';
  const apple_icon = '../../../../assets/imgs/login/apple_login_circle.png';
  const showbility_icon = require('../../../../assets/imgs/showbility.png');
  const navigation = useNavigation();

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  const validateInputs = React.useCallback(() => {
    return email.length > 0 && password.length > 0;
  }, [email, password]);

  React.useEffect(() => {
    if (route.params?.email) {
      setEmail(route.params.email);
      navigation.setParams({
        email: "",
      });
    };
  }, [route.params?.email]);

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
          <Pressable
            style={styles.accountTextWrapper}
            onPress={() => navigation.navigate("이메일 찾기")}
          >
            <Text style={styles.accountText}>이메일 찾기</Text>
          </Pressable>
          <Pressable
            style={[styles.accountTextWrapper, {flex: 1.2}]}
            onPress={() => navigation.navigate("비밀번호 찾기")}
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

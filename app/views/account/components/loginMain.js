import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {View, Text, StyleSheet, Image, Pressable, Alert, TouchableOpacity, StatusBar} from 'react-native';
import {appleAuth} from '@invertase/react-native-apple-authentication';
import {
  requestLoginApple,
  requestLoginKakao,
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
    backgroundColor: '#FFFFFF',
  },
  centerContaier: {
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
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
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
  circle: {
    height: 26,
    width: 26,
    borderRadius: 26 / 2,
    borderColor: '#DDDDDD',
    borderWidth: 1,
    marginRight: 10,
  },
  privacyText: {
    fontSize: normalizeFontSize(12),
    color: Color.veryLightPink,
    lineHeight: 18,
  },
  kakaoImage: {
    height: 60,
    width: 60,
  },
  beforeLoginText: {
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

function LoginScreen() {
  const kakao_icon = '../../../../assets/imgs/login/kakao_login_circle.png';
  const apple_icon = '../../../../assets/imgs/login/apple_login_circle.png';
  const showbility_icon = require('../../../../assets/imgs/showbility.png');
  const navigation = useNavigation();

  React.useEffect(() => {
    verifyToken().then(res => {
      if (res) {
        console.log('Current token is valid, move to app');
        navigation.navigate('App');
      }
    });
  });

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

  async function onAppleButtonPress() {
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

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'dark-content'} />
      <View style={styles.centerContaier}>
        <Image style={{marginBottom: 30}} source={showbility_icon} />
        <Text
          style={{fontFamily: 'JejuGothicOTF', fontSize: normalizeFontSize(24), marginBottom: 10}}>
          세상에 당신의
        </Text>
        <Text style={{fontFamily: 'JejuGothicOTF', fontSize: normalizeFontSize(24),}}>
          재능을 보여주세요!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Text
          style={[
            styles.beforeLoginText,
            {paddingBottom: 29, textDecorationLine: 'none'},
          ]}>
          SNS 간편 로그인
        </Text>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={signInWithKakao} style={{paddingHorizontal: 17}}>
            <Image style={styles.kakaoImage} source={require(kakao_icon)} />
          </Pressable>
          <Pressable
            onPress={() => onAppleButtonPress()}
            style={{paddingHorizontal: 17}}>
            <Image style={styles.kakaoImage} source={require(apple_icon)} />
          </Pressable>
        </View>
        <TouchableOpacity
          style={styles.emailLoginBox}
          onPress={() => navigation.navigate('이메일 로그인')}>
          <Text style={{fontSize: normalizeFontSize(17)}}>이메일 로그인</Text>
        </TouchableOpacity>
        <View style={{marginTop: 22, flexDirection: 'row'}}>
          <Text style={[styles.beforeLoginText, {textDecorationLine: 'none'}]}>
            쇼빌리티가 처음이신가요?
          </Text>
          <View>
            <Text
              style={styles.joinText}
              onPress={() => navigation.navigate('회원가입')}>
              회원가입
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.joinContainer}>
        <Text
          style={styles.beforeLoginText}
          onPress={() => navigation.navigate('App')}>
          로그인 전 둘러보기
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.privacyText}>
          당신의 재능 활동은 연결된 계정에 노출되지 않습니다.
        </Text>
        <Text style={styles.privacyText}>
          회원가입시{' '}
          <Text
            style={{color: Color.vividBlue}}
            onPress={() =>
              navigation.push('Privacy', {title: '개인정보 처리방침'})
            }>
            개인정보 처리방침
          </Text>
          과{' '}
          <Text
            style={{color: Color.vividBlue}}
            onPress={() => navigation.push('Privacy', {title: '이용약관'})}>
            이용약관
          </Text>
          을 확인하였으며, 동의합니다.
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;

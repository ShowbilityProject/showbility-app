import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  Alert,
} from 'react-native';
import {requestLoginKakao, verifyToken} from '../../../service/account';
import {login} from '@react-native-seoul/kakao-login';
import {Color} from '../../../style/colors';

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: 'JejuGothicOTF',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContaier: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'JejuGothicOTF',
  },
  buttonsContainer: {
    flex: 1.3,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accountContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  joinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 30,
  },
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
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
  joinScreen: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 30,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '90%',
    height: 60,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 17,
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
    fontSize: 12,
    color: Color.veryLightPink,
    lineHeight: 18
  },
});

function LoginScreen() {
  const iconImgSize = Dimensions.get('window').width / 6;
  const kakao_icon = '../../../../assets/imgs/login/kakao_icon.png';
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

  return (
    <View style={styles.container}>
      <View style={styles.centerContaier}>
        <Image style={{marginBottom: 30}} source={showbility_icon} />
        <Text
          style={{fontFamily: 'JejuGothicOTF', fontSize: 24, marginBottom: 10}}>
          세상에 당신의
        </Text>
        <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 24}}>
          재능을 보여주세요!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable onPress={signInWithKakao} style={{flex: 1}}>
          <Image
            style={{
              height: iconImgSize,
              width: iconImgSize,
              margin: 5,
              alignSelf: 'center',
            }}
            resizeMode={'contain'}
            source={require(kakao_icon)}
          />
        </Pressable>
      </View>
      <View style={styles.joinContainer}>
        <Text
          style={{
            fontFamily: 'JejuGothicOTF',
            fontSize: 14,
            color: Color.veryLightPink,
            textDecorationLine: 'underline'
          }}
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

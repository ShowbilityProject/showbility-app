import { useNavigation } from '@react-navigation/core';
import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image,
  Dimensions,
} from 'react-native';
import {verifyToken} from '../../../service/account';

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
    fontSize: 10,
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
});

function LoginScreen() {
  const iconImgSize = Dimensions.get('window').width / 6;
  console.log(iconImgSize);
  const kakao_icon = '../../../../assets/imgs/login/kakao_icon.png';
  const gg_icon = '../../../../assets/imgs/login/gg_icon.png';
  const navigation = useNavigation();
  React.useEffect(() => {
    verifyToken().then(res => {
      if (res) {
        console.log('Current token is valid, move to app');
        navigation.navigate('App');
      }
    });
  });

  return (
    <View style={styles.container}>
      <View style={styles.centerContaier}>
        <Text
          style={{
            fontFamily: 'Montserrat-Bold',
            color: '#F85B02',
            fontSize: 42,
            marginBottom: 28,
          }}>
          SHOW
          <Text
            style={{
              fontFamily: 'Montserrat-Light',
              color: '#F85B02',
              fontSize: 42,
            }}>
            BILITY
          </Text>
        </Text>
        <Text
          style={{fontFamily: 'JejuGothicOTF', fontSize: 24, marginBottom: 10}}>
          세상에 당신의
        </Text>
        <Text style={{fontFamily: 'JejuGothicOTF', fontSize: 24}}>
          재능을 보여주세요!
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Image
          style={{height: iconImgSize, width: iconImgSize, margin: 5, alignSelf: 'center'}}
          resizeMode={'contain'}
          source={require(kakao_icon)}
        />
        <Image
          style={{height: iconImgSize - 9, width: iconImgSize - 9, margin: 5, alignSelf: 'center'}}
          resizeMode={'contain'}
          source={require(gg_icon)}
        />
      </View>
      <View style={styles.accountContainer}>
        <TouchableHighlight
          onPress={() => navigation.push('이메일 로그인')}
          style={styles.button}>
          <Text>이메일 로그인</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.joinContainer}>
        <Text onPress={() => navigation.push('회원가입')}>회원가입</Text>
        <Text> | </Text>
        <Text onPress={() => navigation.navigate('App')}>
          로그인 전 둘러보기
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={{fontSize: 12}}>
          당신의 재능 활동은 연결된 계정에 노출되지 않습니다.
        </Text>
        <Text style={{fontSize: 12}}>
          회원가입시 개인정보 처리방침과 이용약관을 확인하였으며, 동의합니다.
        </Text>
      </View>
    </View>
  );
}

export default LoginScreen;

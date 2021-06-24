/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { Button, View, Text, StyleSheet, TouchableHighlight, TextInput, Image, Dimensions } from 'react-native';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from "react-native-splash-screen";
import EmailLoginScreen from "./app/account/login";
import JoinScreen from "./app/account/join";

const styles = StyleSheet.create({
  fontStyle: {
    fontFamily: "JejuGothicOTF"
  },
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  centerContaier: {
    flex: 9,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'JejuGothicOTF'
    // backgroundColor: 'yellow'
  },
  buttonsContainer: {
    flex: 1.3,
    flexDirection: "row",
    justifyContent: 'center',
    // backgroundColor: 'green'
  },
  accountContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red'
  },
  joinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    fontSize: 30
  },
  footerContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    fontSize: 10
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: "90%",
    height: "80%",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#DDDDDD"
  },
  flexCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  joinScreen: {
    flex: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    paddingTop: 30
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: "90%",
    height: 60,
    borderBottomColor: "#DDDDDD",
    borderBottomWidth: 1,
    marginBottom: 20,
    fontSize: 17
  },
  circle: {
    height: 26,
    width: 26,
    borderRadius: 26/2,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    marginRight: 10
  }
})



const Stack = createStackNavigator();

function loginScreen({navigation}) {
  const iconImgSize = Dimensions.get('window').width / 8;

  return (
    <View style={styles.container}>
      <View style={styles.centerContaier}>
        <Text style={{ fontFamily: "Montserrat-Bold", color: "#F85B02", fontSize: 42, marginBottom: 28 }}>
          SHOW
          <Text style={{ fontFamily: "Montserrat-Light", color: "#F85B02", fontSize: 42 }}>
            BILITY
          </Text>
        </Text>
        <Text style={{ fontFamily: "JejuGothicOTF", fontSize: 24, marginBottom: 10 }}>세상에 당신의</Text>
        <Text style={{ fontFamily: "JejuGothicOTF", fontSize: 24 }}>재능을 보여주세요!</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Image style={{ height: iconImgSize, width: iconImgSize, margin: 10 }} source={require('./assets/imgs/kakao_icon.png')}/>
        <Image style={{ height: iconImgSize, width: iconImgSize, margin: 10 }} source={require('./assets/imgs/kakao_icon.png')}/>
        <Image style={{ height: iconImgSize, width: iconImgSize, margin: 10 }} source={require('./assets/imgs/kakao_icon.png')}/>
        <Image style={{ height: iconImgSize, width: iconImgSize, margin: 10 }} source={require('./assets/imgs/kakao_icon.png')}/>
        <Image style={{ height: iconImgSize, width: iconImgSize, margin: 10 }} source={require('./assets/imgs/kakao_icon.png')}/>
      </View>
      <View style={styles.accountContainer}>
        <TouchableHighlight
          onPress={() => navigation.push('이메일 로그인')}
          style={styles.button}>
            <Text>이메일 로그인</Text>
        </TouchableHighlight>
      </View>
      <View style={styles.joinContainer}>
        <Text
          onPress={() => navigation.push('회원가입')}
        >회원가입</Text>
        <Text> | </Text>
        <Text
          onPress={() => navigation.navigate('ShowbilityHome')}
        >로그인 전 둘러보기</Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={{ fontSize: 12 }}>당신의 재능 활동은 연결된 계정에 노출되지 않습니다.</Text>
        <Text style={{ fontSize: 12 }}>회원가입시 개인정보 처리방침과 이용약관을 확인하였으며, 동의합니다.</Text>
      </View>
    </View>
  )
}

function App() {
  const isSignedIn = false;
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <Stack.Navigator 
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#FFFFFF"
            }
          }}
        >
          <Stack.Screen 
            name="Home" 
            component={loginScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="이메일 로그인" 
            component={EmailLoginScreen}
          />
          <Stack.Screen
            name="회원가입" 
            component={JoinScreen}
          />
        </Stack.Navigator>
      ) : (
        <HomeStack.Navigator>
          <Stack.Screen
            name="ShobilityMain"
            component={ShowbilityHome}
            options={{ headerShown: false }}
          />
        </HomeStack.Navigator>
      )}
    </NavigationContainer>
    
  );
}

const HomeStack = createStackNavigator();

function ShowbilityHome() {
  return (
    <View style={[styles.flexCenter, styles.container]}>
      <Text>ShobilityMain</Text>
    </View>
  )
}

export default class WelcomPage extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }

  render() {
    return App();
  }
};
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/loginMain';
import {PrivacyScreen} from './components/privacy';
import {FindEmailScreen} from "./components/findEmail";
import {FindPasswordScreen} from "./components/findPassword";
import {JoinScreen} from './components/join';
import {StackScreenOptions} from '../../style/common';
import {EmailLoginScreen} from './components/emailLogin';

const Stack = createStackNavigator();

function LoginStackScreen() {
  return (
    <Stack.Navigator initialRouteName="Home" screenOptions={StackScreenOptions}>
      <Stack.Screen
        name="Home"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="이메일 찾기"
        component={FindEmailScreen}
        options={{headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="비밀번호 찾기"
        component={FindPasswordScreen}
        options={{headerBackTitle: ' '}}
      />
      <Stack.Screen
        name="회원가입"
        component={JoinScreen}
        options={{headerBackTitle: ' '}}
      />
      {/*<Stack.Screen*/}
      {/*  name="이메일 로그인"*/}
      {/*  component={EmailLoginScreen}*/}
      {/*  options={{headerBackTitle: ' '}}*/}
      {/*/>*/}
    </Stack.Navigator>
  );
}

export default LoginStackScreen;

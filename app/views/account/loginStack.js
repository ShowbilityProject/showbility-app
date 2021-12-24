import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/loginMain';
import {PrivacyScreen} from './components/privacy';
import {JoinScreen} from './components/join';
import { StackScreenOptions } from '../../style/common';

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
        name="회원가입"
        component={JoinScreen}
        options={{headerBackTitle: ' '}}
      />
    </Stack.Navigator>
  );
}

export default LoginStackScreen;

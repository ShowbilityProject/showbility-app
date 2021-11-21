import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/loginMain';
import {PrivacyScreen} from './components/privacy';

const Stack = createStackNavigator();

function LoginStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
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
    </Stack.Navigator>
  );
}

export default LoginStackScreen;

import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './components/loginMain';

const Stack = createStackNavigator();

function LoginStackScreen() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default LoginStackScreen;

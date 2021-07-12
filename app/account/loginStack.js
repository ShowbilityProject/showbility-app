import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/loginMain';
import EmailLoginScreen from './components/emailLogin';
import JoinScreen from './components/join';

const Stack = createStackNavigator();

function LoginStackScreen() {
    return (
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
                component={LoginScreen} 
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
    )
}

export default LoginStackScreen;
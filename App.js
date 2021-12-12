/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import LoginStackScreen from './app/views/account/loginStack';
import TopStackScreen from './app/views/mainTab';
import {LogBox} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {verifyToken} from './app/service/account';
import {FollowMember} from './app/views/myshowbil/followMember';
import MyShowbilTab from './app/views/myshowbil/myShowbil';
import {CategoryList} from './app/views/newupload/category';
import {FindScreen} from './app/views/components/find';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const RootStack = createStackNavigator();

function App(tokenAlive) {
  // setVisible(true);
  const iScreen = tokenAlive ? 'App' : 'Login';
  console.log(tokenAlive, iScreen);
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={iScreen}>
        <RootStack.Screen
          name="Login"
          component={LoginStackScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="App"
          component={TopStackScreen}
          options={{headerShown: false, gestureEnabled: false}}
        />
        <RootStack.Screen
          name="팔로우"
          component={FollowMember}
          options={{headerBackTitle: ' '}}
        />
        <RootStack.Screen
          name="사용자정보"
          component={MyShowbilTab}
          options={{headerBackTitle: ' '}}
        />
        <RootStack.Screen
          name="카테고리&태그 선택"
          component={CategoryList}
          options={{headerBackTitle: ' '}}
        />
        <RootStack.Screen
          name="FindStack"
          component={FindScreen}
          options={{headerBackTitle: ' '}}
        />
      </RootStack.Navigator>
      {/* {isSignedIn ? <TopStackScreen /> : <LoginStackScreen />} */}
    </NavigationContainer>
  );
}

export default class WelcomPage extends React.Component {
  constructor() {
    super();
    this.state = {
      tokenAlive: false,
    };
  }

  componentDidMount() {
    verifyToken().then(res => {
      this.setState({tokenAlive: res});
    });
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  }

  render() {
    return App(this.state.tokenAlive);
  }
}

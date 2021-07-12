/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
import SplashScreen from "react-native-splash-screen";
import LoginStackScreen from './app/account/loginStack';
import MainTabScreen from "./app/showbility/mainTab";


function App() {
  const isSignedIn = false;
  // setVisible(true);
  return (
    <NavigationContainer>
      {isSignedIn ? (
        <MainTabScreen/>
      ) : (
        <LoginStackScreen/>
      )}
    </NavigationContainer>
    
  );
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
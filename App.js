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

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function App() {
  const isSignedIn = true;
  global.filter = global.filter ? global.filter : {};
  global.filter.categories = global.filter.categories
    ? global.filter.categories
    : [];
  global.filter.tags = global.filter.tags ? global.filter.tags : [];
  // setVisible(true);
  return (
    <NavigationContainer>
      {isSignedIn ? <TopStackScreen /> : <LoginStackScreen />}
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
}

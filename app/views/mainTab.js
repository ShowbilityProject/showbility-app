import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowbilityHome} from './showbility/shobilityHome';
import SearchTab from './components/search';
import NewUploadTab from './newupload/newUpload';
import MessageTab from './components/message';
import MyShowbilTab from './components/myShowbil';
import {createStackNavigator} from '@react-navigation/stack';
import {CategoryList} from './newupload/category';

const MainTab = createBottomTabNavigator();

const BaseStack = createStackNavigator();

const getVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log('RouteName : ' + routeName);
  if (
    routeName === 'ContentsModal' ||
    routeName === '댓글' ||
    routeName === '카테고리&태그 선택' ||
    routeName === '그룹 생성'
  ) {
    return false;
  }
  return true;
};

function BaseStackScreen() {
  return (
    <BaseStack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFFFFF',
        },
      }}
      mode="modal">
      <BaseStack.Screen
        name="TabScreen"
        component={MainTabScreen}
        options={{headerShown: false, headerBackTitle: ''}}
      />
      <BaseStack.Screen
        name="업로드"
        component={NewUploadTab}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen name="카테고리" component={CategoryList} />
    </BaseStack.Navigator>
  );
}

function MainTabScreen() {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeTintColor: '#F85B02',
      }}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '쇼빌리티') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === '검색') {
            iconName = focused ? 'search-sharp' : 'search-outline';
          } else if (route.name === '메세지') {
            iconName = focused ? 'chatbox-sharp' : 'chatbox-outline';
          } else if (route.name === '마이쇼빌') {
            iconName = focused ? 'person-sharp' : 'person-outline';
          } else if (route.name === 'NewUpload') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
            size = 35;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <MainTab.Screen
        name="쇼빌리티"
        component={ShowbilityHome}
        options={({route}) => ({tabBarVisible: getVisibility(route)})}
      />
      <MainTab.Screen name="검색" component={SearchTab} />
      <MainTab.Screen
        name="NewUpload"
        component={NewUploadTab}
        options={{tabBarLabel: ''}}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.navigate('업로드');
          },
        })}
      />
      <MainTab.Screen name="메세지" component={MessageTab} />
      <MainTab.Screen name="마이쇼빌" component={MyShowbilTab} />
    </MainTab.Navigator>
  );
}

export default BaseStackScreen;

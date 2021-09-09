import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowbilityHome} from './showbility/shobilityHome';
import SearchTab from './components/search';
import NewUploadTab from './components/newUpload';
import MessageTab from './components/message';
import MyShowbilTab from './components/myShowbil';

const MainTab = createBottomTabNavigator();

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
      />
      <MainTab.Screen name="메세지" component={MessageTab} />
      <MainTab.Screen name="마이쇼빌" component={MyShowbilTab} />
    </MainTab.Navigator>
  );
}

export default MainTabScreen;

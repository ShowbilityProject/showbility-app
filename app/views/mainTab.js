import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowbilityHome} from './showbility/shobilityHome';
import NewUploadTab from './newupload/newUpload';
import MessageTab from './message/message';
import MyShowbilTab from './myshowbil/myShowbil';
import {createStackNavigator} from '@react-navigation/stack';
import {CategoryList} from './newupload/category';
import {EditProfileScreen} from './myshowbil/editprofile';
import {FindScreen} from './components/find';
import {SelectGroup} from './newupload/selectgroup';
import {CommentsView} from './showbility/comment';
import {GroupCreate} from './showbility/group/groupCreate';
import {ContentsModal} from './showbility/contentModal';

const MainTab = createBottomTabNavigator();

const BaseStack = createStackNavigator();

const getVisibility = route => {
  const routeName = getFocusedRouteNameFromRoute(route);
  console.log('RouteName : ' + routeName);
  if (
    routeName === 'ContentsModal' ||
    routeName === '댓글' ||
    routeName === '카테고리&태그 선택' ||
    routeName === '그룹 생성' ||
    routeName === '업로드' ||
    routeName === 'FindStack' ||
    routeName === 'GroupDetail' ||
    routeName === 'GroupDepthView'
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
        name="프로필 편집"
        component={ProfileEditStack}
        options={{headerBackTitle: ' ', headerShown: false}}
      />
      <BaseStack.Screen
        name="그룹 생성"
        component={GroupCreateStack}
        options={{headerBackTitle: ' ', headerShown: false}}
      />
      <BaseStack.Screen
        name="ContentsModal"
        component={ContentsModal}
        options={{headerShown: false}}
      />
      <BaseStack.Screen
        name="댓글"
        component={CommentsView}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="업로드"
        component={NewUploadStack}
        options={{headerShown: false}}
      />
    </BaseStack.Navigator>
  );
}

const ProfileEditStackNav = createStackNavigator();

function ProfileEditStack() {
  return (
    <ProfileEditStackNav.Navigator>
      <ProfileEditStackNav.Screen
        name="프로필 편집"
        component={EditProfileScreen}
        options={{headerBackTitle: ' '}}
      />
      <ProfileEditStackNav.Screen
        name="카테고리&태그 선택"
        component={CategoryList}
        options={{headerBackTitle: ' '}}
        initialParams={{prevScreen: 'PROFILE'}}
      />
    </ProfileEditStackNav.Navigator>
  );
}

const GroupCreateStackNav = createStackNavigator();

function GroupCreateStack() {
  return (
    <GroupCreateStackNav.Navigator>
      <GroupCreateStackNav.Screen
        name="그룹 생성 "
        component={GroupCreate}
        options={{headerBackTitle: ' '}}
      />
      <GroupCreateStackNav.Screen
        name="카테고리&태그 선택"
        component={CategoryList}
        options={{headerBackTitle: ' '}}
        initialParams={{prevScreen: 'GROUP_CREATE'}}
      />
    </GroupCreateStackNav.Navigator>
  );
}

const NewUploadStackNav = createStackNavigator();

function NewUploadStack() {
  return (
    <NewUploadStackNav.Navigator>
      <NewUploadStackNav.Screen
        name="새 업로드"
        component={NewUploadTab}
        options={{headerBackTitle: ' '}}
      />
      <NewUploadStackNav.Screen
        name="카테고리&태그 선택"
        component={CategoryList}
        options={{headerBackTitle: ' '}}
        initialParams={{prevScreen: 'UPLOAD'}}
      />
      <NewUploadStackNav.Screen
        name="그룹 선택"
        component={SelectGroup}
        options={{headerBackTitle: ' '}}
      />
    </NewUploadStackNav.Navigator>
  );
}

function MainTabScreen() {
  return (
    <MainTab.Navigator
      tabBarOptions={{
        activeTintColor: '#F85B02',
        showLabel: false,
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
            iconName = 'add-circle-sharp';
            size = 42;
            color = '#F85B02';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <MainTab.Screen
        name="쇼빌리티"
        component={ShowbilityHome}
        options={({route}) => ({tabBarVisible: getVisibility(route)})}
      />
      <MainTab.Screen
        name="검색"
        component={FindScreen}
        initialParams={{categoryFilter: [], groupFilter: [], isMain: true}}
      />
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

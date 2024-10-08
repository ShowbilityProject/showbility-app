import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ShowbilityHome} from './showbility/shobilityHome';
import NewUploadTab from './newupload/newUpload';
import MessageTab from './message/message';
import MyShowbilTab from './myshowbil/myShowbil';
import {CardStyleInterpolators, createStackNavigator} from '@react-navigation/stack';
import {CategoryList} from './newupload/category';
import {EditProfileScreen} from './myshowbil/editprofile';
import {FindScreen} from './components/find';
import {SelectGroup} from './newupload/selectgroup';
import {CommentsView} from './showbility/comment';
import {GroupCreate} from './showbility/group/groupCreate';
import {ContentsModal} from './showbility/contentModal';
import {verifyToken} from '../service/account';
import {askIfNotTokenValid} from '../common/util';
import {StackScreenOptions} from '../style/common';
import {GroupContentsScreen} from './showbility/group/groupContent';
import {GroupDepthView} from './showbility/group/groupDepthView';
import {GroupDetail} from './showbility/group/groupDetail';
import {GroupMember} from './showbility/group/groupMember';
import {FollowMember} from './myshowbil/followMember';
import { Image } from 'react-native';
import { imageSources } from '../component/image';

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
    routeName === 'GroupDepthView' ||
    routeName === '사용자정보' ||
    routeName === '팔로우' ||
    routeName === 'GroupMember'
  ) {
    return false;
  }
  return true;
};

function BaseStackScreen() {
  return (
    <BaseStack.Navigator
      initialRouteName="Home"
      screenOptions={StackScreenOptions}>
      <BaseStack.Screen
        name="TabScreen"
        component={MainTabScreen}
        options={{headerShown: false, headerBackTitle: ''}}
      />
      <BaseStack.Screen
        name="팔로우"
        component={FollowMember}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="사용자정보"
        component={MyShowbilTab}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="프로필 편집"
        component={EditProfileScreen}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="카테고리&태그 선택"
        component={CategoryList}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="FindStack"
        component={FindScreen}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="그룹 컨텐츠"
        component={GroupContentsScreen}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="GroupDepthView"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Screen
        name="GroupMember"
        component={GroupMember}
        options={{headerBackTitle: ' '}}
      />
      <BaseStack.Group
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}>
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
      </BaseStack.Group>
    </BaseStack.Navigator>
  );
}

const GroupCreateStackNav = createStackNavigator();

function GroupCreateStack() {
  return (
    <GroupCreateStackNav.Navigator screenOptions={StackScreenOptions}>
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
    <NewUploadStackNav.Navigator screenOptions={StackScreenOptions}>
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
          let s;
          let imgSrc = imageSources.tab;
          size = 30;

          if (route.name === '쇼빌리티') {
            s = !focused ? imgSrc.home : imgSrc.homeFocused;
          } else if (route.name === '검색') {
            s = !focused ? imgSrc.search : imgSrc.searchFocused;
          } else if (route.name === '메세지') {
            s = !focused ? imgSrc.message : imgSrc.messageFocused;
          } else if (route.name === '마이쇼빌') {
            s = !focused ? imgSrc.myshowbil : imgSrc.myshowbilFocused;
          } else if (route.name === 'NewUpload') {
            s = imgSrc.upload;
            size = 42;
            color = '#F85B02';
          }
          return <Image source={s} style={{width: size, height: size}} />;
          // return <Ionicons name={iconName} size={size} color={color} />;
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
            verifyToken().then(res => {
              if (res) navigation.navigate('업로드');
              else askIfNotTokenValid(navigation);
            });
          },
        })}
      />
      <MainTab.Screen name="메세지" component={MessageTab} />
      <MainTab.Screen
        name="마이쇼빌"
        component={MyShowbilTab}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            verifyToken().then(res => {
              if (res) navigation.navigate('마이쇼빌');
              else askIfNotTokenValid(navigation);
            });
          },
        })}
      />
    </MainTab.Navigator>
  );
}

export default BaseStackScreen;

import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ShowbilityHome from './components/shobilityHome';
import SearchTab from './components/search';
import NewUploadTab from './components/newUpload';
import MessageTab from './components/message';
import MyShowbilTab from './components/myShowbil';

const MainTab = createBottomTabNavigator();

function MainTabScreen() {
    return (
      <MainTab.Navigator>
        <MainTab.Screen name="쇼빌리티" component={ShowbilityHome}
          // tabBarVisible={visible}
          />
        <MainTab.Screen name="검색" component={SearchTab} />
        <MainTab.Screen name="NewUpload" component={NewUploadTab} />
        <MainTab.Screen name="메세지" component={MessageTab} />
        <MainTab.Screen name="마이쇼빌" component={MyShowbilTab} />
      </MainTab.Navigator>
    )
  }
  
  export default MainTabScreen;
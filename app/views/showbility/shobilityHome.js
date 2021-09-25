import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AbilityScreen} from './ability';
import {GroupScreen} from './group/group';
import {FilterScreen} from './filter';
import {GroupDepthView} from './group/groupDepthView';
import {GroupDetail} from './group/groupDetail';
import {GroupCreate} from './group/groupCreate';
import {getContent, getContentsList} from '../../service/content';
import {useNavigation} from '@react-navigation/core';
import {HOST} from '../../common/constant';
import {CommentsView} from './comment';
import {ContentsModal} from './contentModal';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tobBar: {
    marginLeft: 10,
    height: 52,
    width: '100%',
    flexDirection: 'row',
  },
  tobBarText: {
    fontFamily: 'JejuGothicOTF',
    padding: 10,
    fontSize: 18,
    color: '#D5D5D6',
  },
  tobBarTextFocused: {
    color: '#000000',
    fontSize: 20,
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  flatListImage: {
    width: '90%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  filterIcon: {
    position: 'absolute',
    right: 30,
    marginTop: 7,
  },
});

class SHome extends React.Component {
  constructor(props) {
    super(props);
    this.st = true;
    this.state = {
      showbility: true,
      ability: false,
      group: false,
      isFetching: false,
    };
  }

  onPressTobText = key => {
    let st = this.state;
    if (!st[key]) {
      for (let k in st) {
        if (k === key) {
          st[k] = true;
        } else {
          st[k] = false;
        }
      }
    }
    this.setState(st);
  };

  render() {
    return (
      <SafeAreaView style={[styles.flexCenter, styles.container]}>
        <View style={{width: '100%'}}>
          <View style={styles.tobBar}>
            <Text
              style={[
                styles.tobBarText,
                this.state.showbility ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('showbility')}>
              쇼빌리티
            </Text>
            <Text
              style={[
                styles.tobBarText,
                this.state.ability ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('ability')}>
              어빌리티
            </Text>
            <Text
              style={[
                styles.tobBarText,
                this.state.group ? styles.tobBarTextFocused : {},
              ]}
              onPress={() => this.onPressTobText('group')}>
              그룹
            </Text>
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() =>
                this.props.navigation.navigate('카테고리&태그 선택')
              }>
              <Image
                source={require('../../../assets/imgs/ICON-24-Filter.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.main}>
          <View style={{flex: 1, display: this.state.showbility ? '' : 'none'}}>
            <ShowbilityScreen />
          </View>
          <View style={{display: this.state.ability ? '' : 'none'}}>
            <AbilityScreen />
          </View>
          <View style={{display: this.state.group ? '' : 'none'}}>
            <GroupScreen />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

function ShowbilityScreen() {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const showModalOnShowbilityItemPressed = item => {
    getContent(item.url).then(content =>
      navigation.navigate('ContentsModal', content),
    );
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    let source = require('../../../assets/imgs/add_image.png');
    if (item.images.length > 0) {
      source = {uri: HOST + item.images[0]};
    }
    return (
      <TouchableOpacity onPress={() => showModalOnShowbilityItemPressed(item)}>
        <Image source={source} style={styles.flatListImage} />
      </TouchableOpacity>
    );
  };

  const fetchData = () => {
    console.log('Fetchdata Showbility Home');
    getContentsList()
      .then(d => {
        setData(d.results);
      })
      .then(() => setRefreshing(false));
  };

  const onRefersh = () => {
    setRefreshing(true);
    fetchData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.url}
      data={data}
      renderItem={renderItem}
      onRefresh={() => onRefersh()}
      refreshing={refreshing}
    />
  );
}

const MainHomeStack = createStackNavigator();

export function ShowbilityHome() {
  return (
    <MainHomeStack.Navigator mode="modal">
      <MainHomeStack.Screen
        name="Main"
        component={SHome}
        options={{headerShown: false}}
      />
      <MainHomeStack.Screen
        name="ContentsModal"
        component={ContentsModal}
        options={{headerShown: false}}
      />
      <MainHomeStack.Screen
        name="댓글"
        component={CommentsView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="카테고리&태그 선택"
        component={FilterScreen}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="마이 그룹"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="쇼빌 그룹 둘러보기"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="멤버 모집 중인 그룹"
        component={GroupDepthView}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="GroupDetail"
        component={GroupDetail}
        options={{headerBackTitle: ' '}}
      />
      <MainHomeStack.Screen
        name="그룹 생성"
        component={GroupCreate}
        options={{headerBackTitle: ' '}}
      />
    </MainHomeStack.Navigator>
  );
}

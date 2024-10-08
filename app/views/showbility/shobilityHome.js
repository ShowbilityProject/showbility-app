import * as React from 'react';
import {
  FlatList,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  DeviceEventEmitter,
  StatusBar,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {AbilityScreen} from './ability';
import {GroupScreen} from './group/group';
import {getContentsList, getNestContentsList} from '../../service/content';
import {useNavigation} from '@react-navigation/core';
import {HOST} from '../../common/constant';
import {FindScreen} from '../components/find';
import {GroupContentsScreen} from './group/groupContent';
import {GroupDepthView} from './group/groupDepthView';
import {GroupDetail} from './group/groupDetail';
import {GroupMember} from './group/groupMember';
import {Color} from '../../style/colors';
import {StackScreenOptions} from '../../style/common';
import {MainFeedImage} from '../../component/image';
import NewUploadTab from '../newupload/newUpload';
import { CategoryList } from '../newupload/category';
import { SelectGroup } from '../newupload/selectgroup';
import { GroupCreate } from './group/groupCreate';
import { CommentsView } from './comment';
import { ContentsModal } from './contentModal';
import {normalizeFontSize} from '../../component/font';

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
    paddingHorizontal: 16,
    height: 56,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#f4f4f6',
    alignItems: 'center',
  },
  tobBarText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: normalizeFontSize(18),
    color: Color.lightBlueGrey,
    marginRight: 20,
  },
  tobBarTextFocused: {
    color: '#000000',
    fontSize: normalizeFontSize(20),
  },
  main: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  flatListImage: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
    borderRadius: 5,
  },
  filterIcon: {
    position: 'absolute',
    right: 16,
    marginTop: 7,
  },
  shadowBox: {
    width: '100%',
    aspectRatio: 1,
    overflow: 'visible',
    shadowColor: Color.brownishGrey,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.3,
    shadowRadius: 10,
    marginTop: 20,
    marginBottom: 10,
  },
});

export function SHome2({route, navigation}) {
  const [visibility, setVisibility] = React.useState({
    showbility: true,
    ability: false,
    group: false,
    isFetching: false,
  });
  const [categoryFilter, setCategoryFilter] = React.useState([]);
  const [tagFilter, setTagFilter] = React.useState([]);
  const [groupCategoryFilter, setGroupCategoryFilter] = React.useState([]);
  const [groupTagFilter, setGroupTagFilter] = React.useState([]);
  const [rerenderKey, setRerenderKey] = React.useState(false);
  const [changeView, setChangeView] = React.useState(false);

  const getCategoryFilter = () => {
    return categoryFilter;
  };

  const getTagFilter = () => {
    return tagFilter;
  };

  const onPressTobText = key => {
    let st = visibility;
    if (!st[key]) {
      for (let k in st) {
        if (k === key) {
          st[k] = true;
        } else {
          st[k] = false;
        }
      }
    }
    setVisibility(st);
    setChangeView(!changeView);
  };

  const removeTagsAndCategoreis = value => {
    if (visibility.group) {
      setGroupTagFilter(groupTagFilter.filter(tag => tag !== value));
      setGroupCategoryFilter(groupCategoryFilter.filter(c => c !== value));
    }
  };

  const getFilterIcon = () => {
    const filterIcon = require('../../../assets/imgs/ICON-24-Filter.png');
    const filterFocusedIcon = require('../../../assets/imgs/filter_focused.png');
    if (visibility.showbility)
      if (tagFilter.length + categoryFilter.length) return filterFocusedIcon;
      else return filterIcon;
    else if (visibility.group)
      if (groupTagFilter.length + groupCategoryFilter.length)
        return filterFocusedIcon;
      else return filterIcon;
  };

  return (
    <SafeAreaView style={[styles.flexCenter, styles.container]}>
      <StatusBar barStyle={'dark-content'} />
      <View style={{width: '100%'}}>
        <View style={styles.tobBar}>
          <Text
            style={[
              styles.tobBarText,
              visibility.showbility ? styles.tobBarTextFocused : {},
            ]}
            onPress={() => onPressTobText('showbility')}>
            쇼빌리티
          </Text>
          <Text
            style={[
              styles.tobBarText,
              visibility.ability ? styles.tobBarTextFocused : {},
            ]}
            onPress={() => onPressTobText('ability')}>
            어빌리티
          </Text>
          <Text
            style={[
              styles.tobBarText,
              visibility.group ? styles.tobBarTextFocused : {},
            ]}
            onPress={() => onPressTobText('group')}>
            그룹
          </Text>
          <TouchableOpacity
            style={[
              styles.filterIcon,
              {display: visibility.ability ? 'none' : 'flex'},
            ]}
            onPress={() =>
              navigation.navigate('카테고리&태그 선택', {
                selectCategories: categories => {
                  if (visibility.showbility) setCategoryFilter(categories);
                  else if (visibility.group) setGroupCategoryFilter(categories);
                  setRerenderKey(!rerenderKey);
                },
                selectTags: tags => {
                  if (visibility.showbility) setTagFilter(tags);
                  else if (visibility.group) setGroupTagFilter(tags);
                  setRerenderKey(!rerenderKey);
                },
                categories: visibility.showbility
                  ? categoryFilter
                  : groupCategoryFilter,
                tags: visibility.showbility ? tagFilter : groupTagFilter,
                isUpload: false,
                prevScreen: visibility.group ? 'GROUP' : 'FILTER',
              })
            }>
            <Image source={getFilterIcon()} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.main}>
        <View style={{flex: 1, display: visibility.showbility ? 'flex' : 'none'}}>
          <ShowbilityScreen
            key={rerenderKey}
            categoryFilter={getCategoryFilter}
            tagFilter={getTagFilter}
          />
        </View>
        <View style={{flex: 1, display: visibility.ability ? 'flex' : 'none'}}>
          <AbilityScreen />
        </View>
        <View style={{flex: 1, display: visibility.group ? 'flex' : 'none'}}>
          <GroupScreen
            key={JSON.stringify([...groupTagFilter, ...groupCategoryFilter])}
            tags={[...groupTagFilter, ...groupCategoryFilter]}
            removeTagsAndCategoreis={removeTagsAndCategoreis}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function ShowbilityScreen({categoryFilter, tagFilter}) {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [nextURL, setNextURL] = React.useState();
  const [fetchingNext, setFetchingNext] = React.useState(true);

  const showModalOnShowbilityItemPressed = id => {
    navigation.navigate('ContentsModal', id);
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    let source = require('../../../assets/imgs/add_image.png');
    if (item.images.length > 0) {
      source = {uri: HOST + item.images[0]};
    }
    return (
      <TouchableOpacity
        style={styles.shadowBox}
        onPress={() => showModalOnShowbilityItemPressed(item.id)}>
        <MainFeedImage source={source} />
      </TouchableOpacity>
    );
  };

  React.useEffect(() => {
    getContentsList(1, 10, categoryFilter(), tagFilter())
      .then(d => {
        setData(d.results);
        setNextURL(d.next);
        setFetchingNext(false);
      })
      .then(() => setRefreshing(false));
    DeviceEventEmitter.addListener('NewUpload', () => setRefreshing(true));
  }, [categoryFilter, refreshing, tagFilter]);

  const fetchNext = () => {
    if (nextURL === null) return;
    console.log('Fetch next');
    setFetchingNext(true);
    getNestContentsList(nextURL).then(res => {
      data.push.apply(data, res.results);
      setNextURL(res.next);
      setData(data);
      setFetchingNext(false);
    });
  };

  const isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    const ret =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    return ret;
  };

  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.url}
      data={data}
      renderItem={renderItem}
      onRefresh={() => setRefreshing(true)}
      refreshing={refreshing}
      style={{overflow: 'hidden'}}
      contentContainerStyle={{
        paddingHorizontal: 16,
      }}
      onScroll={({nativeEvent}) => {
        if (isScrollEnd(nativeEvent)) {
          console.log(fetchingNext);
          if (!fetchingNext) fetchNext();
        }
      }}
    />
  );
}

const MainHomeStack = createStackNavigator();

export function ShowbilityHome() {
  return (
    <MainHomeStack.Navigator screenOptions={StackScreenOptions}>
      <MainHomeStack.Screen
        name="Main"
        component={SHome2}
        options={{headerShown: false}}
      />
    </MainHomeStack.Navigator>
  );
}

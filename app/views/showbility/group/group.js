import * as React from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {FindBar} from '../../components/find';
import {isEmpty} from '../../../common/util';
import {getGroups, getNext, GET_GROUP_TYPE} from '../../../service/group';
import {Color} from '../../../style/colors';

const styles = StyleSheet.create({
  flatListImage: {
    width: 165,
    height: 124,
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 10,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  abilityFrame: {
    width: '50%',
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 10,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  abilityItemTitle: {
    fontSize: 17,
  },
  flatListFrame: {
    paddingHorizontal: 10,
  },
  touchableArea: {
    paddingHorizontal: 5,
    height: 190,
  },
  groupTitle: {
    padding: 5,
    marginBottom: 5,
  },
  groupArea: {
    marginBottom: 20,
  },
  searchArea: {
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
    width: '100%',
    height: 40,
    backgroundColor: '#F6F7F9',
    marginBottom: 20,
    fontSize: 17,
    padding: 10,
  },
  suggestTagView: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F7F7F7',
    marginRight: 10,
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
  showAllText: {
    textAlign: 'right',
    fontSize: 12,
    color: '#F85B02',
  },
});

function GroupArea({title, fetchType}) {
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getGroups(fetchType).then(res => {
      console.log('Received groups ', fetchType);
      setData(res.results);
    });
  }, [fetchType]);

  const getImageUri = d => {
    let source = require('../../../../assets/imgs/add_image.png');
    if (!isEmpty(d.small_image)) source = {uri: d.small_image};
    else if (!isEmpty(d.repr_image)) source = {uri: d.repr_image};
    return source;
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    const imageSource = getImageUri(item);
    return (
      <TouchableOpacity
        style={styles.touchableArea}
        onPress={() =>
          navigation.navigate('GroupDetail', {id: item.id, name: item.name})
        }>
        <Image source={imageSource} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, {fontSize: 17}]}>{item.name}</Text>
        <Text
          style={[{fontSize: 12, marginTop: 5, color: Color.veryLightPink}]}>
          {item.detail}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.groupArea}>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 20}}>
        <View style={{flex: 1}}>
          <Text
            style={[
              styles.groupTitle,
              styles.fontJeju,
              styles.abilityItemTitle,
            ]}>
            {title}
          </Text>
        </View>
        <View style={{flex: 1}}>
          <Text
            style={[styles.showAllText]}
            onPress={() =>
              navigation.navigate('GroupDepthView', {
                title: title,
                fetchType: fetchType,
              })
            }>
            전체 보기
          </Text>
        </View>
      </View>
      <FlatList
        horizontal
        key={'#'}
        keyExtractor={item => '#' + item.id}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
}

export function GroupScreen() {
  const [tagFilter, setTagFilter] = React.useState([]);
  const [rerenderKey, setRerenderKey] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const addTagFilter = value => {
    if (isEmpty(value)) return;
    else if (!tagFilter.includes(value)) {
      tagFilter.push(value);
      setTagFilter(tagFilter);
      setRerenderKey(!rerenderKey);
    }
  };

  const removeTagFromFilter = value => {
    let index = tagFilter.indexOf(value);
    if (index !== -1) {
      tagFilter.splice(index, 1);
      setTagFilter(tagFilter);
      setRerenderKey(!rerenderKey);
    }
  };
  const handleTagSubmit = ({nativeEvent}) => {
    addTagFilter(nativeEvent.text);
  };

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const onRefresh = () => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      setRerenderKey(!rerenderKey);
    });
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 15, paddingTop: 15}}>
      <FindBar
        key={rerenderKey}
        tagFilter={tagFilter}
        removeTagFromFilter={removeTagFromFilter}
        handleTagSubmit={handleTagSubmit}
        onFocused={() => {}}
      />
      {tagFilter.length > 0 ? (
        <FindResult tagFilter={tagFilter} />
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <GroupArea
            key={rerenderKey + 'my'}
            title="마이 그룹"
            fetchType={GET_GROUP_TYPE.MY}
          />
          <GroupArea
            key={rerenderKey + 'all'}
            title="쇼빌 그룹 둘러보기"
            fetchType={GET_GROUP_TYPE.ALL}
          />
        </ScrollView>
      )}
    </View>
  );
}

function FindResult({tagFilter}) {
  const navigation = useNavigation();
  const [data, setData] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);
  const [nextURL, setNextURL] = React.useState();

  React.useEffect(() => {
    getGroups(GET_GROUP_TYPE.ALL, tagFilter)
      .then(res => {
        setData(res.results);
        setNextURL(res.next);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
  }, [refreshing, JSON.stringify(tagFilter), tagFilter]);

  const fetchNext = () => {
    if (nextURL === null) return;
    console.log('Fetch next');
    setFetchingNext(true);
    getNext(nextURL).then(res => {
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

  const getImageUri = d => {
    let source = require('../../../../assets/imgs/add_image.png');
    if (!isEmpty(d.small_image)) source = {uri: d.small_image};
    else if (!isEmpty(d.repr_image)) source = {uri: d.repr_image};
    return source;
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('GroupDetail', {id: item.id, name: item.name})
        }
        style={styles.abilityFrame}>
        <Image source={getImageUri(item)} style={styles.flatListImage} />
        <Text style={[styles.fontJeju, styles.abilityItemTitle]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      key={'#'}
      keyExtractor={item => '#' + item.id}
      data={data}
      renderItem={renderItem}
      horizontal={false}
      numColumns={2}
      refreshing={refreshing}
      onRefresh={() => setRefreshing(true)}
      onScroll={({nativeEvent}) => {
        if (isScrollEnd(nativeEvent)) {
          console.log(fetchingNext);
          if (!fetchingNext) fetchNext();
        }
      }}
    />
  );
}

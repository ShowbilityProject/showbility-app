import * as React from 'react';
import {View, FlatList, Text, StyleSheet, Image, Alert, DeviceEventEmitter} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {getGroups, getNextGroupsList} from '../../../service/group';
import {verifyToken} from '../../../service/account';
import {isEmpty} from '../../../common/util';
import {Color} from '../../../style/colors';

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
    paddingTop: 15,
    flex: 1,
  },
  flatListImage: {
    width: '100%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    marginBottom: 7,
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
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  emptyTitleText: {
    fontFamily: 'JejuGothicOTF',
    fontSize: 17,
    lineHeight: 67,
  },
  emptyDetailText: {
    fontSize: 13,
    lineHeight: 21,
    color: Color.veryLightPink,
  },
});

export function GroupDepthView({route}) {
  const title = route.params.title;
  const fetchType = route.params.fetchType;
  const navigation = useNavigation();

  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);

  React.useEffect(() => {
    getGroups(fetchType)
      .then(res => {
        setData(res.results);
        setNextURL(res.next);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
    DeviceEventEmitter.addListener('GroupCreate', () => setRefreshing(true));
  }, [fetchType, refreshing]);

  const fetchNext = () => {
    if (nextURL === null) return;
    console.log('Fetch next');
    setFetchingNext(true);
    getNextGroupsList(nextURL).then(res => {
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

  const GroupCreateButtton = (
    <TouchableOpacity
      style={{paddingRight: 15}}
      onPress={() => navigation.navigate('그룹 생성')}>
      <Text style={[styles.fontJeju, {fontSize: 13, color: '#F85B02'}]}>
        그룹 생성
      </Text>
    </TouchableOpacity>
  );

  const defaultButton = null;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () =>
        title === '마이 그룹' ? GroupCreateButtton : defaultButton,
    });
  });

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
    <View style={styles.baseContainer}>
      {!data.length ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitleText}>{title} 없음</Text>
          <Text style={styles.emptyDetailText}>그룹을 생성하여</Text>
          <Text style={styles.emptyDetailText}>
            우리 그룹의 재능을 공유해주세요!
          </Text>
        </View>
      ) : (
        <FlatList
          key={'#'}
          keyExtractor={item => '#' + item.id}
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          refreshing={refreshing}
          onRefresh={() => setRefreshing(true)}
          style={styles.flatListFrame}
          onScroll={({nativeEvent}) => {
            if (isScrollEnd(nativeEvent)) {
              console.log(fetchingNext);
              if (!fetchingNext) fetchNext();
            }
          }}
        />
      )}
    </View>
  );
}

import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import {GROUP_CONTENT_STATUS, HOST} from '../../../common/constant';
import {normalizeFontSize} from '../../../component/font';
import {
  getGroupContentList,
  getNext,
  updateGroupContentStatus,
} from '../../../service/group';

export function GroupContentsScreen({route, navigation}) {
  const params = route.params;
  const groupId = params.groupId;
  const contentsStatus = params.contentsStatus;
  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);

  React.useEffect(() => {
    console.log('called effect');
    getGroupContentList(groupId, contentsStatus)
      .then(res => {
        setNextURL(res.next);
        setData(res.results);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
  }, [groupId, contentsStatus]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: params.title,
    });
  });

  const isScrollEnd = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 20;
    const ret =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    return ret;
  };

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

  const removeContentsFromList = groupContentId => {
    setRefreshing(true);
    setData(data.filter(content => content.id !== groupContentId));
    setRefreshing(false);
  };

  const updateStatus = (groupContentId, status) => {
    updateGroupContentStatus(groupId, groupContentId, status).then(res => {
      if (res) removeContentsFromList(groupContentId);
    });
  };

  const renderItem = itemObject => {
    let item = itemObject.item.content;
    let source = require('../../../../assets/imgs/add_image.png');
    if (item.images.length > 0) {
      source = {uri: HOST + item.images[0]};
    }
    return (
      <View style={styles.abilityFrame}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ContentsModal', item.id)}
          style={{marginBottom: 7}}>
          <Image source={source} style={styles.flatListImage} />
        </TouchableOpacity>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <TouchableOpacity
            style={styles.allowButton}
            onPress={() =>
              updateStatus(itemObject.item.id, GROUP_CONTENT_STATUS.ACTIVE)
            }>
            <Text style={[styles.fontJeju, , styles.allowText]}>승인</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.denyButton}
            onPress={() =>
              updateStatus(itemObject.item.id, GROUP_CONTENT_STATUS.REJECT)
            }>
            <Text style={[styles.fontJeju, styles.denyText]}>거절</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.baseContainer}>
        <FlatList
          key={'#'}
          keyExtractor={item => '#' + item.id}
          data={data}
          renderItem={renderItem}
          horizontal={false}
          numColumns={2}
          refreshing={refreshing}
          style={[styles.flatListFrame]}
          onScroll={({nativeEvent}) => {
            if (isScrollEnd(nativeEvent)) {
              console.log(fetchingNext);
              if (!fetchingNext) fetchNext();
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = new StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: 15,
  },
  flatListFrame: {
    // paddingHorizontal: 5,
  },
  abilityFrame: {
    // width: '50%',
    paddingBottom: 5,
    paddingHorizontal: 5,
    marginBottom: 5,
    flex: 1 / 2,
  },
  flatListImage: {
    width: '100%',
    aspectRatio: 1.3,
    alignSelf: 'center',
    borderRadius: 5,
    overflow: 'hidden',
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  abilityItemTitle: {
    fontSize: normalizeFontSize(17),
  },
  allowButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#F85B02',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
  },
  allowText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: normalizeFontSize(12),
  },
  denyButton: {
    flex: 1,
    borderRadius: 5,
    backgroundColor: '#B2B2B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  denyText: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: normalizeFontSize(12),
  },
});

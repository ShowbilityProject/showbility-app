import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  FlatList,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FOLLOW_STATUS} from '../../common/constant';
import {
  getFollowers,
  requestFollow,
  requestUnfollow,
} from '../../service/account';
import {getNext} from '../../service/group';

export function FollowMember({route}) {
  const navigation = useNavigation();
  const userId = route.params.userId;
  const _type = route.params._type;
  const [data, setData] = React.useState([]);
  const [nextURL, setNextURL] = React.useState();
  const [refreshing, setRefreshing] = React.useState(false);
  const [fetchingNext, setFetchingNext] = React.useState(true);
  const [extraData, setExtraData] = React.useState(false);

  React.useEffect(() => {
    getFollowers(userId, _type)
      .then(res => {
        setData(res.results);
        setNextURL(res.next);
      })
      .then(() => {
        setRefreshing(false);
        setFetchingNext(false);
      });
  }, [userId, _type]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: _type == 'followers' ? '팔로워' : '팔로잉',
    });
  });

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

  const getProfileImageSource = user => {
    if (user.small_image) return {uri: user.small_image};
    else if (user.profile_image) return {uri: user.profile_image};
    else return require('../../../assets/imgs/default_profile.png');
  };

  const renderItem = itemObject => {
    let item = itemObject.item;
    const handleFollowButton = user => {
      const {followable, id} = user;
      if (followable === FOLLOW_STATUS.NOT_FOLLOWING) {
        requestFollow(id).then(res => {
          if (res) {
            user.followable = FOLLOW_STATUS.FOLLOWING;
            setExtraData(!extraData);
          }
        });
      } else if (followable === FOLLOW_STATUS.FOLLOWING) {
        requestUnfollow(id).then(res => {
          user.followable = FOLLOW_STATUS.NOT_FOLLOWING;
          setExtraData(!extraData);
        });
      }
    };
    return (
      <View style={styles.memberRow}>
        <View style={{flex: 1, maxWidth: 40, minHeight: 40, marginRight: 10}}>
          <Image
            source={getProfileImageSource(item)}
            style={styles.profileImage}
          />
        </View>
        <Pressable
          style={{flex: 1}}
          onPress={() =>
            navigation.push('사용자정보', {
              user_id: item.id,
              isMy: false,
            })
          }>
          <Text style={{fontSize: 17}}>{item.nickname}</Text>
        </Pressable>
        <TouchableOpacity
          style={[
            styles.followButton,
            {display: item.followable === FOLLOW_STATUS.SELF ? 'none' : 'flex'},
            {
              backgroundColor:
                item.followable === FOLLOW_STATUS.FOLLOWING
                  ? '#F7F7F7'
                  : '#F85B02',
            },
          ]}
          onPress={() => handleFollowButton(item)}>
          <Text
            style={[
              styles.fontJeju,
              {
                color:
                  item.followable === FOLLOW_STATUS.FOLLOWING
                    ? '#B2B2B5'
                    : 'white',
              },
            ]}>
            {item.followable === FOLLOW_STATUS.FOLLOWING ? '팔로잉' : '팔로우'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.baseContainer}>
      <TextInput style={styles.searchInput} placeholder="검색" />
      <FlatList
        key={'#'}
        keyExtractor={item => '#' + item.id}
        data={data}
        renderItem={renderItem}
        horizontal={false}
        numColumns={1}
        refreshing={refreshing}
        extraData={extraData}
        onScroll={({nativeEvent}) => {
          if (isScrollEnd(nativeEvent)) {
            console.log(fetchingNext);
            if (!fetchingNext) fetchNext();
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  baseContainer: {
    backgroundColor: 'white',
    paddingTop: 15,
    flex: 1,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    maxHeight: 40,
    backgroundColor: '#F6F7F9',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  memberRow: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
    overflow: 'hidden',
  },
  memberTypeText: {
    fontSize: 9,
    marginTop: 5,
  },
  followButton: {
    backgroundColor: '#F85B02',
    height: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
  },
});

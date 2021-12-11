import {useNavigation} from '@react-navigation/native';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FOLLOW_STATUS, HOST} from '../../common/constant';
import { isEmpty } from '../../common/util';
import {getProfile, requestFollow, requestUnfollow} from '../../service/account';

const styles = StyleSheet.create({
  fontJeju: {
    fontFamily: 'JejuGothicOTF',
  },
  baseView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchArea: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    width: '100%',
    flexWrap: 'wrap',
  },
  textinput: {
    fontFamily: 'JejuGothicOTF',
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
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestTagText: {
    fontSize: 12,
  },
  bodyHeaderFont: {
    color: '#B2B2B5',
    fontSize: 12,
  },
  bodyHaederSpaceBody: {
    marginBottom: 10,
  },
  showAllTextFont: {
    color: '#F85B02',
    fontSize: 12,
    textAlign: 'right',
  },
  bodyItemSpace: {
    paddingVertical: 15,
  },
  groupImageContainer: {
    width: '50%',
    padding: 5,
  },
  groupImage: {
    width: '100%',
    aspectRatio: 165 / 124,
    borderRadius: 5,
  },
  headerCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  detailButtonsCommon: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 12,
    overflow: 'hidden',
  },
  detailHeaderWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#F7F7F7',
    alignItems: 'center',
    paddingTop: 20,
  },
  imageStyle: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 50,
    marginTop: 30,
  },
});

function MyDetailHeader({data, isMy, isFetched, refresh, setRefresh}) {
  const navigation = useNavigation();
  const [followable, setFollowable] = React.useState(data.followable);
  const handleFollowButton = React.useCallback(() => {
    const id = data.id;
    if (followable === FOLLOW_STATUS.NOT_FOLLOWING) {
      requestFollow(id).then(res => {
        if (res) {
          setFollowable(FOLLOW_STATUS.FOLLOWING);
          data.followable = FOLLOW_STATUS.FOLLOWING;
          setRefresh(!refresh);
        }
      });
    } else if (followable === FOLLOW_STATUS.FOLLOWING) {
      requestUnfollow(id).then(res => {
        if (res) {
          setFollowable(FOLLOW_STATUS.NOT_FOLLOWING);
          data.followable = FOLLOW_STATUS.NOT_FOLLOWING;
          setRefresh(!refresh);
        }
      });
    }
  }, [data, refresh]);

  const getImageUri = d => {
    let source = require('../../../assets/imgs/default_profile.png');
    if (!isEmpty(d.small_image)) source = {uri: d.small_image};
    else if (!isEmpty(d.profile_image)) source = {uri: d.profile_image};
    return source;
  };

  return (
    <View style={styles.detailHeaderWrapper}>
      <View style={{flex: 1, width: '100%'}}>
        <Text
          style={{
            fontSize: 20,
            textAlign: 'center',
            display: isMy ? 'flex' : 'none',
          }}>
          {data.nickname}
        </Text>
        <Pressable
          style={{
            position: 'absolute',
            right: 15,
            display: isMy ? 'flex' : 'none',
          }}
          onPress={() => {
            if (isFetched)
              navigation.navigate('프로필 편집', {
                screen: '프로필 편집',
                params: {data: data},
              });
            else navigation.navigate('Login');
          }}>
          <Ionicons name="settings-sharp" size={20} color={'black'} />
        </Pressable>
      </View>
      <View>
        <Image style={styles.imageStyle} source={getImageUri(data)} />
      </View>
      <View style={{flexDirection: 'row'}}>
        <Pressable
          style={{padding: 20, alignItems: 'center'}}
          onPress={() =>
            navigation.push('팔로우', {
              userId: data.id,
              _type: 'followers',
            })
          }>
          <Text style={{color: '#B2B2B5', fontSize: 12, marginBottom: 5}}>
            팔로워
          </Text>
          <Text style={styles.headerCount}>{data.followers}</Text>
        </Pressable>
        <Pressable
          style={{padding: 20, alignItems: 'center'}}
          onPress={() =>
            navigation.push('팔로우', {
              userId: data.id,
              _type: 'followings',
            })
          }>
          <Text style={{color: '#B2B2B5', fontSize: 12, marginBottom: 5}}>
            팔로잉
          </Text>
          <Text style={styles.headerCount}>{data.followings}</Text>
        </Pressable>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#B2B2B5', fontSize: 12, marginBottom: 5}}>
            작품
          </Text>
          <Text style={styles.headerCount}>{data.contents_count}</Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          display: data.followable === FOLLOW_STATUS.SELF ? 'none' : 'flex',
        }}>
        <Pressable
          style={{paddingHorizontal: 3}}
          onPress={() => Alert.alert('준비 중입니다.')}>
          <Text style={[styles.detailButtonsCommon, {borderColor: '#707070'}]}>
            메세지
          </Text>
        </Pressable>
        <TouchableOpacity
          style={{paddingHorizontal: 3}}
          onPress={() => handleFollowButton()}>
          {data.followable === FOLLOW_STATUS.NOT_FOLLOWING ? (
            <Text
              style={[
                styles.detailButtonsCommon,
                {
                  borderColor: '#F85B02',
                  backgroundColor: '#F85B02',
                  color: 'white',
                },
              ]}>
              팔로우
            </Text>
          ) : (
            <Text
              style={[
                styles.detailButtonsCommon,
                {
                  borderColor: '#F7F7F7',
                  backgroundColor: '#F7F7F7',
                  color: '#B2B2B5',
                },
              ]}>
              팔로잉
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

function MyIntroduce(object) {
  let data = object.data;
  const [fullDesc, setFullDesc] = React.useState(false);

  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>소개</Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => setFullDesc(!fullDesc)}>
          <Text style={styles.showAllTextFont}>
            {data.description.length > 100
              ? fullDesc
                ? '접어 보기'
                : '전체 보기'
              : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>
          {data.description.length > 100
            ? fullDesc
              ? data.description
              : data.description.slice(0, 100) + ' ...'
            : data.description}
        </Text>
      </View>
    </View>
  );
}

function MyTag({data}) {
  data = data ? data : [];
  return (
    <View style={styles.bodyItemSpace}>
      <View>
        <Text
          style={[
            styles.bodyHeaderFont,
            styles.fontJeju,
            styles.bodyHaederSpaceBody,
          ]}>
          대표 태그
        </Text>
        <FilterItemsArea items={data.tags} />
      </View>
    </View>
  );
}

function FilterItemsArea({items}) {
  items = items ? items : [];
  return (
    <View style={styles.searchArea}>
      {items.map(sgt => {
        return (
          <View key={sgt} style={styles.suggestTagView}>
            <Text style={styles.suggestTagText}>{sgt}</Text>
          </View>
        );
      })}
    </View>
  );
}

function MyItems({contents}) {
  const navigation = useNavigation();
  contents = contents ? contents : [];
  return (
    <View style={styles.bodyItemSpace}>
      <View style={{flexDirection: 'row', marginBottom: 20}}>
        <Text style={{flex: 1, fontFamily: 'JejuGothicOTF', fontSize: 17}}>내 작품 둘러보기</Text>
        <Text style={{fontSize: 12, color: '#F85B02'}}>전체보기</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        {contents.map(content => {
          let source =
            content.images.length > 0
              ? {uri: HOST + content.images[0]}
              : require('../../../assets/imgs/add_image.png');
          return (
            <Pressable
              key={content.id}
              style={styles.groupImageContainer}
              onPress={() => navigation.navigate('ContentsModal', content.id)}>
              <Image source={source} style={styles.groupImage} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function MyDetailBody({data}) {
  return (
    <View style={{flex: 3, padding: 15}}>
      <MyIntroduce data={data} />
      <MyTag data={data} />
      <MyItems contents={data.contents} />
    </View>
  );
}

export function GroupDetail({route}) {
  const isMy = route.params ? route.params.isMy : true;
  const user_id = isMy ? 'my' : route.params.user_id;
  const navigation = useNavigation();
  const defaultData = {
    description: '',
    nickname: '',
    followers: 0,
    followings: 0,
    profile_image: null,
    contents_count: 0,
    tags: [],
    content: '',
    contents: [],
    followable: FOLLOW_STATUS.NOT_FOLLOWING,
  };

  const [data, setData] = React.useState(defaultData);
  const [fetched, setFetched] = React.useState(false);
  const [refresh, setRefresh] = React.useState(false);

  React.useEffect(() => {
    getProfile(user_id).then(res => setData(res));
    const willFocusSubscription = navigation.addListener('focus', () => {
      getProfile(user_id).then(res => {
        if (res !== false) {
          setData(res);
          setFetched(true);
        } else {
          console.log('Failed to retrieve profile');
          setFetched(false);
          console.info('Current token is not valid, go to login');
          Alert.alert('로그인', '로그인 하시겠습니까?', [
            {
              text: '취소',
              onPress: () => navigation.goBack(),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => navigation.navigate('Login')},
          ]);
        }
      });
    });

    return willFocusSubscription;
  }, [user_id]);

  return (
    <SafeAreaView style={styles.baseView}>
      <ScrollView style={styles.baseView}>
        <MyDetailHeader
          data={data}
          isMy={isMy}
          isFetched={fetched}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <MyDetailBody data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default GroupDetail;

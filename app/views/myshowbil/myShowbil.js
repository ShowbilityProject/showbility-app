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
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FOLLOW_STATUS, HOST} from '../../common/constant';
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
    aspectRatio: 1,
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
    width: 100,
    height: 100,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 50,
    marginTop: 30,
  },
});

function MyDetailHeader({data, isMy, isFetched}) {
  const navigation = useNavigation();
  const imageSource = data.profile_image
    ? {uri: data.profile_image}
    : require('../../../assets/imgs/group.png');
  const [followable, setFollowable] = React.useState(data.followable);
  const handleFollowButton = () => {
    const id = data.id;
    console.log(followable);
    if (followable === FOLLOW_STATUS.NOT_FOLLOWING) {
      requestFollow(id);
      setFollowable(FOLLOW_STATUS.FOLLOWING);
      data.followable = FOLLOW_STATUS.FOLLOWING;
    } else if (followable === FOLLOW_STATUS.FOLLOWING) {
      requestUnfollow(id);
      setFollowable(FOLLOW_STATUS.NOT_FOLLOWING);
      data.followable = FOLLOW_STATUS.NOT_FOLLOWING;
    }
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
            if (isFetched) navigation.navigate('프로필 편집', {data: data});
            else navigation.navigate('Login');
          }}>
          <Ionicons name="settings-sharp" size={20} color={'black'} />
        </Pressable>
      </View>
      <Image style={styles.imageStyle} source={imageSource} />
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
        <Pressable style={{paddingHorizontal: 3}}>
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
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>소개</Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{data.description}</Text>
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
        }
      });
    });

    return willFocusSubscription;
  }, [user_id]);

  return (
    <SafeAreaView style={styles.baseView}>
      <ScrollView style={styles.baseView}>
        <MyDetailHeader data={data} isMy={isMy} isFetched={fetched} />
        <MyDetailBody data={data} />
      </ScrollView>
    </SafeAreaView>
  );
}

export default GroupDetail;

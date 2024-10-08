import {useNavigation} from '@react-navigation/core';
import * as React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Pressable,
} from 'react-native';
import {
  GROUP_CONTENT_STATUS,
  HOST,
  MEMBER_STATUS_TYPE,
} from '../../../common/constant';
import {isEmpty} from '../../../common/util';
import {
  getGroupById,
  requestDeleteGroupJoin,
  requestGroupJoin,
  updateMemberStatus,
} from '../../../service/group';
import {FOLLOW_STATUS} from '../../../common/constant';
import {requestFollow, requestUnfollow} from '../../../service/account';
import {normalizeFontSize} from '../../../component/font';

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
    fontSize: normalizeFontSize(17),
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
    fontSize: normalizeFontSize(12),
  },
  bodyHeaderFont: {
    color: '#B2B2B5',
    fontSize: normalizeFontSize(12),
  },
  bodyHaederSpaceBody: {
    marginBottom: 10,
  },
  showAllTextFont: {
    color: '#F85B02',
    fontSize: normalizeFontSize(12),
    textAlign: 'right',
  },
  bodyItemSpace: {
    paddingVertical: 15,
  },
  groupImageContainer: {
    width: '50%',
    maxHeight: 150,
    padding: 5,
  },
  groupImage: {
    width: '100%',
    height: '100%',
    // aspectRatio: 1.3,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 5,
  },
  imageStyle: {
    width: 100,
    height: 100,
    overflow: 'hidden',
    borderRadius: 50,
  },
  allowDenyWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'center',
  },
  allowButton: {
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: '#F85B02',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 5,
  },
  allowText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: normalizeFontSize(12),
  },
  denyButton: {
    alignSelf: 'flex-end',
    borderRadius: 5,
    backgroundColor: '#B2B2B5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  denyText: {
    textAlign: 'right',
    textAlignVertical: 'center',
    color: 'black',
    fontSize: normalizeFontSize(12),
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
    fontSize: normalizeFontSize(9),
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

function GroupDetailHeader({repr_image, followers, contents}) {
  return (
    <View
      style={{
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#F7F7F7',
        alignItems: 'center',
      }}>
      <Image style={styles.imageStyle} source={repr_image} />
      <View style={{flexDirection: 'row'}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#B2B2B5', fontSize: normalizeFontSize(12), marginBottom: 5}}>
            팔로워
          </Text>
          <Text style={{fontSize: normalizeFontSize(20),}}>{followers}</Text>
        </View>
        <View style={{padding: 20, alignItems: 'center'}}>
          <Text style={{color: '#B2B2B5', fontSize: normalizeFontSize(12), marginBottom: 5}}>
            작품
          </Text>
          <Text style={{fontSize: normalizeFontSize(20),}}>{contents}</Text>
        </View>
      </View>
    </View>
  );
}

function GroupIntroduce({name, detail}) {
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[styles.bodyHeaderFont, styles.fontJeju]}>
            그룹 소개
          </Text>
        </View>
        <TouchableOpacity style={{flex: 1}}>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{detail}</Text>
      </View>
    </View>
  );
}

function GroupTag({tags}) {
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
        <FilterItemsArea items={tags} />
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

function GroupItems({contents, title, id}) {
  const navigation = useNavigation();
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: normalizeFontSize(17),}, styles.fontJeju]}>
            그룹 작품 둘러보기
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('FindStack', {title: title, groupFilter: [id]})
          }>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        {contents.map(content => {
          let source =
            content.images.length > 0
              ? {uri: HOST + content.images[0]}
              : require('../../../../assets/imgs/add_image.png');
          return (
            <TouchableOpacity
              key={content.url}
              style={styles.groupImageContainer}
              onPress={() => navigation.navigate('ContentsModal', content.id)}>
              <Image source={source} style={styles.groupImage} />
              {/* <Text>{content.title}</Text> */}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function GroupPendingItems({contents, title, id}) {
  const navigation = useNavigation();
  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: normalizeFontSize(17),}, styles.fontJeju]}>
            승인 대기 중인 작품
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('그룹 컨텐츠', {
              title: '승인 대기 중인 작품',
              groupId: id,
              contentsStatus: GROUP_CONTENT_STATUS.PENDING,
            })
          }>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row'}}>
        {contents.map(content => {
          let source =
            content.images.length > 0
              ? {uri: HOST + content.images[0]}
              : require('../../../../assets/imgs/add_image.png');
          return (
            <TouchableOpacity
              key={content.url}
              style={styles.groupImageContainer}
              onPress={() => navigation.navigate('ContentsModal', content.id)}>
              <Image source={source} style={styles.groupImage} />
              <Text>test</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

function GroupMembers({members, members_count, id, refresh, setRefersh}) {
  const navigation = useNavigation();
  const MEMBER_TYPE_STR = {
    LD: '그룹 장',
    MB: '그룹 멤버',
    MG: '운영진',
  };

  const memberTypeColor = {
    LD: '#F85B02',
    MB: 'black',
    MG: '#F85B02',
  };

  const handleFollowButton = user => {
    const {followable, id} = user;
    if (followable === FOLLOW_STATUS.NOT_FOLLOWING) {
      requestFollow(id).then(res => {
        if (res) {
          user.followable = FOLLOW_STATUS.FOLLOWING;
          setRefersh(!refresh);
        }
      });
    } else if (followable === FOLLOW_STATUS.FOLLOWING) {
      requestUnfollow(id).then(res => {
        if (res) {
          user.followable = FOLLOW_STATUS.NOT_FOLLOWING;
          setRefersh(!refresh);
        }
      });
    }
  };

  const getProfileImageSource = user => {
    if (user.small_image) return {uri: user.small_image};
    else if (user.profile_image) return {uri: user.profile_image};
    else return require('../../../../assets/imgs/default_profile.png');
  };

  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: normalizeFontSize(17),}, styles.fontJeju]}>
            그룹 멤버<Text>({members_count}명)</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('GroupMember', {groupId: id, status: 'AT'})
          }>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        {members.map(member => {
          let user = member.user;
          return (
            <View key={member.id} style={styles.memberRow}>
              <View
                style={{flex: 1, maxWidth: 40, minHeight: 40, marginRight: 10}}>
                <Image
                  source={getProfileImageSource(user)}
                  style={styles.profileImage}
                />
              </View>
              <Pressable
                style={{flex: 1}}
                onPress={() =>
                  navigation.push('사용자정보', {
                    user_id: user.id,
                    isMy: false,
                  })
                }>
                <Text style={{fontSize: normalizeFontSize(17),}}>{user.nickname}</Text>
                <Text
                  style={{
                    color: memberTypeColor[member.member_type],
                    marginTop: 7,
                    fontSize: normalizeFontSize(9),
                  }}>
                  {MEMBER_TYPE_STR[member.member_type]}
                </Text>
              </Pressable>
              <TouchableOpacity
                style={[
                  styles.followButton,
                  {
                    display:
                      user.followable === FOLLOW_STATUS.SELF ? 'none' : 'flex',
                  },
                  {
                    backgroundColor:
                      user.followable === FOLLOW_STATUS.FOLLOWING
                        ? '#F7F7F7'
                        : '#F85B02',
                  },
                ]}
                onPress={() => handleFollowButton(user)}>
                <Text
                  style={[
                    styles.fontJeju,
                    {
                      color:
                        user.followable === FOLLOW_STATUS.FOLLOWING
                          ? '#B2B2B5'
                          : 'white',
                    },
                  ]}>
                  {user.followable === FOLLOW_STATUS.FOLLOWING
                    ? '팔로잉'
                    : '팔로우'}
                </Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function GroupPendingMembers({members, id}) {
  const navigation = useNavigation();
  const [groupMembers, setGroupMembers] = React.useState(members);
  const MEMBER_TYPE_STR = {
    LD: '그룹 장',
    MB: '그룹 멤버',
    MG: '운영진',
  };

  const memberTypeColor = {
    LD: '#F85B02',
    MB: 'black',
    MG: '#F85B02',
  };

  const removeMemberFromList = memberId => {
    setGroupMembers(groupMembers.filter(member => member.id !== memberId));
  };

  const updateStatus = (memberId, status) => {
    updateMemberStatus(id, memberId, status);
    removeMemberFromList(memberId);
  };

  return (
    <View style={styles.bodyItemSpace}>
      <View style={[{flexDirection: 'row'}, styles.bodyHaederSpaceBody]}>
        <View style={{flex: 1}}>
          <Text style={[{fontSize: normalizeFontSize(17),}, styles.fontJeju]}>
            승인 대기 중인 인원
          </Text>
        </View>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() =>
            navigation.navigate('GroupMember', {groupId: id, status: 'PN'})
          }>
          <Text style={styles.showAllTextFont}>전체 보기</Text>
        </TouchableOpacity>
      </View>
      <View>
        {groupMembers.map(member => {
          return (
            <View
              key={member.id}
              style={{flexDirection: 'row', paddingVertical: 5}}>
              <Image
                style={{width: 36, height: 36, marginRight: 5}}
                source={require('../../../../assets/imgs/group.png')}
              />
              <View style={{flex: 1}}>
                <Text
                  style={[
                    {fontSize: normalizeFontSize(17), alignSelf: 'stretch', marginBottom: 3},
                    styles.fontJeju,
                  ]}>
                  {member.user.nickname}
                </Text>
                <Text
                  style={{
                    fontSize: normalizeFontSize(9),
                    alignSelf: 'baseline',
                    color: memberTypeColor[member.member_type],
                  }}>
                  {MEMBER_TYPE_STR[member.member_type]}
                </Text>
              </View>
              <View style={styles.allowDenyWrapper}>
                <TouchableOpacity
                  style={styles.allowButton}
                  onPress={() =>
                    updateStatus(member.id, MEMBER_STATUS_TYPE.ACTIVE)
                  }>
                  <Text style={[styles.fontJeju, , styles.allowText]}>
                    승인
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.denyButton}
                  onPress={() =>
                    updateStatus(member.id, MEMBER_STATUS_TYPE.REJECT)
                  }>
                  <Text style={[styles.fontJeju, styles.denyText]}>거절</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function GroupDetailBody({data, refresh, setRefersh}) {
  return (
    <View style={{flex: 3, padding: 15}}>
      <GroupIntroduce name={data.name} detail={data.detail} />
      <GroupTag tags={data.tags} />
      <GroupItems contents={data.contents} title={data.name} id={data.id} />
      {data.pending_contents ? (
        <GroupPendingItems
          contents={data.pending_contents}
          title={data.name}
          id={data.id}
        />
      ) : undefined}
      <GroupMembers
        members={data.members}
        members_count={data.members_count}
        id={data.id}
        refresh={refresh}
        setRefersh={setRefersh}
      />
      {data.pending_members ? (
        <GroupPendingMembers members={data.pending_members} id={data.id} />
      ) : undefined}
    </View>
  );
}

function BottomJoinButtonView({id, member_status}) {
  // NL: Not Login, NA: Not Available, PN: Pending, MB: Member, MG: Manager, LD: Leader
  const [status, setStatus] = React.useState(member_status);

  React.useEffect(() => setStatus(member_status), [member_status]);

  const handleJoin = () => {
    if (status === MEMBER_STATUS_TYPE.NOT_JOINED)
      requestGroupJoin(id).then(res => {
        if (res === 401) Alert.alert('에러', '로그인이 필요합니다.');
        else setStatus(MEMBER_STATUS_TYPE.PENDING);
      });
    else if (status === MEMBER_STATUS_TYPE.PENDING)
      requestDeleteGroupJoin(id).then(res => {
        if (res === 401) Alert.alert('에러', '로그인이 필요합니다.');
        else setStatus(MEMBER_STATUS_TYPE.NOT_JOINED);
      });
  };

  const isValid = () => {
    return (
      status === MEMBER_STATUS_TYPE.ACTIVE ||
      status === MEMBER_STATUS_TYPE.PENDING
    );
  };

  const getText = () => {
    if (status === MEMBER_STATUS_TYPE.ACTIVE) return '그룹 멤버';
    else if (status === MEMBER_STATUS_TYPE.NOT_JOINED) return '함께하기';
    else if (status === MEMBER_STATUS_TYPE.PENDING)
      return '그룹 멤버 수락 대기 중';
    else return '함께하기';
  };

  return (
    <View style={{padding: 15}}>
      <TouchableOpacity
        onPress={() => handleJoin()}
        style={{
          width: '100%',
          paddingVertical: 20,
          borderRadius: 5,
          backgroundColor: isValid() ? '#F7F7F7' : '#F85B02',
          alignItems: 'center',
        }}>
        <Text
          style={[
            styles.fontJeju,
            {
              textAlign: 'right',
              textAlignVertical: 'center',
              color: isValid() ? 'black' : 'white',
              fontSize: normalizeFontSize(17),
            },
          ]}>
          {getText()}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function GroupDetail({navigation, route}) {
  const id = route.params.id;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name,
    });
  });
  const defaultGroup = {
    id: 0,
    tags: [],
    categories: [],
    name: '',
    detail: '',
    repr_image: '',
    small_image: '',
    is_visible: true,
    created_at: '2021-10-04T11:06:09.964875Z',
    updated_at: '2021-10-04T11:06:09.964945Z',
    contents: [],
    followers_count: 0,
    contents_count: 0,
    members_count: 0,
    members: [],
    current_user: 'NA',
  };
  const [data, setData] = React.useState(defaultGroup);
  const [refresh, setRefersh] = React.useState(false);

  React.useState(() => {
    getGroupById(id).then(res => {
      setData(res);
    });
  }, [id]);

  const getImageUri = d => {
    let source = require('../../../../assets/imgs/add_image.png');
    if (!isEmpty(d.small_image)) source = {uri: d.small_image};
    else if (!isEmpty(d.repr_image)) source = {uri: d.repr_image};
    return source;
  };

  return (
    <ScrollView style={styles.baseView} contentContainerStyle={{paddingTop: 15}}>
      <GroupDetailHeader
        repr_image={getImageUri(data)}
        followers={data.followers_count}
        contents={data.contents_count}
      />
      <GroupDetailBody data={data} refresh={refresh} setRefersh={setRefersh} />
      <BottomJoinButtonView id={data.id} member_status={data.current_user} />
    </ScrollView>
  );
}
